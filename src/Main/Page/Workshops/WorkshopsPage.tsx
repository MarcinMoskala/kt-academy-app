import React from 'react';
import Header, {LinkTo, Width} from "../../../Section/Header/Header";
import WorkshopChoice from "./WorkshopChoice";
import FooterSection from "../../../Section/FooterSection";
import "../../../ArrayUtils";
import {registerPage, useQuery} from "../../../Utils";
import {useTranslations} from "../../../Translations";
import HeaderBg from "../../../Section/Header/background-img/4-1920x1080.png"
import {useWorkshops} from "../../../Hooks";
import {LoadingPage} from "../../../Loading";

export default function WorkshopsPage() {
    const t = useTranslations();
    const query = useQuery()
    const tag = query.get("tag")
    const trainer = query.get("trainer")
    registerPage(`workshops-${tag}-${trainer}`)
    const workshops = useWorkshops(tag, trainer)

    let bannerOptions = {
        img: HeaderBg,
        title: t.workshopOffer.title,
        subtitle: t.workshopOffer.subtitle,
        width: Width.Full,
    };

    if (!workshops) {
        return <LoadingPage/>
    }

    return (
        <>
            <Header banner={bannerOptions}/>
            <WorkshopChoice tag={tag} workshops={workshops}/>
            <FooterSection/>
        </>
    );
};