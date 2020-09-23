import React from 'react';
import Header from "../../../Section/Header/Header";
import FooterSection from "../../../Section/FooterSection";
import "../../../Utils";
import {useTranslations} from "../../../Translations";
import {callApi} from "../../../Network";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2'
import {useForm} from "react-hook-form";
import {useWorkshop} from "../../../Hooks";
import {registerPage} from "../../../Utils";
import "./WorkhopFormStyle.css"
import {CountrySelect} from "./CountrySelect";
import {RadioSelect} from "./RadioSelect";
import ReactMarkdown from "react-markdown";

type GroupSizeOptions = "size1" | "size2to7" | "size8to15" | "size16orMore"
type IsOnlineOptions = "online" | "inCompany"

type FormData = {
    senderName: string,
    email: string,
    companyName: string,
    country: string,
    date: string,
    extra: string,
    groupSize: GroupSizeOptions,
    isOnline: IsOnlineOptions
};

export default function WorkshopFormPage() {
    const t = useTranslations();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {workshopKey} = useParams<{ workshopKey: string }>();
    registerPage(`workshop-form-${workshopKey}`)
    const workshop = useWorkshop(workshopKey)
    const {register, watch, handleSubmit, errors} = useForm<FormData>();
    const groupSize = watch("groupSize")

    console.log(errors);
    console.log(groupSize);

    const onSubmit = (data: FormData) => {
        console.log(data);
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        callApi("workshop/" + workshop!.key + "/submit", {
            method: "POST",
            body: {
                email: data.email,
                companyName: data.companyName,
                groupSize: data.groupSize,
                country: data.country,
                date: data.date,
                extra: data.extra
            }
        })
            .then(
                (_) => {
                    setButtonEnabled(true)
                    Swal.fire(t.form.dialogSent)
                        .then(r => {
                            window.location.replace("https://kt.academy");
                        })
                },
                (error) => {
                    setButtonEnabled(true)
                    console.log(error)
                    Swal.fire(t.form.dialogError)
                }
            )
    }

    if (!workshop) return <></>

    return <>
        <Header/>
        <section className="form">
            <div className="content-container">
                <h1>{t.form.private.title}</h1>
                <ReactMarkdown source={t.form.private.intro
                    .replace("{workshop_name}", workshop.name)
                    .replace("{workshop_link}", "/workshopPublicForm/" + workshop.key)}/>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset>
                        <label htmlFor="senderName">{t.form.namePrompt}</label>
                        <input type="text" name="senderName" id="senderName" ref={register({
                            required: t.form.required
                        })} placeholder={t.form.namePrompt}/>
                        <Error field={errors.senderName}/>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="email">{t.form.emailPrompt}</label>
                        <input type="text" name="email" id="email" ref={register({
                            required: t.form.required,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t.form.invalidEmail
                            }
                        })} placeholder={t.form.emailPrompt}/>
                        <Error field={errors.email}/>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="companyName">{t.form.companyNamePrompt}</label>
                        <input type="text" name="companyName" id="companyName" ref={register({
                            required: t.form.required
                        })} placeholder={t.form.companyNamePrompt}/>
                        <Error field={errors.companyName}/>
                    </fieldset>

                    <RadioSelect<FormData, GroupSizeOptions>
                        title={t.form.groupSizePrompt}
                        name="groupSize" register={register} errors={errors} required={true}
                        options={[
                            {label: t.form.justMe, value: "size1"},
                            {label: "2-8", value: "size2to7"},
                            {label: "8-16", value: "size8to15"},
                            {label: "17 " + t.form.orMore, value: "size16orMore"},
                        ]}/>

                    {(groupSize === "size1" || groupSize === "size2to7") &&
                    <ReactMarkdown
                        source={t.form.requestOpenInsteadInfo
                            .replace("{openFormLink}", "/workshopPublicForm/" + workshop.key)}/>
                    }

                    {groupSize !== "size1" &&
                    <>
                        <CountrySelect register={register}/>

                        <RadioSelect<FormData, IsOnlineOptions>
                            title={t.form.isOnline.question}
                            name="isOnline" register={register} errors={errors} required={true}
                            options={[
                                {label: t.form.isOnline.online, value: "online"},
                                {label: t.form.isOnline.inCompany, value: "inCompany"},
                            ]}/>

                        <fieldset>
                            <label htmlFor="date">{t.form.datePrompt}</label>
                            <input type="text" name="date" id="date" ref={register({
                                required: t.form.required
                            })} placeholder=""/>
                            <Error field={errors.date}/>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="extra">{t.form.extraPrompt}</label>
                            <textarea name="extra" rows={7} id="extra" ref={register} placeholder=""/>
                        </fieldset>

                        <input type="submit" className="button button--mini" id="submit"
                               style={{position: "relative", right: "50%", left: "40%"}}
                               value={t.form.submit}/>
                    </>
                    }
                </form>
            </div>
        </section>
        <FooterSection/>
    </>;
}
;

function Error(props: { field }) {
    return <div style={{color: "red", fontSize: "small", marginLeft: "10px", marginTop: "5px"}}>
        {props.field && props.field.message}
    </div>;
}
