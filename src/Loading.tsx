import React from "react";
import Loading from "react-loading";

export const LoadingPage = () =>
    <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <Loading type="spin" color="blue" height={80} width={80}/>
    </div>;