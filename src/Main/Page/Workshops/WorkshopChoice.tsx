import React from "react";
import {useTranslations} from "../../../Translations";
import {Workshop} from "../../../Model";
import "../../../Utils";
import Link from "../../../Link";

type Props = {
    workshops: Workshop[],
    tag: string | null
};

type Section = {
    title: string,
    tag: string,
}

const SECTIONS: Section[] = [
    {title: "Kotlin workshops", tag: "kotlin"},
    {title: "Best practices workshops", tag: "bestpractices"},
    {title: "For beginners", tag: "beginners"},
    {title: "Testing", tag: "testing"},
]

export default function WorkshopChoice({tag, workshops}: Props) {
    const t = useTranslations();
    const sections = tag && SECTIONS.map(it => it.tag).includes(tag) ?
        SECTIONS.filter(it => it.tag === tag) :
        SECTIONS
    const LAST_SECTION_INDEX = (SECTIONS.length - 1)

    return (<section className="workshops-offer" id="workshops-offer">
        <div className="content-container" style={{maxWidth: "1500px"}}>
            {sections.map((s, sectionIndex) =>
                <div className="section" style={{marginTop: (sectionIndex !== 0 ? "40px" : "0px"), position: "relative"}}>
                    <div id={"tag-" + s.tag} style={{position: "absolute", top: "-100px", left: "0"}}/>
                    <h2>{s.title}</h2>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {workshops.filter(w => w.tags.includes(s.tag)).map((w, workshopIndex) =>
                            <div key={workshopIndex}
                                 className="flex-item flex-item-paddings flex-container--column wow zoomIn"
                                 style={{flexBasis: "400px", maxWidth: "350px", marginBottom: (sectionIndex === LAST_SECTION_INDEX ? "60px" : "0px")}}>
                                <i className={w.icon} style={{fontSize: "50px"}}/>
                                <h3> {w.name} </h3>
                                <p> {w.shortDescription} </p>
                                <Link to={"/workshop/" + w.key} className="button">
                                    {t.workshopsList.button}
                                </Link>
                            </div>)}
                    </div>
                </div>
            )}
            <span> {t.workshopsList.otherOption} <a href="mailto:contact@kt.academy">contact@kt.academy</a>.</span>
        </div>
    </section>);
}