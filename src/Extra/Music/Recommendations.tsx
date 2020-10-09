import React from "react";

const recommendations = [
    "IWZktANV-D8",
    "M3hFN8UrBPw",
    "cG_p8Kt6I9U",
    "uH3Aoj1nw58",
    "g8NVwN0_mks",
    "waxQzdbixLk",
    "WUDsKai0Yac",
    "sZjpMCu2JRc",
    "D-ya6U-pbWo",
    "jhvUqV3qeC0",
    "5qap5aO4i9A",
    "q43G9FTaomg",
    "TAXmCThuhm8",
    "l9nh1l8ZIJQ",
    "8sJk9AE82kc",
]

export const RecommendedMusicVideos = ({setYoutubeVideoKey}) => {
    const [fetchedRecommendations, setFetchedRecommendations] = React.useState<any[]>([]);

    React.useEffect(() => {
        async function fetchRecommendations() {
            const promises = recommendations.map(key => fetch("https://noembed.com/embed?url=https://www.youtube.com/watch?v=" + key, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
            )
            const res = await Promise.all(promises)
            setFetchedRecommendations(res)
        }

        fetchRecommendations();
    }, []);


    return <div>
        <div>Some recommendations:</div>
        {fetchedRecommendations.map(obj => {
                return <div
                    className="clickable"
                    key={obj.title}
                    onClick={() => setYoutubeVideoKey(substringAfter(obj.url, "="))}>{obj.title}</div>;
            }
        )}
    </div>;
};

function substringAfter(str: string, split: string) {
    return str.split(split)[1];
}