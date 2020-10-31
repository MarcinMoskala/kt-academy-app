import React from "react";
import {useTranslations} from "../../../../Translations";
import {Trainer, Video} from "../../../../Model";
import MarcinPic from "./Marcin_Moskala.jpg"
import WlodekPic from "./Wlodek_Krakowski.jpg"

type Props = {
    trainer: Trainer
};

export default function TrainerSection({trainer}: Props) {
    const t = useTranslations();

    const picture = choosePicture(trainer?.key)
    const showVideo = trainer && trainer.promotionVideos && trainer.promotionVideos.length !== 0
    return <section className="trainer gradient--full-section" id="trainer">
        <div className="content-container flex-container--row">
            <div className="flex-item--image-container">
                {showVideo &&
                <Videos videos={trainer.promotionVideos!}/> ||
                trainer.picture &&
                <img className="round-photo wow zoomIn" src={picture} alt={trainer.fullName ?? "Trainer"}/>}
            </div>
            <div className="flex-item--right padding-left-40">
                <div className="flex-container--row title margin-bottom-20">
                    <i className="far fa-thumbs-up"/>
                    <h2>{t.whyUs.bestTitle}</h2>
                </div>
                <h3>{trainer.fullName ?? t.trainer.name[trainer?.key]}</h3>
                <div className="social-media-container">
                    {trainer.github &&
                    <a href={trainer.github}><i className="fab fa-github"/> </a>}
                    {trainer.twitter &&
                    <a href={trainer.twitter}><i className="fab fa-twitter"/> </a>}
                    {trainer.medium &&
                    <a href={trainer.medium}><i className="fab fa-medium-m"/> </a>}
                    {trainer.website &&
                    <a href={trainer.website}><i className="fas fa-globe"/> </a>}
                </div>
                <p dangerouslySetInnerHTML={{__html: t.trainer.bio[trainer?.key]}}/>
            </div>
        </div>
    </section>
}

declare global {
    interface Window {
        displayModal(any): void;
    }
}

type VideosProps = {
    videos: Video[]
};

function Videos({videos}: VideosProps) {
    const [currentVideos, setVideos] = React.useState(videos);

    const swapVideo = (video: Video) => {
        const list = [...videos!]
        const pos = list.indexOf(video)
        const temp = list[0];
        list[0] = list[pos];
        list[pos] = temp;
        setVideos(list)
    }

    return (<div>
        <div className="video-container">
            <iframe id="yt-big" width="500" height="280"
                    src={"https://www.youtube.com/embed/" + currentVideos[0].ytCode}
                    onClick={window.displayModal} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    style={{zIndex: "auto"}}
                    allowFullScreen/>
        </div>
        <div className="flex-container--row space-between margin-top-20 yt-movies">
            {currentVideos.slice(1).map((v, i) => <VideoIcon key={i} onClick={swapVideo} video={v}/>)}
        </div>
    </div>);
}

function VideoIcon({video, onClick}: { video: Video, onClick: (Video) => void }) {
    return (
        <video className="margin-top-10 margin-right-5" width="140" height="80"
               src={"https://www.youtube.com/embed/" + video.ytCode}
               onClick={() => onClick(video)} autoPlay poster={"/images/yt_banners/" + video.posterImg}/>
    );
}

function choosePicture(trainerKey?: string) {
    switch (trainerKey) {
        case "marcin":
            return MarcinPic
        case "wlodek":
            return WlodekPic
        default:
            return MarcinPic
    }
}