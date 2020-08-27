import React, {useEffect} from 'react';
import HeaderBig from "../Home/HeaderBig";
import JetbrainsCertificationSection from "../Home/JetbrainsCertificationSection";
import TrainerSection from "../Home/TrainerSection";
import TestimonialsSection from "../Home/Testimonials/TestimonialsSection";
import ContactSection from "../Home/ContactSection";
import {Workshop} from "../Model";
import {API_URL} from "../Network";
import MaterialsSection from "../Home/MaterialsSection";
import FooterSection from "../Home/FooterSection";
import "../Utils";
import {useParams} from "react-router-dom";

type Props = {}

export default function WorkshopPage({}: Props) {
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

    if(!workshop) return <></>

    return (
        <>
            <HeaderBig/> {/* Should have proper sections */}
            <JetbrainsCertificationSection/>
            <TrainerSection trainerKey={workshop.trainer.key}/>
            <MaterialsSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};