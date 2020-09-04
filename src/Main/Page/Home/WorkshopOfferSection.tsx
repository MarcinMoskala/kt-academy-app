import React from "react";
import {useTranslations} from "../../../Translations";
import Link from "../../../Link"

export default function WorkshopOfferSection() {
    const t = useTranslations();
    return (<section className="workshops-offer" id="workshops-offer">
        <div className="content-container">
            <h1> {t.workshopOffer.title} </h1>
            <p> {t.workshopOffer.subtitle} </p>

            <div className="flex-container--row">

                <div className="flex-item flex-item-paddings flex-container--column margin-right-20 wow zoomIn">
                    <i className="fas fa-building"/>
                    <h3> {t.workshopOffer.kotlinTitle} </h3>
                    <p> {t.workshopOffer.kotlinDesc} </p>
                    <Link to={"/workshop?tag=kotlin#workshops-offer"} className="button">
                        {t.workshopOffer.kotlinButton}
                    </Link>
                </div>

                <div className="flex-item flex-item-paddings flex-container--column margin-right-20 wow zoomIn">
                    <i className="fas fa-building"/>
                    <h3> {t.workshopOffer.bestPracticesTitle} </h3>
                    <p> {t.workshopOffer.bestPracticesDesc} </p>
                    <Link to={"/workshop?tag=bestpractices#workshops-offer"} className="button">
                        {t.workshopOffer.bestPracticesButton}
                    </Link>
                </div>

            </div>
        </div>
    </section>);
}