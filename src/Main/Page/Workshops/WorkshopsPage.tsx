import React, {useEffect} from 'react';
import Header, {LinkTo, Width} from "../../Section/Header/Header";
import JetbrainsCertificationSection from "../../Section/JetbrainsCertificationSection";
import TrainerSection from "../../Section/Trainer/TrainerSection";
import TestimonialsSection from "../Testimonials/TestimonialsSection";
import ContactSection from "../../Section/ContactSection";
import WorkshopChoice from "./WorkshopChoice";
import {Workshop} from "../../../Model";
import MaterialsSection from "../../Section/MaterialsSection";
import FooterSection from "../../Section/FooterSection";
import "../../../ArrayUtils";
import {registerPage, useQuery} from "../../../Utils";
import {useLang, useTranslations} from "../../../Translations";
import HeaderBg from "../../Section/Header/background-img/4-1920x1080.png"
import {requestApi} from "../../../Network";
import {useWorkshops} from "../../../Hooks";
import ReactLoading from 'react-loading';

export default function WorkshopsPage() {
    const t = useTranslations();
    const query = useQuery()
    const tag = query.get("tag")
    const trainer = query.get("trainer")
    registerPage(`workshops-${tag}-${trainer}`)
    const workshops = useWorkshops(tag, trainer)

    const links: LinkTo[] = [
        {text: t.menu.home, to: "/", divider: true},
        {text: t.menu.privateWorkshops, to: "#workshops-offer"},
        {text: t.menu.trainer, to: "#trainer"},
        {text: t.menu.materials, to: "#materials"},
        {text: t.menu.contact, to: "#contact"},
    ]

    let bannerOptions = {
        img: HeaderBg,
        title: t.workshopOffer.title,
        subtitle: t.workshopOffer.subtitle,
        width: Width.Full,
    };

    return (
        <>
            <Header links={links} banner={bannerOptions}/>
            {workshops ?
                <WorkshopChoice workshops={workshops}/>
                :<ReactLoading/>
            }
            <JetbrainsCertificationSection/>
            <TrainerSection trainerKey={workshops?.map(w => w.trainer.key)?.mostCommon()}/>
            <MaterialsSection/>
            <TestimonialsSection/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
};