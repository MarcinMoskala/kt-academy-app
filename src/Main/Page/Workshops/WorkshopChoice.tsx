import React from "react";
import {useTranslations} from "../../../Translations";
import {Workshop} from "../../../Model";
import "../../../Utils";
import Link from "../../../Link";

type Props = {
    workshops: Workshop[]
};

export default function WorkshopChoice({workshops}: Props) {
    const t = useTranslations();
    const workshopsChucked = workshops.chunk(2);
    return (<section className="workshops-offer" id="workshops-offer">
        <div className="content-container">
            <h1> {t.privateWorkshop.offerTitle} </h1>
            <p> {t.privateWorkshop.offerDesc}</p>

            {workshopsChucked.map((wC, i) =>
                <div key={i} className="flex-container--row <#if workshops?is_first><#else>margin-top-30</#if>">
                    {wC.map((w, i) => <div key={i}
                                           className="flex-item flex-item-paddings flex-container--column margin-right-20 wow zoomIn">
                        <i className={w.icon}/>
                        <h3> {w.name} </h3>
                        <p> {w.description} </p>
                        <Link to={"/workshop/" + w.key} className="button">
                            {t.privateWorkshop.button}
                        </Link>
                        <Link to={"/workshopForm/" + w.key} className="margin-top-20 link-to-page-gtm">
                            {t.privateWorkshop.belowButton}
                        </Link>
                    </div>)}
                </div>)
            }

            <span className="margin-top-30"> {t.privateWorkshop.otherOption}
                <a href="mailto:contact@kt.academy">contact@kt.academy</a>.

                <h2 className="margin-top-50">{t.privateWorkshop.benefits.title}</h2>

                <div className="flex-container--row">

                    <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                        <i className="fas fa-gift"/>
                        <h3> {t.privateWorkshop.benefits.tailoredTitle} </h3>
                        <p> {t.privateWorkshop.benefits.tailoredDesc} </p>
                    </div>

                    <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                        <i className="far fa-calendar-check"/>
                        <h3> {t.privateWorkshop.benefits.dateTitle} </h3>
                        <p> {t.privateWorkshop.benefits.dateDesc} </p>
                    </div>

                    <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                        <i className="fas fa-map-marked-alt"/>
                        <h3>{t.privateWorkshop.benefits.locationTitle} </h3>
                        <p> {t.privateWorkshop.benefits.locationDesc} </p>
                    </div>

                </div>
            </span>
        </div>
    </section>);
}