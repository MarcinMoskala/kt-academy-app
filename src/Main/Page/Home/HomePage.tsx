import React from 'react';
import Header, {Banner, LinkTo, Width} from "../../../Section/Header/Header";
import WorkshopOfferSection from "./WorkshopOfferSection";
import WhyUsSection from "./WhyUsSection";
import TrainerSection from "../Workshop/Trainer/TrainerSection";
import JetbrainsCertificationSection from "../Workshop/Certified/JetbrainsCertificationSection";
import MaterialsSection from "../../Section/MaterialsSection";
import TestimonialsSection from "../Testimonials/TestimonialsSection";
import ContactSection from "../../Section/ContactSection";
import FooterSection from "../../../Section/FooterSection";
import {useTranslations} from "../../../Translations";
import HeaderBg from "../../../Section/Header/background-img/10-1920x1080.png"
import {registerPage} from "../../../Utils";

export default function HomePage() {
    registerPage("index")
    const t = useTranslations()
    const menuLinks: LinkTo[] = [
        {to: "#workshops-offer", text: t.menu.workshops},
        {to: "#why-us", text: t.menu.whyUs},
        {to: "#trainer", text: t.menu.trainer},
        {to: "#materials", text: t.menu.materials},
        {to: "#contact", text: t.menu.contact, divider: true},
        {to: "/generate", text: t.menu.generate},
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
            <MaterialsSection/>
            <TestimonialsSection to="#workshops-offer"/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};