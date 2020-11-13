import React from 'react';
import Header from "../../../Section/Header/Header";
import "../../../Utils";
import {useLang, useTranslations} from "../../../Translations";
import {postPublicRequestForm} from "../../../Network";
import {useHistory, useParams} from "react-router-dom";
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
import {useLinkFunctions} from "../../../Link";
import {ErrorPage, LoadingPage} from "../../../Loading";
import {printMoney, Workshop} from "../../../Model";
import {showErrorDialog, showSuccessDialog} from "../../../Popups";

type RegisterKinds = "myself" | "developerCompany" | "myselfAndGroupCompany" | "groupCompany"
type InvoiceToOptions = "person" | "privateCompany" | "company"
type DeveloperExperience = "no" | "junior" | "mid" | "senior"
type PriceAcceptanceOptions = "ok" | "discountNeeded" | "wayTooMuch"

export default function WorkshopFormPageWrapper() {
    const {workshopKey} = useParams<{ workshopKey: string }>();
    registerPage(`workshop-public-form-${workshopKey}`)
    const workshop = useWorkshop(workshopKey)

    if (workshop === undefined) {
        return <LoadingPage/>
    }

    if (workshop === null) {
        return <ErrorPage/>
    }

    return <WorkshopFormPage workshop={workshop}/>
}

export type PublicFormData = {
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

function WorkshopFormPage({workshop}: { workshop: Workshop }) {
    const t = useTranslations();
    const lang = useLang();
    const history = useHistory();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, watch, handleSubmit, errors} = useForm<PublicFormData>();
    const registerKind: RegisterKinds = watch("registerKind")
    const developerExperience: DeveloperExperience | undefined = watch("developerExperience")
    const invoiceTo: InvoiceToOptions | undefined = watch("invoiceTo")
    const {linkKeepLang} = useLinkFunctions()

    const onSubmit = (data: PublicFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postPublicRequestForm(workshop, lang.key, data)
            .then(
                (_) => {
                    setButtonEnabled(true)
                    showSuccessDialog(t.form.dialogSent)
                        .then(_ => history.push("/"))

                },
                (error) => {
                    setButtonEnabled(true)
                    showErrorDialog(t.form.dialogError)
                }
            )
    }

    return <>
        <Header/>
        <section className="form">
            <div className="content-container">
                <h1>{t.form.public.title}</h1>
                <ReactMarkdown source={t.form.public.intro
                    .replace("{workshop_name}", workshop.name)
                    .replace("{workshop_link}", linkKeepLang("/workshop/" + workshop.key))}/>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset>
                        <label htmlFor="senderName">{t.form.namePrompt}</label>
                        <input type="text" name="senderName" id="senderName" ref={register({
                            required: t.form.required
                        })} placeholder={t.form.namePrompt}/>
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

                    <RadioSelect<PublicFormData, RegisterKinds>
                        title={t.form.registerKind.question} name="registerKind" register={register} errors={errors}
                        required={true}
                        options={[
                            {label: t.form.registerKind.myself, value: "myself"},
                            {label: t.form.registerKind.developerCompany, value: "developerCompany"},
                            {label: t.form.registerKind.myselfAndGroupCompany, value: "myselfAndGroupCompany"},
                            {label: t.form.registerKind.groupCompany, value: "groupCompany"},
                        ]}/>

                    {["developerCompany", "myselfAndGroupCompany", "groupCompany"].includes(registerKind) &&
                    <>
                        <fieldset>
                            <label htmlFor="companyName">{t.form.companyNamePrompt}</label>
                            <input type="text" name="companyName" id="companyName" ref={register()}
                                   placeholder={t.form.companyNamePrompt}/>
                            <FormError field={errors.companyName}/>
                        </fieldset>
                    </>
                    }

                    {registerKind === "myself" &&
                    <>
                        <RadioSelect<PublicFormData, InvoiceToOptions>
                            title={t.form.invoiceTo.question} name="invoiceTo" register={register} errors={errors}
                            required={true}
                            options={[
                                {label: t.form.invoiceTo.company, value: "company"},
                                {label: t.form.invoiceTo.privateCompany, value: "privateCompany"},
                                {label: t.form.invoiceTo.person, value: "person"}
                            ]}/>

                        {invoiceTo === "person" && workshop.programmingLevel !== "BEGINNER" &&
                        <ReactMarkdown source={t.form.noVatIdInfo}/>
                        }
                    </>
                    }

                    {["myself", "developerCompany"].includes(registerKind) && workshop.programmingLevel === "ADVANCED" &&
                    <>
                        <RadioSelect<PublicFormData, DeveloperExperience>
                            title={registerKind === "myself" ? t.form.developerExperience.questionMyself : t.form.developerExperience.questionOther}
                            name="developerExperience" register={register} errors={errors} required={true}
                            options={[
                                {label: t.form.developerExperience.no, value: "no"},
                                {label: t.form.developerExperience.junior, value: "junior"},
                                {label: t.form.developerExperience.mid, value: "mid"},
                                {label: t.form.developerExperience.senior, value: "senior"},
                            ]}/>

                        {developerExperience === "no" &&
                        <ReactMarkdown source={t.form.notForBeginnerInfo}/>
                        }
                    </>
                    }

                    {["myselfAndGroupCompany", "groupCompany"].includes(registerKind) &&
                    <>
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
                        <RadioSelect<PublicFormData, PriceAcceptanceOptions>
                            title={t.form.priceAcceptance.question
                                .replace("{price}", printMoney(workshop.basePrice.person ?? workshop.basePrice.personPl!!))
                                .replace("{price_pl}", printMoney(workshop.basePrice.person ?? workshop.basePrice.personPl!!))
                                .replace("{days_num}", workshop.basePrice.daysNumber.toString())}
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