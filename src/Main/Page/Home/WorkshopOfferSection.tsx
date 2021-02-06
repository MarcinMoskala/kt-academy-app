import React, {useMemo} from "react";
import {useLang, useTranslations} from "../../../Translations";
import Link from "../../../Link"
import {useWorkshopCategories, WorkshopCategory} from "../../../Data";
import {useWorkshops} from "../../../Hooks";
import {printMoney} from "../../../Model";

export default function WorkshopOfferSection() {
    const t = useTranslations();
    const workshopCategories: WorkshopCategory[] = useWorkshopCategories()
    const workshops = useWorkshops()
    const publicWorkshops = useMemo(() => workshops
            ?.flatMap(w => w.plannedPublicWorkshops.map(pw => {
                return {
                    workshop: w,
                    publicWorkshop: pw
                }
            }))
        , [workshops])

    return (<>
        <section className="workshops-offer section--white" id="workshops-offer">
            <div className="content-container">
                <h1> {t.workshopOffer.title} </h1>
                <p> {t.workshopOffer.subtitle} </p>

                <div className="flex-container--row">
                    {workshopCategories.map(PrivateWorkshopCategory)}
                </div>
            </div>
        </section>
        <section className="workshops-offer section--white" id="workshops-offer">
            <div className="content-container">
                <h1> {t.workshopOffer.publicTitle} </h1>
                <p> {t.workshopOffer.publicSubtitle} </p>

                {publicWorkshops && publicWorkshops.length !== 0 &&
                publicWorkshops.map(PublicWorkshop)
                }
            </div>
        </section>
    </>);
}

function PrivateWorkshopCategory(wc: WorkshopCategory) {
    const t = useTranslations();
    return <WorkshopOfferMain
        icon={wc.icon}
        title={wc.title}
        desc={wc.desc}
        link={`/workshop#tag-${wc.tag}`}
        buttonText={t.workshopOffer.button}
    />;
}

function PublicWorkshop({workshop, publicWorkshop}) {
    const t = useTranslations();
    const lang = useLang();
    return <WorkshopOfferMain
        icon={workshop.icon}
        title={workshop.name}
        desc={workshop.shortDescription}
        desc2={`${publicWorkshop.startDate}-${publicWorkshop.endDate}, ${publicWorkshop.timeDesc}, ${printMoney((lang.key === "PL" ? workshop.basePrice.personPl : workshop.basePrice.person) ?? workshop.basePrice.person ?? workshop.basePrice.personPl!)}`}
        link={"/workshop/" + workshop.key}
        buttonText={t.workshopsList.button}
    />;
}

function WorkshopOfferMain({desc, desc2, icon, title, link, buttonText}: { icon: string, title: string, desc: string, desc2?: string, link: string, buttonText: string }) {
    const t = useTranslations();
    return <div className="flex-item flex-item-paddings flex-container--column margin-right-20 wow zoomIn">
        <i className={icon}/>
        <h3> {title} </h3>
        <p> {desc} </p>
        {desc2 && <p> {desc2} </p>}
        <Link to={link} className="button">
            {buttonText}
        </Link>
    </div>;
}
