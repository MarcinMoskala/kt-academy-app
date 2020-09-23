import React from "react";
import {useTranslations} from "../Translations";
import {Link} from "react-router-dom";

export default function FooterSection() {
    const t = useTranslations();

    return (<footer>
        <div className="content-container">
            <div>
                <p className="mail-contact"> {t.footerContact} <a
                    href="mailto:contact@kt.academy"> contact@kt.academy </a></p>
                <p><Link to="/privacyPolicy">{t.privacyPolicy}</Link></p>
            </div>
            <div className="copywright-container">
                <p> &copy; Marcin Moskała 2018 </p>
                <p className="www-author"> by <a href="mailto:markiewicz.maja@gmail.com"> Maja Markiewicz </a></p>
            </div>
        </div>
    </footer>);
}