import React, {useEffect} from "react";
import {useTranslations} from "../../Translations";
import {API_URL} from "../../Network";
import {Trainer, Video} from "../../Model";

type Props = {
    trainerKey?: string
    trainer?: Trainer
};

export default function TrainerSection({trainerKey, trainer}: Props) {
    const t = useTranslations();

    const [trainerLoaded, setTrainer] = React.useState<Trainer>();

    useEffect(() => {
        if (trainer) {
            setTrainer(trainer)
        } else {
            fetch(API_URL + "workshop/trainer/" + trainerKey)
                .then(res => res.json())
                .then(
                    (result) => setTrainer(result),
                    (error) => console.log(error)
                )
        }
    }, [trainerKey])

    if (!trainerLoaded) {
        return <></>
    }

    const showVideo = trainerLoaded && trainerLoaded.promotionVideos && trainerLoaded.promotionVideos.length !== 0

    return <section className="trainer gradient--full-section" id="trainer">
        <div className="content-container flex-container--row">
            <div className="flex-item--image-container">
                {showVideo && <Videos videos={trainerLoaded.promotionVideos!}/> ||
                trainerLoaded.picture &&
                <img className="round-photo wow zoomIn" src={trainerLoaded.picture} alt={trainerLoaded.fullName}/>}
            </div>
            <div className="flex-item--right padding-left-40">
                <div className="flex-container--row title margin-bottom-20">
                    <i className="far fa-thumbs-up"/>
                    <h2>{t.whyUs.bestTitle}</h2>
                </div>
                <h3>{trainerLoaded.fullName}</h3>
                <div className="social-media-container">
                    {trainerLoaded.github &&
                    <a href={trainerLoaded.github}><i className="fab fa-github"/> </a>}
                    {trainerLoaded.twitter &&
                    <a href={trainerLoaded.twitter}><i className="fab fa-twitter"/> </a>}
                    {trainerLoaded.medium &&
                    <a href={trainerLoaded.medium}><i className="fab fa-medium-m"/> </a>}
                    {trainerLoaded.website &&
                    <a href={trainerLoaded.website}><i className="fas fa-globe"/> </a>}
                </div>
                <p dangerouslySetInnerHTML={{__html: t[trainerLoaded.bioKey]}}/>
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
        const b = list[0];
        list[0] = list[pos];
        list[pos] = b;
        setVideos(list)
    }

    return (<div>
        <div className="video-container">
            <iframe id="yt-big" width="500" height="280"
                    src={"https://www.youtube.com/embed/" + currentVideos[0].ytCode}
                    onClick={window.displayModal} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
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
               onClick={() => onClick(video)} autoPlay poster={"images/yt_banners/" + video.posterImg}/>
    );
}