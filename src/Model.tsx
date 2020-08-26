export type Trainer = {
    key: string,
    fullName: string,
    promotionVideos: Video[] | null,
    github: string | null,
    twitter: string | null,
    medium: string | null,
    website: string | null,
    bioKey: string,
    picture: string,
};

export type Video = {
    ytCode: string,
    posterImg: string,
};

export type Workshop = {
    trainer: Trainer;
    name: string,
    icon: string,
    description: string,
    time: string,
    bigButtonLink: string,
    smallButtonLink: string,

    materialsImg: string
};