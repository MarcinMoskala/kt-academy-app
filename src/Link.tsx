import React from 'react';
import {Link as ReactLink} from 'react-router-dom';
import {useLang} from "./Translations";

export default function WorkshopOffer(props) {
    const {to, children, ...rest} = props;
    const {pathPrefix} = useLang()
    if (isInternal(to)) {
        return (<ReactLink to={pathPrefix + to} {...rest}>{children}</ReactLink>);
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
