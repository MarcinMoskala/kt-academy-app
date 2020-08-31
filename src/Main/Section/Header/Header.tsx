import React from "react";
import LinkPossiblyExternal from "./LinkPossiblyExternal";
import {Link} from "react-router-dom";
import {Lang, useLang, useLanguagesList, useTranslations} from "../../../Translations";
import {useScrollToHash} from "../../../Utils";

export type LinkTo = {
    text: string,
    to: string,
    divider?: boolean,
    external ?: boolean
}

type Props = {
    links?: LinkTo[],
    banner?: Banner
};

type Banner = {
    img: string,
    title: string,
    subtitle?: string,
    button?: Button
}

type Button = {
    text: string,
    onClick: (e: React.FormEvent) => void
}

export default function Header({links = [], banner = undefined}: Props) {
    const t = useTranslations()
    const langStr = useLang()
    const langList = useLanguagesList()
    const currentLangFlag = langStr === Lang.PL ? "/images/pl-flag.png" : "/images/uk-flag.png"

    useScrollToHash()

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
            <header className={banner ? "banner__background banner--full-width" : ""}
                    style={banner ? {backgroundImage: "url('" + banner.img + "')"} : {}}>
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
                            {langList.map(l =>
                                <li><Link to="/">
                                    <img src={"/images/" + l.flagIcon} alt={l.key}
                                         className="flag margin-right-5 margin-top-20" height="15"/>{l.key}</Link>
                                </li>)
                            }
                        </ul>
                    </div>

                    <nav className={showBookmarks ? "bookmarks responsive" : "bookmarks"} id="bookmarks">
                        <ul>
                            {links.map((link, index) =>
                                <li className="inline" key={index}>
                                    <LinkPossiblyExternal to={link.to}
                                                          className={
                                              "nav-link--padding pointer page-scroll" +
                                              (index == 0 ? " first-bookmark" : "") +
                                              (link.divider ? " right-border" : "")
                                          }>
                                        {link.text}
                                    </LinkPossiblyExternal>
                                </li>
                            )}
                            <li className="inline">
                                <a className="nav__icon" onClick={responsiveNavMenuClicked}>
                                    <i className="fas fa-bars"/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                {banner &&
                <div className="banner">
                    <div className="wow fadeInDown banner__text-container">
                        <h1>{banner.title}</h1>
                        <h3>{banner.subtitle}</h3>
                    </div>
                </div>
                }
            </header>
        </>
    )
}