import React from "react";
import {Link} from "react-router-dom";
import {Lang, useLangStr, useTranslations} from "../Translations";

type Props = {
};

export default function HeaderBig({}: Props) {
    const t = useTranslations()
    const langStr = useLangStr()
    const currentLangFlag = langStr === Lang.PL ? "/images/pl-flag.png" : "/images/uk-flag.png"

    const [showBookmarks, setShowBookmarks] = React.useState(false);
    const responsiveNavMenuClicked = (e: React.MouseEvent<HTMLElement>) => {
        console.log("Clicked")
        e.preventDefault()
        setShowBookmarks(!showBookmarks)
    }

    const [showLangDropdown, setShowLangDropdown] = React.useState(false);
    const onFlagsOver = (e) => {
        if (!showLangDropdown) setShowLangDropdown(true)
    }
    const onFlagsOut = (e) => {
        if (showLangDropdown) setShowLangDropdown(false)
    }

    return (
        <>
            <header className="banner__background banner--full-width banner__url--home">

                <div className="navigation-bar">
                    <div className="logo-container">
                        <Link title="Kt. Academy" target="_top" to="/" className="pointer logo-img">
                            <img src="/images/Logo_kt.academy.png" width="122,8" height="70,6"
                                 alt="Kt. Academy Logo - Kotlin Workshops"/>
                        </Link>
                    </div>

                    <div className="flags-container pointer" onMouseOver={onFlagsOver} onMouseOut={onFlagsOut}>
                        <a href="javascript:void(0);" className="current-flag">
                            <img src={currentLangFlag}
                                 alt={langStr}
                                 className="flag margin-right-5 margin-top-5"
                                 height="15"/>
                            <i className="fas fa-caret-down margin-left-5"/>
                            {langStr}
                        </a>
                        <ul className={showLangDropdown ? "flags-dropdown" : "hide flags-dropdown"} id="flags-dropdown">
                            <li><Link to="/">
                                <img src="/images/uk-flag.png" alt="uk-flag"
                                     className="flag margin-right-5 margin-top-20" height="15"/>EN</Link>
                            </li>
                            <li><Link to="/pl">
                                <img src="/images/pl-flag.png" alt="pl-flag"
                                     className="flag margin-right-5 margin-top-20" height="15"/>PL</Link>
                            </li>
                        </ul>
                    </div>

                    <nav className={showBookmarks ? "bookmarks responsive" : "bookmarks"} id="bookmarks">
                        <ul>
                            <li className="inline">
                                <a href="#workshops-offer"
                                   className="nav-link--padding pointer page-scroll first-bookmark">{t.menu.workshops}</a>
                            </li>

                            <li className="inline">
                                <a href="#why-us"
                                   className="nav-link--padding pointer page-scroll">{t.menu.whyUs}</a>
                            </li>

                            <li className="inline">
                                <a href="#trainer"
                                   className="nav-link--padding pointer page-scroll">{t.menu.trainer}</a>
                            </li>

                            <li className="inline">
                                <a href="#materials"
                                   className="nav-link--padding pointer page-scroll">{t.menu.materials}</a>
                            </li>

                            <li className="inline">
                                <a href="#contact"
                                   className="nav-link--padding pointer page-scroll right-border">{t.menu.contact}</a>
                            </li>

                            <li className="inline">
                                <a href="https://blog.kotlin-academy.com" className="nav-link--padding pointer"
                                   target="_blank">
                                    {t.menu.articles}
                                </a>
                            </li>
                            <li className="inline">
                                <a className="nav__icon" onClick={responsiveNavMenuClicked}>
                                    <i className="fas fa-bars"/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="banner">
                    <div className="wow fadeInDown banner__text-container">
                        <h1>{t.slogan.title}</h1>
                        <h3>{t.slogan.subtitle}</h3>
                    </div>
                </div>
            </header>
        </>
    )
}