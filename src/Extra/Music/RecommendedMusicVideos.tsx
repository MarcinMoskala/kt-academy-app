import React, {useEffect, useState} from "react";
import {callAddRating, callAddRecommendation} from "../../Network";
import {useRecommendations} from "../../Hooks";
import {RecommendationElement} from "../../Model";
import Swal from "sweetalert2";
import Rating from '@material-ui/lab/Rating';
import {useTranslations} from "../../Translations";

type RecommendedMusicVideosProps = {
    youtubeVideoKey: string,
    setYoutubeVideoKey: (string) => void
}

export const RecommendedMusicVideos = ({youtubeVideoKey, setYoutubeVideoKey}: RecommendedMusicVideosProps) => {
    const [rating, setRating] = useState<number>(0);
    const recommendations: RecommendationElement[] | undefined = useRecommendations(rating)?.elements
    const currentVideo = recommendations?.find(v => v.key === youtubeVideoKey)
    const t = useTranslations();

    useEffect(() => {
        if (currentVideo && currentVideo.yourRating) setRating(currentVideo.yourRating)
    }, [currentVideo])

    const onYoutubeValueChange = (event) => {
        setYoutubeVideoKey(event.target.value);
    };

    const onRecommend = () => {
        postRecommend(youtubeVideoKey)
            .then(() => {
                Swal.fire(t.music.recommendationAdded)
                window.location.reload()
            })
    };

    return <div>
        {currentVideo && <>
            <div>{t.music.ratePrompt}</div>
            <Rating name="size-medium"
                    value={rating}
                    onChange={(event, newValue) => {
                        if (!newValue) return
                        setRating(newValue);
                        callAddRating(youtubeVideoKey, newValue)
                    }}/>
            <br/>
        </>}
        <br/>
        {t.music.youtubeKey}<input name="VideoKey" value={youtubeVideoKey} onChange={onYoutubeValueChange} min="1"/>
        {recommendations && <>
            <br/>
            <br/>
            {!recommendations.find(r => r.key === youtubeVideoKey) && <>
                <button onClick={onRecommend}>{t.music.recommendButton}</button>
                <br/>
                <br/>
            </>}
            <div>{t.music.recommendationsList}</div>
            {recommendations.map(r =>
                <div className="clickable"
                     key={r.key}
                     onClick={() => setYoutubeVideoKey(r.key)}>
                    {`${r.data.title} ${r.averageRating.toFixed(1)}/5 (${r.ratingsNum})`}
                </div>
            )}
        </>}
    </div>;
};

type YouTubeResponse = {
    thumbnail_url: string,
    url: string,
    title: string,
}

function fetchVideoData(key: string): Promise<YouTubeResponse> {
    return fetch("https://noembed.com/embed?url=https://www.youtube.com/watch?v=" + key, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

async function postRecommend(key) {
    let r = await fetchVideoData(key);
    return await callAddRecommendation({
        key: key,
        data: {
            title: r.title,
            url: r.url,
            img: r.thumbnail_url,
        }
    });
}