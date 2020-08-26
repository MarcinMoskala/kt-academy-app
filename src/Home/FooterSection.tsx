import React from "react";
import {Lang, translations} from "../Translations";

type Props = {
    lang: Lang
};

export default function FooterSection({lang}: Props) {
    const t = translations(lang);

    return (<footer>
        <div className="content-container">
            <div>
                <p className="mail-contact"> {t.footerContact} <a
                    href="mailto:contact@kt.academy"> contact@kt.academy </a></p>
                <p><a href="/privacyPolicy">{t.privacyPolicy}</a></p>
            </div>
            <div className="copywright-container">
                <p> &copy; Marcin Moskała 2018 </p>
                <p className="www-author"> by <a href="mailto:markiewicz.maja@gmail.com"> Maja Markiewicz </a></p>
            </div>
        </div>
    </footer>);
}