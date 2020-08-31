import React, {useEffect} from 'react';
import Header from "../Section/Header/Header";
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
            <Header/> {/* Should have proper sections */}
            <JetbrainsCertificationSection/>
            <TrainerSection trainerKey={workshop.trainer.key}/>
            <MaterialsSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};