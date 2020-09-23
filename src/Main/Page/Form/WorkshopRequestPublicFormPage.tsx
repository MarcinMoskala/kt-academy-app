import React from 'react';
import Header from "../../../Section/Header/Header";
import "../../../Utils";
import {useTranslations} from "../../../Translations";
import {requestApi} from "../../../Network";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2'
import {useForm} from "react-hook-form";
import {useWorkshop} from "../../../Hooks";
import {registerPage} from "../../../Utils";
import "./WorkhopFormStyle.css"
import {RadioSelect} from "./RadioSelect";
import {FormError} from "./FormError";
import FooterSection from "../../../Section/FooterSection";
import {CountrySelect} from "./CountrySelect";
import ReactMarkdown from "react-markdown";

type RegisterKinds = "myself" | "developerCompany" | "myselfAndGroupCompany" | "groupCompany"
type InvoiceToOptions = "person" | "privateCompany" | "company"
type DeveloperExperience = "no" | "junior" | "mid" | "senior"
type PriceAcceptanceOptions = "ok" | "discountNeeded" | "wayTooMuch"

type FormData = {
    senderName: string,
    email: string,
    registerKind: RegisterKinds,

    invoiceTo?: InvoiceToOptions,
    developerExperience?: DeveloperExperience,
    priceAcceptance?: PriceAcceptanceOptions,

    companyName?: string,
    groupSize: string,

    country: string,
    date: string,
    extra: string
};

export default function WorkshopFormPage() {
    const t = useTranslations();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {workshopKey} = useParams<{ workshopKey: string }>();
    registerPage(`workshop-form-${workshopKey}`)
    const workshop = useWorkshop(workshopKey)
    const {register, watch, handleSubmit, errors} = useForm<FormData>();
    const registerKind: RegisterKinds = watch("registerKind")
    const developerExperience: DeveloperExperience | undefined = watch("developerExperience")
    const invoiceTo: InvoiceToOptions | undefined = watch("invoiceTo")

    const onSubmit = (data: FormData) => {
        console.log(data);
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        requestApi("workshop/" + workshop!.key + "/requestPublic", {
            method: "POST",
            body: {
                senderName: data.senderName,
                email: data.email,
                registerKind: data.registerKind,
                invoiceTo: data.invoiceTo,
                developerExperience: data.developerExperience,
                priceAcceptance: data.priceAcceptance,
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
                <h1>{t.form.public.title}</h1>
                <ReactMarkdown source={t.form.public.intro
                    .replace("{workshop_name}", workshop.name)
                    .replace("{workshop_link}", "/workshopPublicForm/" + workshop.key)}/>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset>
                        <label htmlFor="senderName">{t.form.namePrompt}</label>
                        <input type="text" name="senderName" id="senderName" ref={register}
                               placeholder={t.form.namePrompt}/>
                        <FormError field={errors.senderName}/>
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
                        <FormError field={errors.email}/>
                    </fieldset>

                    <RadioSelect<FormData, RegisterKinds>
                        title={t.form.registerKind.question} name="registerKind" register={register} errors={errors}
                        required={true}
                        options={[
                            {label: t.form.registerKind.myself, value: "myself"},
                            {label: t.form.registerKind.developerCompany, value: "developerCompany"},
                            {label: t.form.registerKind.myselfAndGroupCompany, value: "myselfAndGroupCompany"},
                            {label: t.form.registerKind.groupCompany, value: "groupCompany"},
                        ]}/>

                    {registerKind === "myself" &&
                    <>
                        <RadioSelect<FormData, InvoiceToOptions>
                            title={t.form.invoiceTo.question} name="invoiceTo" register={register} errors={errors}
                            required={true}
                            options={[
                                {label: t.form.invoiceTo.company, value: "company"},
                                {label: t.form.invoiceTo.privateCompany, value: "privateCompany"},
                                {label: t.form.invoiceTo.person, value: "person"}
                            ]}/>

                        {invoiceTo === "person" &&
                        <ReactMarkdown source={t.form.noVatIdInfo}/>
                        }
                    </>
                    }

                    {["myself", "developerCompany"].includes(registerKind) &&
                    <>
                        <RadioSelect<FormData, DeveloperExperience>
                            title={registerKind === "myself" ? t.form.developerExperience.questionMyself : t.form.developerExperience.questionOther}
                            name="developerExperience" register={register} errors={errors} required={true}
                            options={[
                                {label: t.form.developerExperience.no, value: "no"},
                                {label: t.form.developerExperience.junior, value: "junior"},
                                {label: t.form.developerExperience.mid, value: "mid"},
                                {label: t.form.developerExperience.senior, value: "senior"},
                            ]}/>

                        {developerExperience === "no" &&
                        <ReactMarkdown source={t.form.beginnerInfo}/>
                        }
                    </>
                    }

                    {["developerCompany", "myselfAndGroupCompany", "groupCompany"].includes(registerKind) &&
                    <>
                        <fieldset>
                            <label htmlFor="companyName">{t.form.companyNamePrompt}</label>
                            <input type="text" name="companyName" id="companyName" ref={register()}
                                   placeholder={t.form.companyNamePrompt}/>
                            <FormError field={errors.companyName}/>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="groupSize">{t.form.groupSizePrompt}</label>
                            <input type="text" name="groupSize" id="groupSize" min="1" max="100" ref={register({
                                required: t.form.required
                            })} placeholder={t.form.groupSizePrompt}/>
                            <FormError field={errors.groupSize}/>
                        </fieldset>
                    </>
                    }

                    {!(["myself", "developerCompany"].includes(registerKind) && developerExperience === "no") &&
                    <>
                        <RadioSelect<FormData, PriceAcceptanceOptions>
                            title={t.form.priceAcceptance.question
                                .replace("{price}", "400 EUR")
                                .replace("{days_num}", "3")}
                            name="priceAcceptance" register={register} errors={errors} required={true}
                            options={[
                                {label: t.form.priceAcceptance.ok, value: "ok"},
                                {label: t.form.priceAcceptance.discountNeeded, value: "discountNeeded"},
                                {label: t.form.priceAcceptance.wayTooMuch, value: "wayTooMuch"},
                            ]}/>

                        <CountrySelect register={register}/>

                        <fieldset>
                            <label htmlFor="date">{t.form.datePrompt}</label>
                            <input type="text" name="date" id="date" ref={register({
                                required: t.form.required
                            })} placeholder=""/>
                            <FormError field={errors.date}/>
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

