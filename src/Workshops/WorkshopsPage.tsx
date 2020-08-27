import React, {useEffect} from 'react';
import {Lang} from "../Translations";
import HeaderBig from "../Home/HeaderBig";
import WorkshopOfferSection from "../Home/WorkshopOfferSection";
import JetbrainsCertificationSection from "../Home/JetbrainsCertificationSection";
import TrainerSection from "../Home/TrainerSection";
import TestimonialsSection from "../Home/Testimonials/TestimonialsSection";
import ContactSection from "../Home/ContactSection";
import WorkshopChoice from "./WorkshopChoice";
import {Workshop} from "../Model";
import {API_URL} from "../Network";
import MaterialsSection from "../Home/MaterialsSection";
import FooterSection from "../Home/FooterSection";
import "../Utils";

type Props = {
}

export default function WorkshopsPage({}: Props) {
    const [workshops, setWorkshops] = React.useState<Workshop[]>([]);

    useEffect(() => {
        fetch(API_URL + "/workshop/")
            .then(res => res.json())
            .then(
                (result) => setWorkshops(result),
                (error) => console.log(error)
            )
    }, [])

    return (
        <>
            <HeaderBig/> {/* Should have proper sections */}
            <WorkshopChoice workshops={workshops}/>
            <JetbrainsCertificationSection/>
            <TrainerSection trainerKey={workshops.map(w => w.trainer.key).mostCommon()}/>
            <MaterialsSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};