import React from 'react';
import {Link as ReactLink} from 'react-router-dom';
import {useLang} from "./Translations";

export default function Link(props) {
    const {to, children, keepLang = true, ...rest} = props;
    const {pathPrefix} = useLang()
    const newLink = keepLang ? pathPrefix + to : to
    if (isInternal(to)) {
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

function parseTo(to) {
    let parser = document.createElement('a')
    parser.href = to
    return parser
}
