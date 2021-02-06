import React from 'react';
import "../../../Utils";
import "./WorkhopFormStyle.css"
import ReactMarkdown from "react-markdown";
import {useTranslations} from "../../../Translations";
import {HowDoYouKnowSelect} from "./HowDoYouKnowSelect";
import Header from "../../../Section/Header/Header";
import FooterSection from "../../../Section/FooterSection";

type WorkshopFormProps = { children, onSubmit, register, errors, watch, title: string, intro: string, submitEnabled?: boolean };

export const WorkshopForm = ({children, onSubmit, title, intro, submitEnabled = true, register, errors, watch}: WorkshopFormProps) => {
    const t = useTranslations();
    return <>
        <Header/>
        <section className="form">
            <div className="content-container">
                <h1>{title}</h1>
                <ReactMarkdown source={intro}/>
                <form onSubmit={onSubmit}>
                    {children}

                    {submitEnabled &&
                    <>
                        <HowDoYouKnowSelect register={register} errors={errors} watch={watch}/>

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
};

export function FormError(props: { field }) {
    return <div style={{color: "red", fontSize: "small", marginLeft: "10px", marginTop: "5px"}}>
        {props.field && props.field.message}
    </div>;
}