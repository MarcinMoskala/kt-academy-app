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
import TrustedBySection from "./TrustedBy/TrustedBySection";

export default function HomePage() {
    registerPage("index")
    const t = useTranslations()
    const bannerProps: Banner = {
        img: HeaderBg,
        width: Width.Full,
        title: t.slogan.title,
        subtitle: t.slogan.subtitle
    };
    return (
        <>
            <Header banner={bannerProps}/>
            <WorkshopOfferSection/>
            <WhyUsSection/>
            <MaterialsSection white={true}/>
            <TrustedBySection/>
            <TestimonialsSection to="#workshops-offer"/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};