import React from "react";
import {useTranslations} from "../../Translations";
import {Workshop} from "../../Model";
import AndroidMaterialsImg from "./training-materials/Kt_Academy_materials_android.png"
import BackendMaterialsImg from "./training-materials/Kt_Academy_materials_backened.png"
import CoroutinesMaterialsImg from "./training-materials/Kt_Academy_materials_coroutines.png"
import MaterialsImg from "./training-materials/Kt_Academy_materials_default.png"

type Props = {
    workshop?: Workshop
};

export default function MaterialsSection({workshop}: Props) {
    const t = useTranslations();
    const materialsImg = getMaterialsImg(workshop?.key)

    return (<section className={"short-section materials"} id="materials">
        <div className="content-container">
            <div className="flex-container--row">
                <div className="flex-item padding-right-35">
                    <h2> {t.materialsSection.title} </h2>
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-book"/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materialsSection.book}</p>
                        </div>
                    </div>
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-copy"/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materialsSection.cheatsheet}</p>
                        </div>
                    </div>
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-tasks"/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materialsSection.tasks}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-item--image-container">
                    <img className="wow zoomIn image-plus-text big-image"
                         src={materialsImg}
                         alt="Kt. Academy materials"/>
                </div>
            </div>

        </div>
    </section>);
}

function getMaterialsImg(workshopKey?: string) {
    switch (workshopKey) {
        case "android":
            return AndroidMaterialsImg
        case "backened":
            return BackendMaterialsImg
        case "coroutines":
            return CoroutinesMaterialsImg
        default:
            return MaterialsImg
    }
}
