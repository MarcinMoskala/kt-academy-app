import React from 'react';
import HeaderBig from "./HeaderBig";
import WorkshopOfferSection from "./WorkshopOfferSection";
import WhyUsSection from "./WhyUsSection";
import {Lang} from "../Translations";
import TrainerSection from "./TrainerSection";
import JetbrainsCertificationSection from "./JetbrainsCertificationSection";
import MaterialsSection from "./MaterialsSection";
import TestimonialsSection from "./Testimonials/TestimonialsSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";

type Props = {
    lang: Lang
}

export default function Home({lang}: Props) {
    return (
        <>
            <HeaderBig lang={lang}/>
            <WorkshopOfferSection lang={lang}/>
            <WhyUsSection lang={lang}/>
            <JetbrainsCertificationSection lang={lang}/>
            <TrainerSection lang={lang} trainerKey="marcin"/>
            <MaterialsSection lang={lang}/>
            <TestimonialsSection lang={lang}/>
            <ContactSection lang={lang}/>
            <FooterSection lang={lang}/>
        </>
    );
};