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
    tocHtml: string,
    icon: string,
    time: string,
    bigButtonLink: string,
    smallButtonLink: string,
    materialsImg: string
    businessOffer: boolean,
    certifiedByJb: boolean,
    challenges: boolean,
    tags: string[],
    howLong: string[] | null,
    trainer: Trainer;
};