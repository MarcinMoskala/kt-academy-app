export type Trainer = {
    key: string,
    fullName: string,
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
    trainer: Trainer,
    tags: string[],
    howLong: string[] | null,
    basePrice: BasePrice,
    langVariants: string[]
};

export type BasePrice = {
    company: Money,
    person: Money,
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