import React from 'react';
import Header, {Banner, LinkTo, Width} from "../../../Section/Header/Header";
import WorkshopOfferSection from "./WorkshopOfferSection";
import WhyUsSection from "./WhyUsSection";
import MaterialsSection from "../../Section/MaterialsSection";
import TestimonialsSection from "../Testimonials/TestimonialsSection";
import ContactSection from "../../Section/ContactSection";
import FooterSection from "../../../Section/FooterSection";
import {useTranslations} from "../../../Translations";
import HeaderBg from "../../../Section/Header/background-img/3-1920x1080.png"
import {registerPage} from "../../../Utils";

export default function HomePage() {
    registerPage("index")
    const t = useTranslations()
    const menuLinks: LinkTo[] = [
        {to: "#workshops-offer", text: t.menu.offer},
        {to: "#why-us", text: t.menu.whyUs},
        {to: "#contact", text: t.menu.contact, divider: true},
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