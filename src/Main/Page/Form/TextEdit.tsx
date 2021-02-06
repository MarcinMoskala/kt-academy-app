import {useTranslations} from "../../../Translations";
import {FormError} from "./FormError";
import React from "react";

export function TextEdit({question, placeholder = "", fieldName, register, errors}: { question: string, placeholder?: string, fieldName: string, register, errors }) {
    return <fieldset>
        <label htmlFor={fieldName}>{question}</label>
        <input type="text" name={fieldName} id={fieldName} ref={register} placeholder={placeholder}/>
        <FormError field={errors[fieldName]}/>
    </fieldset>;
}