import React from 'react';
import Header, {LinkTo, Width} from "../../../Section/Header/Header";
import JetbrainsCertificationSection from "./Certified/JetbrainsCertificationSection";
import TrainerSection from "./Trainer/TrainerSection";
import MaterialsSection from "../../Section/MaterialsSection";
import FooterSection from "../../../Section/FooterSection";
import "../../../Utils";
import {useParams} from "react-router-dom";
import {useTranslations} from "../../../Translations";
import {Helmet} from "react-helmet";
import AndroidHeaderBg from "../../../Section/Header/background-img/2-1920x702.png"
import BackendHeaderBg from "../../../Section/Header/background-img/6-1920x702.png"
import EffectiveHeaderBg from "../../../Section/Header/background-img/3-1920x702.png"
import CoroutinesHeaderBg from "../../../Section/Header/background-img/9-1920x702.png"
import WorkshopDescriptionSection from "./WorkshopDescriptionSection";
import WorkshopDetailsSection from "./WorkshopTocSection";
import {useWorkshop} from "../../../Hooks";
import {registerPage} from "../../../Utils";
import {RegistrationSection} from "./RegistrationSection";
import {Workshop} from "../../../Model";
import {ErrorPage, LoadingPage} from "../../../Loading";

export default function WorkshopPageWrapper() {
    const {workshopKey} = useParams<{ workshopKey: string }>();
    registerPage(`workshop-${workshopKey}`)
    const workshop = useWorkshop(workshopKey)

    if (workshop === undefined) {
        return <LoadingPage/>
    }

    if (workshop === null) {
        return <ErrorPage/>
    }

    return <WorkshopPage workshop={workshop}/>
}

function WorkshopPage({workshop}: {workshop: Workshop}) {
    const t = useTranslations()


    const HeaderBg = getHeader(workshop?.key)

    const menuLinks: LinkTo[] = [
        {text: t.menu.workshopMaterial, to: "#workshop-TOC"},
        {text: t.menu.trainer, to: "#trainer"},
        {text: t.menu.materials, to: "#materials"},
        {text: t.menu.register, to: "#register", divider: true},
    ]

    let bannerOptions = {
        img: HeaderBg,
        title: workshop.name,
        width: Width.Half,
        subtitle: workshop.subtitle,
        button: {
            text: t.contact.pricing.button,
            to: "#register"
        }
    };

    return (
        <>
            <Helmet>
                <meta name="description" content={workshop.shortDescription}/>
                <meta name="keywords" content={workshop.metaKeywords}/>
                <title> {workshop.name} </title>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@ktdotacademy"/>
                <meta name="twitter:title" content={workshop.name}/>
                <meta name="twitter:description" content={workshop.shortDescription}/>
                <meta name="twitter:image" content={getPromotionImageUrl(workshop?.key)}/>

                <meta property="og:title" content={workshop.name}/>
                <meta property="og:type" content="video.movie"/>
                <meta property="og:image" content={getPromotionImageUrl(workshop?.key)}/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="1200"/>
                <meta property="og:url" content={window.location.href}/>
                <meta property="og:description" content={workshop.shortDescription}/>
            </Helmet>

            <Header links={menuLinks} banner={bannerOptions} allowedLangs={workshop.langVariants}/>

            <WorkshopDescriptionSection workshop={workshop}/>

            <WorkshopDetailsSection workshop={workshop}/>

            {workshop.howLong &&
            <section className="requirements short-section short-list">
                <div className="content-container short-content-container">
                    <h1>{t.workshopPage.titleHowLong}</h1>
                    {workshop.howLong}
                </div>
            </section>
            }

            {workshop.requirements &&
            <section className="requirements short-section short-list">
                <div className="content-container short-content-container">
                    <h1>{t.workshopPage.titleRequirements}</h1>
                    <ul>
                        {workshop.requirements.map((requirement, index) =>
                            <li key={index}>{requirement}</li>
                        )}
                    </ul>
                </div>
            </section>
            }

            <TrainerSection trainer={workshop.trainer}/>

            {workshop.certifiedByJb &&
            <JetbrainsCertificationSection/>
            }

            <MaterialsSection workshop={workshop}/>

            <RegistrationSection workshop={workshop}/>

            <FooterSection/>
        </>
    );
};

function getHeader(workshopKey?: string) {
    switch (workshopKey) {
        case "android":
            return AndroidHeaderBg
        case "backened":
            return BackendHeaderBg
        case "effectiveKotlin":
            return EffectiveHeaderBg
        case  "refactoringToCleanCode":
            return EffectiveHeaderBg
        case "coroutines":
            return CoroutinesHeaderBg
        default:
            return BackendHeaderBg
    }
}

function getPromotionImageUrl(workshopKey?: string) {
    switch (workshopKey) {
        case "android":
            return AndroidHeaderBg
        case "backened":
            return BackendHeaderBg
        case "effectiveKotlin":
            return EffectiveHeaderBg
        case  "refactoringToCleanCode":
            return EffectiveHeaderBg
        case "coroutines":
            return CoroutinesHeaderBg
        default:
            return BackendHeaderBg
    }
}
