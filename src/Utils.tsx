import {useLocation} from "react-router-dom";
import React, {useEffect, useRef} from "react";

export function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current)
            fn();
        else
            didMountRef.current = true;
    }, inputs);
}

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function useScrollToHash() {
    const hash = window.location.hash
    React.useEffect(() => {
        if (hash !== '') {
            // Push onto callback queue so it runs after the DOM is updated,
            // this is required when navigating from a different page so that
            // the element is rendered on the page before trying to getElementById.
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) element.scrollIntoView();
            }, 100);
        }
    }, [hash]);
}

declare global {
    function pingPageLoad(pageKey: string);
}

export function registerPage(localPageKey: string) {
    var pageKey = 'kta-' + localPageKey
    pingPageLoad(pageKey)
}