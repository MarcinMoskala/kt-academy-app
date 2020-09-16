import {useLocation} from "react-router-dom";
import {API_URL} from "./Network";
import React from "react";

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

declare var userUuid: string

type ApiCallParams = {
    lang?: string,
    urlParams?: Record<string, string | null>,
    method?: "GET" | "POST",
    body?: any
};

export function callApi<T>(path: string, {lang, urlParams, method, body}: ApiCallParams = {}): Promise<T> {
    if (lang) {
        if (urlParams) {
            urlParams = {...urlParams, lang: lang}
        } else {
            urlParams = {lang: lang}
        }
    }

    const search = buildQuery(urlParams);

    return fetch(API_URL + path + search, {
        headers: {
            'Content-Type': 'application/json',
            'userUuid': userUuid ? userUuid : ""
        },
        ...(method && {method: method}),
        ...(body &&
            ((typeof body === "string" && {body: body}) ||
                ({body: JSON.stringify(body)}))
        ),
    })
        .then(res => res.json())
}

function buildQuery(urlParams: Record<string, string | null> | undefined) {
    return urlParams ? ("?" + Object.keys(urlParams)
        .map(key => key + '=' + urlParams[key])
        .join('&')) : "";
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