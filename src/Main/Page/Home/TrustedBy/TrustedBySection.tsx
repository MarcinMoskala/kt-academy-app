import React from "react";
import {useTranslations} from "../../../../Translations";
import dropboxLogo from "./dropbox.png"
import flixbusLogo from "./flixbus.png"
import futuretvLogo from "./futuretv.png"
import itaxiLogo from "./itaxi.png"
import itvLogo from "./itv.png"
import microdronesLogo from "./microdrones.png"
import nordeaLogo from "./nordea.png"
import operonLogo from "./operon.png"
import pegaLogo from "./pega.png"
import pkoLogo from "./pko.png"
import pracujplLogo from "./pracujpl2.png"
import schibstedLogo from "./schibsted.png"
import sapLogo from "./SAP.png"
import sensilabsLogo from "./sensilabs.png"
import ttmsLogo from "./TTMS.png"
import "./TrustedBySection.css"

function LogoIcon({src}: { src: string }) {
    return <div className="trustedby-logo-container">
        <img className="trustedby-logo" src={src}/>
    </div>;
}

export default function TrustedBySection() {
    const t = useTranslations();
    const logoList = [
        dropboxLogo,
        pegaLogo,
        flixbusLogo,
        futuretvLogo,
        itaxiLogo,
        itvLogo,
        microdronesLogo,
        nordeaLogo,
        operonLogo,
        sapLogo,
        pkoLogo,
        pracujplLogo,
        schibstedLogo,
        sensilabsLogo,
        ttmsLogo,
    ]
    return (<>
        <section className="padding-top-0 section--white" id="why-us">
            <div className="gradient--strip"/>
            <div className="content-container content-container--gradient--strip">
                <h1 className="white margin-bottom-30"> {t.trustedBy} </h1>
                <div className="trustedby-logos-container content-rectangle flex-container--row">
                    {logoList.map((logo, i) => <LogoIcon key={i} src={logo}/>)}
                </div>
            </div>
        </section>
    </>);
}