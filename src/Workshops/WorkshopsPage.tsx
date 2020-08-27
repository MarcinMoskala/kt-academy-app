import React, {useEffect} from 'react';
import HeaderBig from "../Home/HeaderBig";
import JetbrainsCertificationSection from "../Home/JetbrainsCertificationSection";
import TrainerSection from "../Home/TrainerSection";
import TestimonialsSection from "../Home/Testimonials/TestimonialsSection";
import ContactSection from "../Home/ContactSection";
import WorkshopChoice from "./WorkshopChoice";
import {Workshop} from "../Model";
import MaterialsSection from "../Home/MaterialsSection";
import FooterSection from "../Home/FooterSection";
import "../ArrayUtils";
import {useLocation} from "react-router-dom";
import {callApi, useQuery} from "../Utils";
import {useLang} from "../Translations";

type Props = {}

export default function WorkshopsPage({}: Props) {
    const [workshops, setWorkshops] = React.useState<Workshop[]>([]);
    const query = useQuery()
    const tag = query.get("tag")
    const trainer = query.get("trainer")
    const lang = useLang()

    useEffect(() => {
        callApi({path: "workshop/", lang: lang, urlParams: {trainer: trainer, tag: tag}})
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