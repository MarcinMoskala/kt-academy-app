import {useTranslations} from "./Translations";
import {useMemo} from "react";

export type WorkshopCategory = {
    title: string,
    desc: string,
    tag: string,
}

export function useWorkshopCategories(): WorkshopCategory[] {
    const t = useTranslations();

    return useMemo(() => {
        return [
            {title: t.workshopOffer.kotlinTitle, desc: t.workshopOffer.kotlinDesc, tag: "kotlin"},
            {title: t.workshopOffer.bestPracticesTitle, desc: t.workshopOffer.bestPracticesDesc, tag: "bestpractices"},
            {title: t.workshopOffer.beginnersTitle, desc: t.workshopOffer.beginnersDesc, tag: "beginners"},
            {title: t.workshopOffer.testingTitle, desc: t.workshopOffer.testingDesc, tag: "testing"},
        ]
    }, [t])
}