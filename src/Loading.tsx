import React from "react";
import Loading from "react-loading";
import {useTranslations} from "./Translations";

export const LoadingPage = () =>
    <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <Loading type="spin" color="blue" height={80} width={80}/>
    </div>;

export const ErrorPage = ({message}: {message?: string}) => {
    const t = useTranslations()
    const displayMessage = message ? message : t.errorMessage
    return <div style={{textAlign: "center"}}>
        {displayMessage}
    </div>
}