import React from "react";
import PatrykGrajewski from "./PatrykGrajewski.jpg"
import NataliaNazaruk from "./NataliaNazaruk.jpg"
import MariuszSaramak from "./MariuszSaramak.jpg"
import {Lang, translations} from "../../Translations";

type Props = {
    lang: Lang,
    onButtonClicked?: () => void,
};

// TODO: Extract components
export default function TestimonialsSection({lang, onButtonClicked}: Props) {
    const t = translations(lang);
    const onBookWorkshopButtonClicked = (e) => {
        e.preventDefault()
        if(onButtonClicked) onButtonClicked()
    }

    return (
        <section className="testimonials">
            <div className="content-container content-container--full-width">
                <h2> {t.testimonials.subtitle} </h2>
                <div className="flex-container--row">

                    <div
                        className="flex-item padding-right-testimonials padding-top-30  flex-item--testimonials wow fadeInLeft flex-container--column">
                        <div className="flex-container--column">
                            <div className="flex-item--image-container">
                                <img className="round-photo round-photo-small" src={MariuszSaramak}
                                     alt="Mariusz Saramak - Kt.Academy references"/>
                            </div>
                            <div className="flex-item margin-top-20">
                                <h2 className="margin-bottom-5"> Mariusz Saramak </h2>
                                <h3 className="margin-bottom-5"> Expert Android Developer </h3>
                                <h3 className="margin-bottom-5"> Tom Tom </h3>
                            </div>
                        </div>
                        <blockquote
                            className="flex-item--flex-start margin-top-30"> {t.testimonials.saramak} </blockquote>
                    </div>

                    <div
                        className="flex-item padding-left-testimonials padding-right-testimonials padding-top-30 flex-item--testimonials wow fadeInLeft flex-container--column">
                        <div className="flex-container--column">
                            <div className="flex-item--image-container">
                                <img className="round-photo round-photo-small" src={NataliaNazaruk}
                                     alt="Natalia Nazaruk - Kt.Academy references"/>
                            </div>
                            <div className="flex-item margin-top-20">
                                <h2 className="margin-bottom-5"> Natalia Nazaruk </h2>
                                <h3 className="margin-bottom-5"> IT Developer (Android) </h3>
                                <h3 className="margin-bottom-5 "> Nordea </h3>
                            </div>
                        </div>
                        <blockquote
                            className="flex-item--flex-start margin-top-30"> {t.testimonials.nazaruk}</blockquote>
                    </div>


                    <div
                        className="flex-item padding-left-testimonials padding-top-30 flex-item--testimonials wow fadeInLeft flex-container--column">
                        <div className="flex-container--column">
                            <div className="flex-item--image-container">
                                <img className="round-photo round-photo-small" src={PatrykGrajewski}
                                     alt="Patryk Grajewski - Kt.Academy references"/>
                            </div>
                            <div className="flex-item margin-top-20">
                                <h2 className="margin-bottom-5"> Patryk Grajewski </h2>
                                <h3 className="margin-bottom-5"> Android Software Engineer </h3>
                                <h3 className="margin-bottom-5 "> Sii Poland </h3>
                            </div>
                        </div>
                        <blockquote
                            className="flex-item--flex-start margin-top-30"> {t.testimonials.grajewski} </blockquote>
                    </div>
                </div>
                {onButtonClicked &&
                <div className="book-workshop-button">
                    <div>
                        <a onClick={onBookWorkshopButtonClicked}
                           id="testymonials-button"
                           className="button wow fadeInUp page-scroll margin-top-50"> {t.testimonials.button} </a>
                    </div>
                </div>
                }
            </div>
        </section>
    );
}