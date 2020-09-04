import React, {useEffect} from 'react';
import Header, {LinkTo, Width} from "../../Section/Header/Header";
import JetbrainsCertificationSection from "../../Section/JetbrainsCertificationSection";
import TrainerSection from "../../Section/TrainerSection";
import {Workshop} from "../../../Model";
import {API_URL} from "../../../Network";
import MaterialsSection from "../../Section/MaterialsSection";
import FooterSection from "../../Section/FooterSection";
import "../../../Utils";
import {Link, useParams} from "react-router-dom";
import {useTranslations} from "../../../Translations";
import {Helmet} from "react-helmet";
import AndroidHeaderBg from "../../Section/Header/background-img/2-1920x702.png"
import BackendHeaderBg from "../../Section/Header/background-img/6-1920x702.png"
import EffectiveHeaderBg from "../../Section/Header/background-img/3-1920x702.png"
import CoroutinesHeaderBg from "../../Section/Header/background-img/9-1920x702.png"
import WorkshopDescriptionSection from "./WorkshopDescriptionSection";
import WorkshopDetailsSection from "./WorkshopTocSection";
import {useWorkshop} from "../../Hooks";

type Props = {}

export default function WorkshopPage({}: Props) {
    const t = useTranslations()

    const {workshopKey} = useParams<{ workshopKey: string }>();
    const workshop = useWorkshop(workshopKey)

    if (!workshop) return <></>

    const HeaderBg = getHeader(workshop)

    const menuLinks: LinkTo[] = [
        {to: "#workshops-offer", text: t.menu.workshops},
        {to: "#why-us", text: t.menu.whyUs},
        {to: "#trainer", text: t.menu.trainer},
        {to: "#materials", text: t.menu.materials},
        {to: "#contact", text: t.menu.contact, divider: true},
        {to: "https://blog.kotlin-academy.com/", text: t.menu.articles}
    ]

    let bannerOptions = {
        img: HeaderBg,
        title: workshop.name,
        width: Width.Half,
        subtitle: workshop.subtitle,
        button: {
            text: t.contact.pricing.button,
            to: "#contact"
        }
    };

    return (
        <>
            <Helmet>
                <meta name="description" content={workshop.metaDescription}/>
                <meta name="keywords" content={workshop.metaKeywords}/>
                <title> {workshop.name} </title>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@ktdotacademy"/>
                <meta name="twitter:title" content={workshop.name}/>
                <meta name="twitter:description" content={workshop.metaDescription}/>
                <meta name="twitter:image" content={workshop.promotionImageUrl}/>

                <meta property="og:title" content={workshop.name}/>
                <meta property="og:type" content="video.movie"/>
                <meta property="og:image" content={workshop.promotionImageUrl}/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="1200"/>
                <meta property="og:url" content={window.location.href}/>
                <meta property="og:description" content={workshop.metaDescription}/>
            </Helmet>

            <Header links={menuLinks} banner={bannerOptions}/>

            <WorkshopDescriptionSection workshop={workshop}/>

            <WorkshopDetailsSection workshop={workshop}/>

            {workshop.howLong &&
            <section className="requirements short-section short-list">
                <div className="content-container short-content-container">
                    <h1>{t.titleHowLong}</h1>
                    {workshop.howLong}
                </div>
            </section>
            }

            {workshop.requirements &&
            <section className="requirements short-section short-list">
                <div className="content-container short-content-container">
                    <h1>{t.titleRequirements}</h1>
                    <ul>
                        {workshop.requirements.map((requirement, index) =>
                            <li key={index}>{requirement}</li>
                        )}
                    </ul>
                </div>
            </section>
            }
            <TrainerSection trainerKey={workshop.trainer.key}/>

            {workshop.certifiedByJb && <JetbrainsCertificationSection/>}

            {workshop.materialsImg &&
            <MaterialsSection materialsImg={workshop.materialsImg}/>
            }

            <section className="contact short-section section--white" id="contact">
                <div className="content-container">
                    <h1>{t.contact.title}</h1>
                    <h4>{t.contact.pricing.description}</h4>
                    <Link to={"/workshopForm/" + workshop.key} className="button wow swing button-detailed-page-gtm margin-top-20">
                        {t.contact.pricing.button}
                    </Link>
                </div>
            </section>

            <FooterSection/>
        </>
    );
};

function getHeader(workshop: Workshop) {
    switch (workshop.bannerUrlCss) { // TODO: Base on some category
        case "banner__url--android":
            return AndroidHeaderBg
        case "banner__url--backened":
            return BackendHeaderBg
        case "banner__url--effective":
            return EffectiveHeaderBg
        case "banner__url--coroutines":
            return CoroutinesHeaderBg
        default:
            return BackendHeaderBg
    }
}
