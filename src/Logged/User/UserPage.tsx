import React from 'react';
import {useUser} from "../../Hooks";
import {User} from "../../Model";
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import {ErrorPage, LoadingPage} from "../../Loading";
import "../Course/CourseElement.css"
import {useParams} from "react-router-dom";
import {BadgesSection} from "./Badges/BadgesSection";
import "./UserPage.css"

export default function UserPageWrapper() {
    // const {userKey} = useParams<{ userKey: string }>();
    // registerPage(`challenge-${courseKey}-${challengeKey}`);

    const user = useUser()

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
        <div className="content-container margin-top-80">
            <img className="avatar" src={user.imageUrl}/>
            <h3>{`${user.name} ${user.surname}`}</h3>

            <div className="margin-bottom-30">
                Lotem ipsum
            </div>

            <BadgesSection user={user}/>
        </div>
        <FooterSection/>
    </>;
}