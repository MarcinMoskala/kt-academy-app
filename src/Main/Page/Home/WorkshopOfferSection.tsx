import React from "react";
import {useTranslations} from "../../../Translations";
import Link from "../../../Link"
import {useWorkshopCategories, WorkshopCategory} from "../../../Data";

export default function WorkshopOfferSection() {
    const t = useTranslations();
    const workshopCategories: WorkshopCategory[] = useWorkshopCategories()

    return (<section className="workshops-offer section--white" id="workshops-offer">
        <div className="content-container">
            <h1> {t.workshopOffer.title} </h1>
            <p> {t.workshopOffer.subtitle} </p>

            <div className="flex-container--row">

                <WorkshopOfferCategory
                    icon="kotlin-icon"
                    title={t.workshopOffer.kotlinTitle}
                    desc={t.workshopOffer.kotlinDesc}
                    link="/workshop#tag-kotlin"
                />

                <WorkshopOfferCategory
                    icon="fas fa-rocket"
                    title={t.workshopOffer.bestPracticesTitle}
                    desc={t.workshopOffer.bestPracticesDesc}
                    link="/workshop#tag-bestpractices"
                />

                <WorkshopOfferCategory
                    icon="fas fa-chalkboard"
                    title={t.workshopOffer.beginnersTitle}
                    desc={t.workshopOffer.beginnersDesc}
                    link="/workshop#tag-beginners"
                />

                <WorkshopOfferCategory
                    icon="fas fa-vial"
                    title={t.workshopOffer.testingTitle}
                    desc={t.workshopOffer.testingDesc}
                    link="/workshop#tag-testing"
                />

            </div>
        </div>
    </section>);
}

function WorkshopOfferCategory({desc, icon, title, link}: { icon: string, title: string, desc: string, link: string }) {
    const t = useTranslations();
    return <div className="flex-item flex-item-paddings flex-container--column margin-right-20 wow zoomIn">
        <i className={icon}/>
        <h3> {title} </h3>
        <p> {desc} </p>
        <Link to={link} className="button">
            {t.workshopOffer.button}
        </Link>
    </div>;
}
