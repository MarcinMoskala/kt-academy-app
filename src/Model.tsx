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
    metaDescription: string,
    metaKeywords: string,
    promotionImageUrl: string,
    bannerUrlCss: string,
    description: string,
    secondDescription: string | null,
    practicalTask: string | null,
    practicalTaskIcon: string | null,
    requirements: string[] | null,
    tocMd: string,
    icon: string,
    materialsImg: string
    certifiedByJb: boolean,
    challenges: boolean,
    tags: string[],
    howLong: string[] | null,
    trainer: Trainer,
    langVariants: string[]
};

export type User = {
    id: string,
    email: string,
    name: string,
    surname: string,
    imageUrl: string,
    googleToken: string | null,
    newsletters: string[],
    tags: string[]
}

export type Challenge = {
    key: string,
    title: string,
    code: string,
    originalCode: string,
    description: string,
    status: ChallengeStatus
}

export type ChallengeStatus = "INITIAL" | "STARTED" | "SOLVED"