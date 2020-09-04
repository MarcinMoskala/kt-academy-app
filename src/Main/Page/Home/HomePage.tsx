import React from 'react';
import Header, {Banner, LinkTo, Width} from "../../Section/Header/Header";
import WorkshopOfferSection from "./WorkshopOfferSection";
import WhyUsSection from "./WhyUsSection";
import TrainerSection from "../../Section/TrainerSection";
import JetbrainsCertificationSection from "../../Section/JetbrainsCertificationSection";
import MaterialsSection from "../../Section/MaterialsSection";
import TestimonialsSection from "../Testimonials/TestimonialsSection";
import ContactSection from "../../Section/ContactSection";
import FooterSection from "../../Section/FooterSection";
import {useTranslations} from "../../../Translations";
import HeaderBg from "../../Section/Header/background-img/10-1920x1080.png"

export default function HomePage() {
    const t = useTranslations()
    const menuLinks: LinkTo[] = [
        {to: "#workshops-offer", text: t.menu.workshops},
        {to: "#why-us", text: t.menu.whyUs},
        {to: "#trainer", text: t.menu.trainer},
        {to: "#materials", text: t.menu.materials},
        {to: "#contact", text: t.menu.contact, divider: true},
        {to: "https://blog.kotlin-academy.com/", text: t.menu.articles}
    ]
    const bannerProps: Banner = {
        img: HeaderBg,
        width: Width.Full,
        title: t.slogan.title,
        subtitle: t.slogan.subtitle
    };
    return (
        <>
            <Header links={menuLinks} banner={bannerProps}/>
            <WorkshopOfferSection/>
            <WhyUsSection/>
            <JetbrainsCertificationSection/>
            <TrainerSection trainerKey="marcin"/>
            <MaterialsSection/>
            <TestimonialsSection to="#workshops-offer"/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};