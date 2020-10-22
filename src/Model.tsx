export type Trainer = {
    key: string,
    fullName: string | null,
    bioKey: string,
    picture: string,
    promotionVideos: Video[] | null,
    github: string | null,
    twitter: string | null,
    medium: string | null,
    website: string | null,
};

export type Video = {
    ytCode: string,
    posterImg: string,
};

export type Workshop = {
    key: string,
    lang: string,
    name: string,
    subtitle: string | null,
    shortDescription: string,
    metaKeywords: string,
    description: string,
    secondDescription: string | null,
    practicalTask: string | null,
    practicalTaskIcon: string | null,
    requirements: string[] | null,
    tocMd: string,
    icon: string,
    certifiedByJb: boolean,
    challenges: boolean,
    trainer: Trainer | null,
    tags: string[],
    howLong: string[] | null,
    basePrice: BasePrice,
    langVariants: string[],
    materials: Materials | null
};

export type Materials = {
    online: boolean,
    printed: boolean,
    book: boolean
}

export type BasePrice = {
    company: Money | null,
    companyPl: Money | null,
    person: Money | null,
    personPl: Money | null,
    daysNumber: number
};

export type Money = {
    amount: string,
    currency: "EUR" | "PLN"
};

export function printMoney(money: Money): string{
    switch (money.currency) {
        case "EUR":
            return `${money.amount}\xa0EUR`
        case "PLN":
            return `${money.amount}\xa0zł`
        default:
            return `${money.amount}\xa0${money.currency}`
    }
}

export type User = {
    id: string,
    email: string,
    name: string,
    surname: string,
    createdAt: string,
    imageUrl: string,
    googleToken: string | null,
    newsletters: string[],
    tags: string[]
};

export type Challenge = {
    key: string,
    title: string,
    codeTests: string,
    code: string,
    originalCode: string,
    description: string,
    status: ChallengeStatus
};

export type ChallengeStatus = "INITIAL" | "STARTED" | "SOLVED"

export type WorkshopSubmission = {
    id: string,
    timestamp: string,
    workshopKey: string,
    submissionType: string,
    lang: string,
    data: string,
    status: WorkshopSubmissionStatus
};

export type WorkshopSubmissionStatus =
    "SUBMITTED"
    | "CONTACTED"
    | "CONFIRMED"
    | "WAITING"
    | "FINISHED"
    | "OUTDATED"
    | "SPAM";

export type Course = {
    key: string,
    name: string,
    description: string,
    steps: CourseStep[],
    state: CourseState
}

export type CourseState = "LOCKED" | "FINISHED" | "READY" | "STARTED" | null;

export type CourseStep = {
    title: string,
    type: CourseStepType,
    key: string,
    state: CourseState
}

export function getLink(courseKey: string, step: CourseStep): string | null {
    if (step.state === "LOCKED") {
        return null
    }
    switch (step.type) {
        case "CHALLENGE":
            return `/course/${courseKey}/challenge/${step.key}`
        case "VIDEO":
            return `/course/${courseKey}/video/${step.key}`
        case "LINK":
            return step.key
    }
    console.log("Illegal type", step.type)
    return null
}

export type CourseStepType = "CHALLENGE" | "VIDEO" | "LINK"

export type RecommendationCollection = {
    collectionKey: string,
    elements: RecommendationElement[],
}

export type RecommendationElement = {
    key: string,
    data: RecommendationData,
    yourRating: number | null,
    averageRating: number,
    ratingsNum: number,
    blocked: boolean,
    favourite: boolean,
    tags: string[] | null,
}

export type RecommendationData = {
    title: string,
    url: string,
    img: string
};

export type Statistics = {
    pageViews: number,
    uniqueUsers: number,
    accounts: number,
    subscribers: string,
    pageStatistics: PageStatistics[]
}

export type PageStatistics = {
    pageKey: string,
    uniqueUsers: number,
    pageViews: number,
    reactionsCount: string,
    pageViewsHistory: StatisticsDataPoint[] | null
}

export type StatisticsDataPoint = {
    day: string,
    amount: number
}