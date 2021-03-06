import {
    Challenge,
    ChallengeStatus,
    Course,
    PageStatistics, PublicWorkshop,
    RecommendationCollection,
    RecommendationData,
    Statistics,
    User,
    Workshop,
    WorkshopSubmission
} from "./Model";
import {PrivateFormData} from "./Main/Page/Form/WorkshopFormPage";
import {PublicFormData} from "./Main/Page/Form/WorkshopRequestPublicFormPage";
import {PublicPlannedFormData} from "./Main/Page/Form/WorkshopRegisterToPlannedPublicFormPage";

export const API_URL = "https://api.kt.academy/api/"

declare var userUuid: string

type ApiCallParams = {
    lang?: string,
    urlParams?: Record<string, string | null>,
    method?: "GET" | "POST" | "PUT" | "PATCH",
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

export class HttpError extends Error {
    private readonly _code: number;
    private readonly _statusText: string;

    constructor(code: number, statusText: string, message: string) {
        super(message);
        this._code = code;
        this._statusText = statusText;

        Object.setPrototypeOf(this, HttpError.prototype);
    }

    get code(): number {
        return this._code;
    }

    get statusText(): string {
        return this._statusText;
    }
}

async function buildFetch(
    path: string,
    {lang, urlParams, method, body}: ApiCallParams = {}
): Promise<Response> {
    if (lang) {
        if (urlParams) {
            urlParams = {...urlParams, lang: lang};
        } else {
            urlParams = {lang: lang};
        }
    }

    removeEmptyValues(urlParams);
    const search = buildQuery(urlParams);

    const response = await fetch(API_URL + path + search, {
        headers: {
            "Content-Type": "application/json",
            userUuid: userUuid ? userUuid : ""
        },
        ...(method && {method: method}),
        ...(body &&
            ((typeof body === "string" && {body: body}) || {
                body: JSON.stringify(body)
            }))
    });
    if (response.ok) {
        return response;
    } else {
        throw new HttpError(
            response.status,
            response.statusText,
            await response.text()
        );
    }
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

export function requestUserByKey(userKey: string): Promise<User | null> {
    return requestApi<User | null>(`user/key/${userKey}`)
}

export function requestCurrentUser(): Promise<User | null> {
    return requestApi<User | null>("user/me")
}

export function requestUsersList(): Promise<User[]> {
    return requestApi<User[]>("user")
}

export function requestStatistics(): Promise<Statistics> {
    return requestApi<Statistics>("statistics")
}

export function requestPageStatistics(pageKey: string): Promise<PageStatistics> {
    return requestApi<PageStatistics>(`statistics/${pageKey}`)
}

export type PatchUserSelfRequest = {
    customImageUrl?: string | null, // Empty means removing
    publicKey?: string | null, // Empty means removing
    bio?: string | null,
}

export function patchUserSelf(body: PatchUserSelfRequest): Promise<Response> {
    return callApi("user/me", {
        method: "PATCH",
        body: body
    })
}

export function putUserAdmin(userId: string, body: { tags: string[] }): Promise<Response> {
    return callApi("user/" + userId, {
        method: "PUT",
        body: body
    })
}

export function requestCourse(courseKey: string): Promise<Course> {
    return requestApi<Course>(`course/${courseKey}`)
}

export function requestCourses(): Promise<Course[]> {
    return requestApi<Course[]>(`course`)
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

export function requestVideoRecommendations(): Promise<RecommendationCollection> {
    return requestApi<RecommendationCollection>("recommendation/video/")
}

export function callAddRecommendation(body: { key: string, data: RecommendationData }): Promise<RecommendationCollection> {
    return requestApi<RecommendationCollection>("recommendation/video/", {
        body: body,
        method: "POST"
    })
}

export type AddRatingBody = { rating?: number, blocked?: boolean, favourite?: boolean };

export function callAddRating(recommendationKey: string, body: AddRatingBody): Promise<RecommendationCollection> {
    return requestApi<RecommendationCollection>("recommendation/video/" + recommendationKey, {
        body: body,
        method: "PUT"
    })
}

export function sendFeedback(pageKey: string, feedback: string | undefined): Promise<Response> {
    return callApi("feedback", {
        body: {
            type: "PRIVATE",
            pageKey: pageKey,
            comment: feedback
        },
        method: "POST"
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
    const key = {lang: lang, trainer: trainer, tag: tag}
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

export function postPrivateRequestForm(workshop: Workshop, lang: string, data: PrivateFormData) {
    return callApi("workshop/" + workshop!.key + "/submit", {
        lang: lang,
        method: "POST",
        body: data
    });
}

export function postPublicRequestForm(workshop: Workshop, lang: string, data: PublicFormData) {
    return callApi("workshop/" + workshop!.key + "/requestPublic", {
        lang: lang,
        method: "POST",
        body: data
    })
}

export function postPublicRegisterToPlannedForm(publicWorkshop: PublicWorkshop, lang: string, data: PublicPlannedFormData) {
    return callApi("workshop/" + publicWorkshop.key + "/registerPublicPlanned", {
        lang: lang,
        method: "POST",
        body: data
    })
}