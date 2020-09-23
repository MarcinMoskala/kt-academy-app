import React from "react";
import {useTranslations} from "../../../Translations";
import {Workshop} from "../../../Model";

type Props = {
    workshop: Workshop
};

export default function WorkshopDescriptionSection({workshop}: Props) {
    const t = useTranslations();
    return (<section className="workshop-page">
        <div className="content-container">
            <h3>{workshop.description}</h3>
            {workshop.secondDescription && <h4>{workshop.secondDescription}</h4>}
            <h1 className="margin-top-20">{t.workshopPage.knowledgeSources.title}</h1>
            <div className="flex-container--row">
                <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                    <i className="fas fa-chalkboard-teacher"/>
                    <p style={{marginTop: 0, height: "40px"}}>{t.workshopPage.knowledgeSources.lecture}</p>
                </div>

                <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                    <i className={workshop.practicalTaskIcon ? workshop.practicalTaskIcon : ""}/>
                    <p style={{marginTop: 0, height: "40px"}}>{workshop.practicalTask}</p>
                </div>

                <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                    <i className="fas fa-dumbbell"/>
                    <p style={{marginTop: 0, height: "40px"}}>{t.workshopPage.knowledgeSources.exercises}</p>
                </div>

                {workshop.challenges &&
                <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                    <i className="fas fa-puzzle-piece"/>
                    <p style={{marginTop: 0, height: "40px"}}>{t.workshopPage.knowledgeSources.puzzlers}</p>
                </div>
                }
            </div>
        </div>
    </section>);
}