import React from "react";
import {useTranslations} from "../../Translations";
import {Materials} from "../../Model";
import AndroidMaterialsImg from "./training-materials/Kt_Academy_materials_android.png"
import BackendMaterialsImg from "./training-materials/Kt_Academy_materials_backened.png"
import CoroutinesMaterialsImg from "./training-materials/Kt_Academy_materials_coroutines.png"
import MaterialsImg from "./training-materials/Kt_Academy_materials_default.png"

type Props = {
    workshopKey?: string,
    materials?: Materials,
    white?: boolean
};

export default function MaterialsSection({workshopKey, materials, white}: Props) {
    const t = useTranslations();
    const materialsImg = getMaterialsImg(workshopKey)

    return (<section className={"short-section materials" + (white ? " section--white" : "")} id="materials">
        <div className="content-container">
            <div className="flex-container--row">
                <div className="flex-item padding-right-35">
                    <h2> {t.materialsSection.title} </h2>
                    {materials?.book &&
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-book"/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materialsSection.book}</p>
                        </div>
                    </div>
                    }
                    {materials?.online &&
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-tasks"/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materialsSection.onlineTasks}</p>
                        </div>
                    </div>
                    }
                    {materials?.printed &&
                    <div className="flex-container--row margin-bottom-20">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-copy"/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p>{t.materialsSection.printedMaterials}</p>
                        </div>
                    </div>
                    }
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
