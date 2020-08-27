import React from 'react';
import HeaderBig, {Section} from "./HeaderBig";
import WorkshopOfferSection from "./WorkshopOfferSection";
import WhyUsSection from "./WhyUsSection";
import TrainerSection from "./TrainerSection";
import JetbrainsCertificationSection from "./JetbrainsCertificationSection";
import MaterialsSection from "./MaterialsSection";
import TestimonialsSection from "./Testimonials/TestimonialsSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";
import {useTranslations} from "../Translations";
import {useScrollToHash} from "../Utils";

type Props = {}

export default function Home({}: Props) {
    const t = useTranslations()
    const sections: Section[] = [
        {hash: "workshops-offer", text: t.menu.workshops},
        {hash: "why-us", text: t.menu.whyUs},
        {hash: "trainer", text: t.menu.trainer},
        {hash: "materials", text: t.menu.materials},
        {hash: "contact", text: t.menu.contact},
    ]
    return (
        <>
            <HeaderBig sections={sections}/>
            <WorkshopOfferSection/>
            <WhyUsSection/>
            <JetbrainsCertificationSection/>
            <TrainerSection trainerKey="marcin"/>
            <MaterialsSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};