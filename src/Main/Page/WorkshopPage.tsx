import React, {useEffect} from 'react';
import Header, {LinkTo} from "../Section/Header/Header";
import JetbrainsCertificationSection from "../Section/JetbrainsCertificationSection";
import TrainerSection from "../Section/TrainerSection";
import TestimonialsSection from "./Testimonials/TestimonialsSection";
import ContactSection from "../Section/ContactSection";
import {Workshop} from "../../Model";
import {API_URL} from "../../Network";
import MaterialsSection from "../Section/MaterialsSection";
import FooterSection from "../Section/FooterSection";
import "../../Utils";
import {useParams} from "react-router-dom";
import HeaderBg from "../Section/Header/background-img/10-1920x1080.png";
import {useTranslations} from "../../Translations";
import {Helmet} from "react-helmet";

type Props = {}

export default function WorkshopPage({}: Props) {
    const t = useTranslations()

    const [workshop, setWorkshop] = React.useState<Workshop>();
    const {workshopKey} = useParams<{ workshopKey: string }>();

    useEffect(() => {
        fetch(API_URL + "/workshop/" + workshopKey)
            .then(res => res.json())
            .then(
                (result) => setWorkshop(result),
                (error) => console.log(error)
            )
    }, [])

    if (!workshop) return <></>

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
                <title> ${workshop.name} </title>

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
            <JetbrainsCertificationSection/>
            <TrainerSection trainerKey={workshop.trainer.key}/>
            <MaterialsSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};