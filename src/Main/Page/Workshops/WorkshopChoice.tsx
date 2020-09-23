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
]

export default function WorkshopChoice({tag, workshops}: Props) {
    const t = useTranslations();
    const sections = tag && SECTIONS.map(it => it.tag).includes(tag) ?
        SECTIONS.filter(it => it.tag === tag) :
        SECTIONS

    return (<section className="workshops-offer" id="workshops-offer">
        <div className="content-container" style={{maxWidth: "1500px"}}>
            {sections.map((s, i) =>
                <div className="section" style={{marginTop: (i !== 0 ? "40px" : "0px")}}>
                    <h2>{s.title}</h2>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {workshops.filter(w => w.tags.includes(s.tag)).map((w, i) =>
                            <div key={i}
                                 className="flex-item flex-item-paddings flex-container--column wow zoomIn"
                                 style={{flexBasis: "400px", maxWidth: "350px"}}>
                                <i className={w.icon} style={{fontSize: "50px"}} />
                                <h3> {w.name} </h3>
                                <p> {w.shortDescription} </p>
                                <Link to={"/workshop/" + w.key} className="button">
                                    {t.privateWorkshop.button}
                                </Link>
                            </div>)}
                    </div>
                </div>
            )}

        </div>
    </section>);
}