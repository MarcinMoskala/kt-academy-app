import {Challenge, ChallengeStatus, User, Workshop, WorkshopSubmission} from "./Model";

export const API_URL = "https://kt.academy/api/"

declare var userUuid: string

type ApiCallParams = {
    lang?: string,
    urlParams?: Record<string, string | null>,
    method?: "GET" | "POST" | "PUT",
    body?: any,
    parseResult?: boolean
};

export function requestApi<T>(path: string, params: ApiCallParams = {}): Promise<T> {
    return buildFetch(path, params)
        .then(res => res.json())
}

export function callApi(path: string, params: ApiCallParams = {}): Promise<Response> {
    return buildFetch(path, params)
}

function removeEmptyValues(obj) {
    if (typeof obj !== "object") return
    Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
}

function buildFetch(path: string, {lang, urlParams, method, body}: ApiCallParams = {}) {
    if (lang) {
        if (urlParams) {
            urlParams = {...urlParams, lang: lang}
        } else {
            urlParams = {lang: lang}
        }
    }

    removeEmptyValues(urlParams)
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
}

function buildQuery(urlParams: Record<string, string | null> | undefined) {
    return urlParams ? ("?" + Object.keys(urlParams)
        .map(key => key + '=' + urlParams[key])
        .join('&')) : "";
}

export function saveUserChallenge(challengeKey: string, body: { code?: string, status?: ChallengeStatus }): Promise<Response> {
    return callApi("challenge/" + challengeKey, {
        method: "PUT",
        body: JSON.stringify(body)
    })
}

export function requestChallenge(challengeKey: string): Promise<Challenge | null> {
    return requestApi<Challenge | null>(`challenge/${challengeKey}`)
}

export function requestCurrentUser(): Promise<User | null> {
    return requestApi<User | null>("user/me")
}

export function requestUsersList(): Promise<User[]> {
    return requestApi<User[]>("user")
}

export function requestWorkshopSubmissionsList(): Promise<WorkshopSubmission[]> {
    return requestApi<WorkshopSubmission[]>("workshop/submission")
}

export function changeWorkshopSubmission(submissionId: string, body: { status: string }): Promise<Response> {
    return callApi("workshop/submission/" + submissionId, {
        method: "PUT",
        body: JSON.stringify(body)
    })
}

var workshopsCache: Map<{ lang: string, trainer: string | null, tag: string | null }, Workshop[]> = new Map()

export function requestWorkshop(workshopKey: string, lang: string): Promise<Workshop> {
    if (workshopsCache) {
        const workshops = Array.from(workshopsCache.values()).flatMap(it => it)
        const workshop = workshops.find(element => element.key === workshopKey);
        if (workshop) {
            return promiseWith(workshop)
        }
    }

    return requestApi<Workshop>("workshop/" + workshopKey, {lang: lang})
}

export function requestWorkshops(lang: string, trainer: string | null, tag: string | null): Promise<Workshop[]> {
    const key = { lang: lang, trainer: trainer, tag: tag }
    if (workshopsCache.has(key)) {
        return promiseWith(workshopsCache.get(key)!)
    }

    return requestApi<Workshop[]>("workshop", {lang: lang, urlParams: {trainer: trainer, tag: tag}})
    // .then(workshops => workshopsCache = workshops)
}

function promiseWith<T>(value: T): Promise<T> {
    return new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc(value);
    });
}