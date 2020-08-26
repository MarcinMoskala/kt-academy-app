import React from "react";
import {Lang, translations} from "../Translations";
import {Workshop} from "../Model";

type Props = {
    lang: Lang,
    workshop?: Workshop,
    materialsImg?: string,
    whiteBg?: boolean
};

export default function MaterialsSection({lang, materialsImg = "default", whiteBg = false}: Props) {
    const t = translations(lang);
    return (<section className={(whiteBg ? "section--white" : "") + "short-section materials"} id="materials">
        <div className="content-container">
            <div className="flex-container--row">
                <div className="flex-item padding-right-35">
                    <h2> {t.materials.title} </h2>
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-book"></i>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materials.book}</p>
                        </div>
                    </div>
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-copy"></i>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materials.cheatsheet}</p>
                        </div>
                    </div>
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-tasks"></i>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materials.tasks}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-item--image-container">
                    <img className="wow zoomIn image-plus-text big-image"
                         src={"/images/training-materials/Kt_Academy_materials_" + materialsImg + ".png"}
                         alt="Kt. Academy materials"/>
                </div>
            </div>

        </div>
    </section>);
}