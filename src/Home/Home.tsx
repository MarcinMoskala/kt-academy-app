import React from 'react';
import HeaderBig from "./HeaderBig";
import WorkshopOfferSection from "./WorkshopOfferSection";
import WhyUsSection from "./WhyUsSection";
import TrainerSection from "./TrainerSection";
import JetbrainsCertificationSection from "./JetbrainsCertificationSection";
import MaterialsSection from "./MaterialsSection";
import TestimonialsSection from "./Testimonials/TestimonialsSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";

type Props = {}

export default function Home({}: Props) {
    return (
        <>
            <HeaderBig/>
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