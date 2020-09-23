import React from 'react';
import Header from "../../../Section/Header/Header";
import FooterSection from "../../../Section/FooterSection";
import "../../../Utils";
import {useTranslations} from "../../../Translations";
import {API_URL} from "../../../Network";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2'
import {useForm} from "react-hook-form";
import {useWorkshop} from "../../../Hooks";
import {registerPage} from "../../../Utils";
import "./WorkhopFormStyle.css"

type RegisterKinds = "myself" | "developerCompany" | "myselfAndGroupCompany" | "groupCompany"
type InvoiceToOptions = "person" | "privateCompany" | "company"
type DeveloperExperience = "no" | "junior" | "mid" | "senior"

type FormData = {
    senderName: string,
    email: string,
    registerKind: RegisterKinds,

    invoiceTo?: InvoiceToOptions,
    developerExperience?: DeveloperExperience,

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

    const onSubmit = (data: FormData) => {
        console.log(data);
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        fetch(API_URL + "workshop/" + workshop!.key + "/submit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                companyName: data.companyName,
                groupSize: data.groupSize,
                country: data.country,
                date: data.date,
                extra: data.extra
            })
        })
            .then(
                (res) => {
                    setButtonEnabled(true)
                    Swal.fire("Sent")
                        .then(r => {
                            window.location.replace("https://kt.academy");
                        })
                },
                (error) => {
                    setButtonEnabled(true)
                    console.log(error)
                    Swal.fire("A problem occurred, please send later")
                }
            )
    }

    if (!workshop) return <></>

    return <>
        <Header/> {/* Should have Home link */}
        <section className="form">
            <div className="content-container">
                <h1>{t.form.title + workshop.name}</h1>
                <p>{"Request open online workshop " + workshop.name + "."}</p>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset>
                        <label htmlFor="senderName">{t.form.namePrompt}</label>
                        <input type="text" name="senderName" id="senderName" ref={register}
                               placeholder={t.form.namePrompt}/>
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
                        <legend>Who would you like to register?</legend>
                        <input type="radio" id="myself" name="registerKind" value="myself" ref={register}/>
                        <label htmlFor="myself">Myself</label><br/>
                        <input type="radio" id="developerCompany" name="registerKind" value="developerCompany"
                               ref={register}/>
                        <label htmlFor="developerCompany">A developer from my company</label><br/>
                        <input type="radio" id="myselfAndGroupCompany" name="registerKind" value="myselfAndGroupCompany"
                               ref={register}/>
                        <label htmlFor="myselfAndGroupCompany">Myself and other developers from my company</label><br/>
                        <input type="radio" id="groupCompany" name="registerKind" value="groupCompany" ref={register}/>
                        <label htmlFor="groupCompany">Developers from my company</label><br/>
                        <Error field={errors.registerKind}/>
                    </fieldset>

                    {registerKind === "myself" &&
                    <fieldset>
                        <legend>To whom issue the invoice?</legend>
                        <input type="radio" id="size1" name="invoiceTo" value="size1" ref={register}/>
                        <label htmlFor="size2to7">The company I work for</label><br/>
                        <input type="radio" id="size2to7" name="invoiceTo" value="size2to7" ref={register}/>
                        <label htmlFor="size2to7">My private company</label><br/>
                        <input type="radio" id="size8to15" name="invoiceTo" value="size8to15" ref={register}/>
                        <label htmlFor="size8to15">Myself</label><br/>
                        <Error field={errors.invoiceTo}/>
                    </fieldset>
                    }

                    {["myself", "developerCompany"].includes(registerKind) &&
                    <>
                        <fieldset>
                            <legend>{registerKind === "myself" ? "What is your professional experience as a developer?" : "What is this registered person experience as a developer"}</legend>
                            <input type="radio" id="no" name="developerExperience" value="no" ref={register}/>
                            <label htmlFor="no">No professional experience</label><br/>
                            <input type="radio" id="junior" name="developerExperience" value="junior" ref={register}/>
                            <label htmlFor="junior">Junior developer</label><br/>
                            <input type="radio" id="mid" name="developerExperience" value="mid" ref={register}/>
                            <label htmlFor="mid">Developer</label><br/>
                            <input type="radio" id="senior" name="developerExperience" value="senior" ref={register}/>
                            <label htmlFor="senior">Senior developer</label><br/>
                            <Error field={errors.developerExperience}/>
                        </fieldset>

                        {developerExperience === "no" &&
                        <p>We are sorry, but this workshop is for developers with professional experience.</p>
                        }
                    </>
                    }

                    {["myselfAndGroupCompany", "groupCompany"].includes(registerKind) &&
                    <>
                        <fieldset>
                            <label htmlFor="companyName">{t.form.companyNamePrompt}</label>
                            <input type="text" name="companyName" id="companyName" ref={register({
                                required: t.form.required
                            })} placeholder={t.form.companyNamePrompt}/>
                            <Error field={errors.companyName}/>
                        </fieldset>

                        <fieldset>
                            <label htmlFor="groupSize">{t.form.groupSizePrompt}</label>
                            <input type="text" name="groupSize" id="groupSize" ref={register({
                                required: t.form.required
                            })} placeholder={t.form.groupSizePrompt}/>
                            <Error field={errors.groupSize}/>
                        </fieldset>
                    </>
                    }

                    <fieldset>
                        <label htmlFor="country">{t.form.countryPrompt}</label>
                        <select name="country" id="country" ref={register}>
                            <option value="Poland">Poland</option>
                            <option value="UnitedKingdom">United Kingdom</option>
                            <option value="USA">USA</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="China">China</option>
                            <option value="Europe">Europe</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Africa">Africa</option>
                            <option value="Australia">Australia</option>
                        </select>
                    </fieldset>

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
