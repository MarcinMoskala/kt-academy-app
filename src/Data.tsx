import {useTranslations} from "./Translations";
import React, {useMemo} from "react";

export type WorkshopCategory = {
    icon: string,
    title: string,
    desc: string,
    tag: string,
}

export function useWorkshopCategories(): WorkshopCategory[] {
    const t = useTranslations();

    return useMemo(() => {
        return [
            {
                title: t.workshopOffer.kotlinTitle,
                desc: t.workshopOffer.kotlinDesc,
                tag: "kotlin",
                icon: "kotlin-icon"
            },
            {
                title: t.workshopOffer.bestPracticesTitle,
                desc: t.workshopOffer.bestPracticesDesc,
                tag: "bestpractices",
                icon: "fas fa-rocket"
            },
            {
                title: t.workshopOffer.beginnersTitle,
                desc: t.workshopOffer.beginnersDesc,
                tag: "beginners",
                icon: "fas fa-chalkboard"
            },
            {
                title: t.workshopOffer.testingTitle,
                desc: t.workshopOffer.testingDesc,
                tag: "testing",
                icon: "fas fa-vial"
            },
        ]
    }, [t])
}