import React, {useEffect} from 'react';
import Header from "../../Section/Header/Header";
import JetbrainsCertificationSection from "../../Section/JetbrainsCertificationSection";
import TrainerSection from "../../Section/TrainerSection";
import TestimonialsSection from "../Testimonials/TestimonialsSection";
import ContactSection from "../../Section/ContactSection";
import WorkshopChoice from "./WorkshopChoice";
import {Workshop} from "../../../Model";
import MaterialsSection from "../../Section/MaterialsSection";
import FooterSection from "../../Section/FooterSection";
import "../../../ArrayUtils";
import {useLocation} from "react-router-dom";
import {callApi, useQuery} from "../../../Utils";
import {useLang} from "../../../Translations";

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
            <Header/> {/* Should have proper sections */}
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