import React from "react";
import {Lang, translations} from "../Translations";

type Props = {
    lang: Lang
};

export default function WorkshopOffer({lang}: Props) {
    const t = translations(lang);
    return (<section className="why-us padding-top-0" id="why-us">
        <div className="gradient--strip"></div>
        <div className="content-container content-container--gradient--strip">
            <h1 className="white margin-bottom-30"> {t.whyUs.title} </h1>
            <h3 className="white margin-bottom-50"> {t.whyUs.subtitle} </h3>
            <div className="content-rectangle flex-container--row">
                <div className="flex-item--with-border flex-container--row wow pulse">
                    <div className="flex-item--with-symbol">
                        <i className="fas fa-code"></i>
                    </div>
                    <div className="flex-item--after-symbol">
                        <h3> {t.whyUs.practicalTitle} </h3>
                        <p> {t.whyUs.practicalDesc1} </p>
                        <p> {t.whyUs.practicalDesc2} </p>
                    </div>
                </div>

                <div className="flex-item--right wow pulse flex-container--column">

                    <div className="flex-container--row margin-bottom-20 flex-basis-auto">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-puzzle-piece "></i>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p className="margin-bottom-5"> {t.whyUs.puzzlers} </p>
                            <a href="{link.puzzler}"
                               className="button button--mini"> {t.whyUs.puzzlersButton} </a>
                        </div>
                    </div>

                    <div className="flex-container--row margin-bottom-20 flex-basis-auto">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-brain"></i>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p className="margin-bottom-5"> {t.whyUs.challenges} </p>
                            <a href="{link.challenges}"
                               className="button button--mini"> {t.whyUs.challengesButton} </a>
                        </div>
                    </div>

                    <div className="flex-container--row flex-basis-auto">
                        <div className="flex-item--with-symbol">
                            <i className="fab fa-android padding-bottom-0 symbol-width"></i>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p className="margin-bottom-5"> {t.whyUs.app} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}