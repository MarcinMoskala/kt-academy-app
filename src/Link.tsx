import React from 'react';
import {Link as ReactLink} from 'react-router-dom';
import {useLang} from "./Translations";

export default function Link(props) {
    const {to, children, keepLang = true, ...rest} = props;
    const {pathPrefix} = useLang()
    if (!to) {
        return (<a {...rest}>{children}</a>);
    } else if (isInternal(to) && !isResource(to)) {
        const newLink = keepLang && !isOnlyHash(to) ? pathPrefix + to : to
        return (<ReactLink to={newLink} {...rest}>{children}</ReactLink>);
    } else {
        return (<a href={to} target="_blank" {...rest}>{children}</a>);
    }
}

function isInternal(to) {
    if (to.indexOf("://") === -1) return true
    const toLocation = parseTo(to)
    return window.location.hostname === toLocation.hostname
}

function isResource(to) {
    return to.endsWith(".pdf")
}

function isOnlyHash(to) {
    return to.startsWith("#")
}

function parseTo(to) {
    let parser = document.createElement('a')
    parser.href = to
    return parser
}
