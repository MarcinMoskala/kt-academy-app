import React from "react";
import Link from "../../Link";
import {useLang, useLanguagesList, useTranslations} from "../../Translations";
import {useScrollToHash} from "../../Utils";
import {useLocation} from "react-router-dom";
import "./Header.css"
import {useWindowSize} from "../../Hooks";

export type LinkTo = {
    text: string,
    to: string,
    divider?: boolean,
    translate?: boolean
}

type Props = {
    links?: LinkTo[],
    banner?: Banner,
    allowedLangs?: string[]
};

export type Banner = {
    img: string,
    width: Width,
    title: string,
    subtitle?: string,
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

export default function Header({links = [], banner = undefined, allowedLangs}: Props) {
    useScrollToHash()

    return (
        <>
            <header className={banner ? "banner__background banner--full-width" : ""}
                    style={banner ? {
                        backgroundImage: "url('" + banner.img + "')",
                        height: banner.width === Width.Half ? "65vh" : "100vh",
                        marginTop: banner.width === Width.Half ? "70px" : "35px",
                        zIndex: 1000
                    } : {}}>
                <div className="navigation-bar">
                    <div className="logo-container">
                        <Link title="Kt. Academy" target="_top" to="/" className="pointer logo-img">
                            <img src="/images/Logo_kt.academy.png" width="122,8" height="70,6"
                                 alt="Kt. Academy Logo - Kotlin Workshops"/>
                        </Link>
                    </div>

                    <FlagsDropdown allowedLangs={allowedLangs}/>

                    <MenuItems links={links}/>
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
            {!banner && <div style={{height: "80px"}}/>}
        </>
    )
}

function MenuItems({links}: { links: LinkTo[] }) {
    const windowSize = useWindowSize();
    const t = useTranslations()
    const lang = useLang()

    const hamburgerNavigation = !windowSize.width || windowSize.width < 1000

    links = links.concat([
        {to: "/workshop", text: t.menu.workshops},
        {to: "/course", text: t.menu.courses, translate: false},
    ])

    const musicLink = {to: "/music", text: t.menu.music}
    const generateLink = {to: "/generate", text: t.menu.generate}
    const jsonLink = {to: "/json", text: t.menu.json}
    const blogLink = {to: "https://blog.kotlin-academy.com/", text: t.menu.articles}

    const allLinks = [...links, musicLink, generateLink, jsonLink, blogLink]
    const extraLinks = [musicLink, generateLink, jsonLink,];

    const makeBookmarkElement = (link, index = 0) =>
        <li className="inline" key={index}>
            <Link to={link.to}
                  keepLang={link.translate !== false}
                  className={"nav-link--padding pointer" + (link.divider ? " right-border" : "")}>
                {link.text}
            </Link>
        </li>

    return <div>
        {hamburgerNavigation ?
            <BookmarkDropdown className="bookmarks" links={allLinks}
                              element={<a className="nav__icon"><i className="fas fa-bars"/></a>}/>
            :
            <nav className="bookmarks" id="bookmarks">
                <div>
                    {links.map(makeBookmarkElement)}
                    <div className="inline" style={{float: "right"}}>
                        <Link to={blogLink.to} className="nav-link--padding pointer">
                            {blogLink.text}
                        </Link>
                    </div>
                    <BookmarkDropdown links={extraLinks} element={
                        <Link to="" className="nav__icon pointer" style={{marginTop: 0}}>{t.menu.tools}</Link>
                    }/>
                </div>
            </nav>
        }
    </div>
}

function BookmarkDropdown({links, element, className = ""}: { links: LinkTo[], element, className?: string }) {
    const [showBookmarks, setShowBookmarks] = React.useState(false);
    return <nav
        className={className + " bookmarks-dropdown dropdown" + (showBookmarks ? " open" : " margin-left-10 margin-right-10")}
        onMouseOver={() => !showBookmarks && setShowBookmarks(true)}
        onMouseOut={() => showBookmarks && setShowBookmarks(false)}
        id="bookmarks">
        {links.map((link, index) =>
            <div className="inline" key={index}>
                <Link to={link.to}
                      keepLang={link.translate !== false}
                      className={
                          "nav-link--padding pointer page-scroll" +
                          (index === 0 ? " first-dropdown-item" : "")
                      }>
                    {link.text}
                </Link>
            </div>
        )}
        <div>
            {element}
        </div>
    </nav>;
}

function FlagsDropdown({allowedLangs}: { allowedLangs?: string[] }) {
    const lang = useLang()
    const query = useLocation().search

    let langList = useLanguagesList()
    if (allowedLangs) {
        langList = langList.filter(l => allowedLangs.includes(l.key))
    }

    const [showLangDropdown, setShowLangDropdown] = React.useState(false);

    const onFlagsOver = () => {
        if (!showLangDropdown) setShowLangDropdown(true)
    }
    const onFlagsOut = () => {
        if (showLangDropdown) setShowLangDropdown(false)
    }

    return <>
        {langList.length > 1 &&
        <div className="flags-container pointer" onMouseOver={onFlagsOver} onMouseOut={onFlagsOut}>
            <a onClick={(e) => e.preventDefault()} className="current-flag">
                <img src={lang.flag}
                     alt={lang.key}
                     className="flag margin-right-5 margin-top-5"
                     height="15"/>
                <i className="fas fa-caret-down margin-left-5"/>
                {lang.key}
            </a>
            <div className={showLangDropdown ? "flags-dropdown" : "hide flags-dropdown"} id="flags-dropdown">
                {langList.map((l, i) =>
                    <div key={i}>
                        <Link to={l.path + query} keepLang={false}>
                            <img src={"/images/" + l.flagIcon} alt={l.key}
                                 className="flag margin-right-5 margin-top-20" height="15"/>{l.key}
                        </Link>
                    </div>)
                }
            </div>
        </div>
        }
    </>;
}
