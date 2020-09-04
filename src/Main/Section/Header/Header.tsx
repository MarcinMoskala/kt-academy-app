import React from "react";
import Link from "../../../Link";
import {useLang, useLanguagesList, useTranslations} from "../../../Translations";
import {useScrollToHash} from "../../../Utils";
import {useLocation} from "react-router-dom";

export type LinkTo = {
    text: string,
    to: string,
    divider?: boolean
}

type Props = {
    links?: LinkTo[],
    banner?: Banner
};

export type Banner = {
    img: string,
    width: Width,
    title: string,
    subtitle: string | null,
    button?: Button
}

export enum Width {
    Full,
    Half
}

type Button = {
    text: string,
    to: string
}

export default function Header({links, banner = undefined}: Props) {
    const t = useTranslations()
    const langStr = useLang()
    const langList = useLanguagesList()
    const query = useLocation().search

    if (!links) {
        links = [{text: t.menu.home, to: "/"}]
    }

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
                    style={banner ? {
                        backgroundImage: "url('" + banner.img + "')",
                        height: banner.width == Width.Half ? "65vh" : "100vh",
                        marginTop: banner.width == Width.Half ? "70px" : "35px"
                    } : {}}>
                <div className="navigation-bar">
                    <div className="logo-container">
                        <Link title="Kt. Academy" target="_top" to="/" className="pointer logo-img">
                            <img src="/images/Logo_kt.academy.png" width="122,8" height="70,6"
                                 alt="Kt. Academy Logo - Kotlin Workshops"/>
                        </Link>
                    </div>

                    <div className="flags-container pointer" onMouseOver={onFlagsOver} onMouseOut={onFlagsOut}>
                        <a onClick={(e) => e.preventDefault()} className="current-flag">
                            <img src={langStr.flag}
                                 alt={langStr.key}
                                 className="flag margin-right-5 margin-top-5"
                                 height="15"/>
                            <i className="fas fa-caret-down margin-left-5"/>
                            {langStr.key}
                        </a>
                        <ul className={showLangDropdown ? "flags-dropdown" : "hide flags-dropdown"} id="flags-dropdown">
                            {langList.map((l, i) =>
                                <li key={i}>
                                    <Link to={l.path + query} keepLang={false}>
                                        <img src={"/images/" + l.flagIcon} alt={l.key}
                                             className="flag margin-right-5 margin-top-20" height="15"/>{l.key}
                                    </Link>
                                </li>)
                            }
                        </ul>
                    </div>

                    <nav className={showBookmarks ? "bookmarks responsive" : "bookmarks"} id="bookmarks">
                        <ul>
                            {links.map((link, index) =>
                                <li className="inline" key={index}>
                                    <Link to={link.to}
                                          className={
                                              "nav-link--padding pointer page-scroll" +
                                              (index == 0 ? " first-bookmark" : "") +
                                              (link.divider ? " right-border" : "")
                                          }>
                                        {link.text}
                                    </Link>
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
                        {banner.button &&
                        <Link to={banner.button.to}
                              className="button button--white pointer">{banner.button.text}</Link>
                        }
                    </div>
                </div>
                }
            </header>
        </>
    )
}