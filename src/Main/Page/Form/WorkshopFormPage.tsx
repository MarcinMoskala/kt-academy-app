import React from 'react';
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import "../../../Utils";
import {useTranslations} from "../../../Translations";
import {API_URL} from "../../../Network";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2'
import {FieldErrors, useForm} from "react-hook-form";
import {useWorkshop} from "../../Hooks";

type Props = {}

type FormData = {
    email: string,
    companyName: string,
    country: string,
    date: string,
    extra: string,
    groupSize: string,
    online: string
};

export default function WorkshopFormPage({}: Props) {
    const t = useTranslations();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {workshopKey} = useParams<{ workshopKey: string }>();
    const workshop = useWorkshop(workshopKey)
    const {register, setValue, handleSubmit, errors} = useForm<FormData>();


    console.log(errors);

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
                isOnline: data.online !== "inCompany",
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
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset>
                        <label htmlFor="email">{t.form.emailPrompt}</label>
                        <input type="text" name="email" id="email" ref={register({
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })} placeholder={t.form.emailPrompt}/>
                        <Error field={errors.email}/>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="companyName">{t.form.companyNamePrompt}</label>
                        <input type="text" name="companyName" id="companyName" ref={register({
                            required: "Required"
                        })} placeholder={t.form.companyNamePrompt}/>
                        <Error field={errors.companyName}/>
                    </fieldset>

                    <fieldset>
                        <legend>{t.form.groupSizePrompt}</legend>
                        <input type="radio" id="size1" name="groupSize" value="size1" ref={register}/>
                        <label htmlFor="size2to7">Just me</label><br/>
                        <input type="radio" id="size2to7" name="groupSize" value="size2to7" ref={register}/>
                        <label htmlFor="size2to7">2-8</label><br/>
                        <input type="radio" id="size8to15" name="groupSize" value="size8to15" ref={register}/>
                        <label htmlFor="size8to15">8-16</label><br/>
                        <input type="radio" id="size16orMore" name="groupSize" value="size16orMore" ref={register({
                            required: "Required"
                        })}/>
                        <label htmlFor="size16orMore">17 {t.form.orMore}</label>
                        <Error field={errors.groupSize}/>
                    </fieldset>

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
                        <legend>{t.form.isOnlinePrompt}</legend>
                        <input type="radio" id="inCompany" name="online" value="inCompany" ref={register}/>
                        <label htmlFor="inCompany">{t.form.inCompany}</label>
                        <br/>
                        <input type="radio" id="online" name="online" value="online" ref={register({
                            required: "Required"
                        })}/>
                        <label htmlFor="online">{t.form.online}</label>
                        <Error field={errors.online}/>
                        <br/>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="date">{t.form.datePrompt}</label>
                        <input type="text" name="date" id="date" ref={register({
                            required: "Required"
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
