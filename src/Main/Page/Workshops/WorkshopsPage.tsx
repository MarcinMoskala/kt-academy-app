import React from 'react';
import Header, {Width} from "../../../Section/Header/Header";
import WorkshopChoice from "./WorkshopChoice";
import FooterSection from "../../../Section/FooterSection";
import "../../../ArrayUtils";
import {registerPage, useQuery} from "../../../Utils";
import {useTranslations} from "../../../Translations";
import HeaderBg from "../../../Section/Header/background-img/4-1920x1080.png"
import {useWorkshops} from "../../../Hooks";
import {ErrorPage, LoadingPage} from "../../../Loading";
import {Workshop} from "../../../Model";

export default function WorkshopsPageWrapper() {
    const query = useQuery()
    const tag = query.get("tag")
    const trainer = query.get("trainer")
    registerPage(`workshops-${tag}-${trainer}`)
    const workshops = useWorkshops(tag, trainer)

    if (workshops === undefined) {
        return <LoadingPage/>
    }

    if (workshops === null) {
        return <ErrorPage/>
    }

    return <WorkshopsPage tag={tag} workshops={workshops}/>
}

function WorkshopsPage({tag, workshops}: { tag: string | null, workshops: Workshop[] }) {
    const t = useTranslations();

    let bannerOptions = {
        img: HeaderBg,
        title: t.workshopOffer.title,
        subtitle: t.workshopOffer.subtitle,
        width: Width.Full,
    };
    return (
        <>
            <Header banner={bannerOptions}/>
            <WorkshopChoice tag={tag} workshops={workshops}/>
            <FooterSection/>
        </>
    );
};