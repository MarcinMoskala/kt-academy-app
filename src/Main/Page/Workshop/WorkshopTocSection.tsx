import React from "react";
import {useTranslations} from "../../../Translations";
import {Workshop} from "../../../Model";

type Props = {
    workshop: Workshop
};

export default function WorkshopDetailsSection({workshop}: Props) {
    const t = useTranslations();
    return (<section className="workshop-TOC" id="workshop-TOC">
        <div className="gradient--strip skew"/>
        <div className="content-container content-container--gradient--strip">
            <h1 className="white-and-shadow margin-bottom-50">{t.titleToc}</h1>
            <div className="content-rectangle wow pulse">
                <style>
                    {'h4 {margin-bottom: 0; margin-top: 20px;}'}
                </style>
                <div className="text-align-left" dangerouslySetInnerHTML={{__html: workshop.tocHtml}} />
            </div>
        </div>
    </section>);
}