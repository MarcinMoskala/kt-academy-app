import React from 'react';
import {useUserByKey, useUserSelf} from "../../Hooks";
import {User} from "../../Model";
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import {ErrorPage, LoadingPage} from "../../Loading";
import "../Course/CourseElement.css"
import {BadgesSection} from "./Badges/BadgesSection";
import "./UserPage.css"
import {registerPage} from "../../Utils";
import {useHistory, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FormError} from "../../Main/Page/Form/FormError";
import {useTranslations} from "../../Translations";
import {HttpError, patchUserSelf, requestUserByKey} from "../../Network";
import {showSuccessDialog} from "../../Popups";
import ReactMarkdown from "react-markdown";

export function UserPageWrapper() {
    const {userKey} = useParams<{ userKey: string }>();
    registerPage(`user-${userKey}`);

    const user = useUserByKey(userKey)

    if (user === undefined) {
        return <LoadingPage/>
    }

    if (user === null) {
        return <ErrorPage message="You need to log in"/>
    }

    return <UserPage key={user.id} user={user}/>
}

function UserPage({user}: { user: User }) {
    return <>
        <Header allowedLangs={["EN"]}/>
        <div className="content-container">
            <UserImage user={user}/>

            {user.bio &&
            <div className="margin-bottom-30">
                {user.bio}
            </div>
            }

            <BadgesSection user={user}/>
        </div>
        <FooterSection/>
    </>;
}

export function UserEditPageWrapper() {
    registerPage(`user-profile`);
    const user = useUserSelf()

    if (user === undefined) {
        return <LoadingPage/>
    }

    if (user === null) {
        return <ErrorPage message="You need to log in"/>
    }

    return <UserEditPage key={user.id} user={user}/>
}

type UserEditFormData = {
    customImageUrl?: string
    publicKey?: string
    bio?: string
}

function UserEditPage({user}: { user: User }) {
    const t = useTranslations();
    const {register, watch, handleSubmit, errors, setError} = useForm<UserEditFormData>({
        defaultValues: {
            customImageUrl: user.customImageUrl ?? "",
            publicKey: user.publicKey ?? "",
            bio: user.bio ?? "",
        }
    });
    const customImageUrlValue = watch("customImageUrl")
    const imageUrl = customImageUrlValue && customImageUrlValue.trim().length > 0 ? customImageUrlValue : getBigImage(user);
    const history = useHistory();

    const onSubmit = (data: UserEditFormData) => {
        patchUserSelf({
            publicKey: data.publicKey,
            customImageUrl: data.customImageUrl,
            bio: data.bio,
        }).then(
            (_) => {
                showSuccessDialog()
                    .then(_ => history.go(0))
            },
            (error: HttpError) => {
                function getErrorMessage() {
                    switch (error.code) {
                        case 409:
                            return "Such public key already exists"
                        case 400:
                            return "Incorrect public key"
                        default:
                            return "An error ocurred. There is probably something wrong with the values. "
                    }
                }

                setError("publicKey", {
                    type: "manual",
                    message: getErrorMessage()
                });
            }
        )
    }

    return <>
        <Header allowedLangs={["EN"]}/>
        <div className="content-container form">
            <img className="avatar" src={imageUrl} alt="User profile image"/>
            <h3>{`${user.name} ${user.surname}`}</h3>
            {user.publicKey &&
            <ReactMarkdown
                source={`Your profile is visible on [kt.academy/user/${user.publicKey}](http://kt.academy/user/${user.publicKey})`}/>
            }

            <div className="margin-bottom-30">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <label htmlFor="publicKey">User public key</label>
                        <input type="text" name="publicKey" id="publicKey" ref={register}
                               placeholder="This key will be used to see your profile. Set to make your profile visible. Leave empty to not expose your profile."/>
                        <FormError field={errors.publicKey}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="customImageUrl">Image url</label>
                        <input type="text" name="customImageUrl" id="customImageUrl" ref={register}
                               placeholder="The url to your profile image. Keep empty to leave image from Google."/>
                        <FormError field={errors.customImageUrl}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="bio">Your bio</label>
                        <textarea name="bio" rows={4} id="bio" ref={register}
                                  placeholder="Write something about yourself here"/>
                    </fieldset>
                    <input type="submit" className="button button--mini center" id="submit" value={t.form.submit}/>
                </form>
            </div>

            <BadgesSection user={user}/>
        </div>
        <FooterSection/>
    </>;
}

function getBigImage(user: User) {
    return user.customImageUrl ? user.customImageUrl : user.imageUrl.replace(/=s(\d*)-c/, "=s400-c")
}

export function UserImage({user}: { user: User }) {
    return <>
        <img className="avatar" src={getBigImage(user)}/>
        <h3>{`${user.name} ${user.surname}`}</h3>
    </>;
}