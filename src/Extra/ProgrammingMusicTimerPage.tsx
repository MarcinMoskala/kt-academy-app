import React, {useEffect, useRef} from 'react';
import Header from "../Section/Header/Header";
import FooterSection from "../Section/FooterSection";
import "../Utils";
import {useTranslations} from "../Translations";
import {registerPage} from "../Utils";
import ReactPlayer from 'react-player'
import "./PlusMinusPicker.css"
import {PlusMinusPicker} from "./PlusMinusPicker";
import pretty from 'pretty-time';
import useSound from "use-sound";

// More hee: https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
type YouTubePlayer = {
    playVideo: () => void
    pauseVideo: () => void
    stopVideo: () => void
    seekTo: (seconds: number, allowSeekAhead: boolean) => void
    setVolume: (volume: number) => void
    getVolume: () => number
}

export default function ProgrammingMusicTimerPage() {
    registerPage(`programming-music-timer`)
    const t = useTranslations();
    const [playSound] = useSound("/sounds/boop.mp3");

    const [youtubeVideoKey, setYoutubeVideoKey] = React.useState<string>("f02mOEt11OQ");
    const [workTime, setWorkTime] = React.useState<number>(25); // min
    const [breakTime, setBreakTime] = React.useState<number>(5); // min
    const [volume, setVolume] = React.useState<number>(5);
    useEffect(() => {
        getCurrentPlayer()?.setVolume(volume)
    }, [volume])

    const [phase, setPhase] = React.useState<"work" | "break">("work");
    const isWorkTime = phase === "work"

    const [secPassed, setSecPassed] = React.useState<number>(0);
    const [prevConcentrationSec, setPrevConcentrationSec] = React.useState<number>(0);
    const [timer, setTimer] = React.useState<NodeJS.Timeout>();
    let playerRef = useRef<ReactPlayer>(null)

    const getCurrentPlayer = () => (playerRef.current?.getInternalPlayer() as YouTubePlayer)

    const secUntilNext = (isWorkTime ? workTime : breakTime) * 60 - secPassed
    useEffect(() => {
        if (secUntilNext <= 0) togglePhase()
    }, [secUntilNext])

    const totalConcentrationSec = (isWorkTime ? secPassed : 0) + prevConcentrationSec

    const onYoutubeValueChange = (event) => {
        setYoutubeVideoKey(event.target.value);
    }

    const clearTimerInstance = () => {
        console.log("Stopping timer ", timer)
        if (timer) clearInterval(timer)
        setTimer(undefined)
    };
    useEffect(() => {
        clearTimerInstance();
    }, [youtubeVideoKey])

    const startTimerInstance = () => {
        if (timer) {
            clearTimerInstance()
        }
        const timerStartTime = getUtfSec() - secPassed
        setTimer(setInterval(() => {
            setSecPassed(getUtfSec() - timerStartTime)
        }, 100))
    };

    const startTimer = () => {
        if (isWorkTime) {
            getCurrentPlayer()?.playVideo()
        }
        startTimerInstance()
    }

    const stopTimer = () => {
        getCurrentPlayer()?.pauseVideo()
        clearTimerInstance();
    }

    // const resetTimer = () => {
    //     getCurrentPlayer().stopVideo()
    //     clearTimerInstance();
    //     setPrevConcentrationSec(secPassed);
    //     setSecPassed(0)
    // }

    const togglePhase = () => {
        if (isWorkTime) {
            setPhase("break")
            getCurrentPlayer()?.pauseVideo()
        } else {
            setPhase("work")
            getCurrentPlayer()?.playVideo()
        }
        playSound()
        clearTimerInstance()
        setSecPassed(0)
        setPrevConcentrationSec(secPassed)
        const timerStartTime = getUtfSec()
        setTimer(setInterval(() => {
            setSecPassed(getUtfSec() - timerStartTime)
        }, 100))
    }

    const onVideoStarted = () => {
        if (isWorkTime) {
            startTimer()
        }
    }

    const onVideoPaused = () => {
        if (isWorkTime) {
            stopTimer()
        }
    }

    const timeDisplay = (seconds: number) => pretty(seconds * 1000_000_000, 's')

    return <>
        <Header/>
        <div className="content-container">
            <ReactPlayer volume={0.05}
                         style={{display: "block", margin: "auto"}}
                         key={youtubeVideoKey}
                         url={'https://www.youtube.com/watch?v=' + youtubeVideoKey}
                         onPlay={onVideoStarted}
                         onPause={onVideoPaused}
                         ref={playerRef}
                         loop={true}
            />
            <div>
                <PlusMinusPicker value={volume} setValue={setVolume} step={1} min={0} unit="%" title="Volume"/>
                <PlusMinusPicker value={workTime} setValue={setWorkTime} step={5} min={1} unit="min" title="Work time"/>
                <PlusMinusPicker value={breakTime} setValue={setBreakTime} step={5} min={1} unit="min"
                                 title="Break time"/>
            </div>
            <div>
                <div>{(isWorkTime ? "Working time" : "Break")}</div>
                <div>{"Session length: " + timeDisplay(secPassed)}</div>
                <div>{"Time until " + (isWorkTime ? "break" : "work") + ": " + timeDisplay(secUntilNext)}</div>
                <div>{"Total concentration time: " + timeDisplay(totalConcentrationSec)}</div>
                <div onClick={togglePhase}>{"Start " + (isWorkTime ? "break" : "work")}</div>
            </div>
            <br/>
            <br/>
            Video key: <input name="VideoKey" value={youtubeVideoKey} onChange={onYoutubeValueChange} min="1"/>
            <br/>
            <br/>
            <RecommendedMusicVideos setYoutubeVideoKey={setYoutubeVideoKey}/>
        </div>
        <FooterSection/>
    </>;
};

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

const RecommendedMusicVideos = ({setYoutubeVideoKey}) => {
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
                return <div onClick={() => setYoutubeVideoKey(substringAfter(obj.url, "="))}>{obj.title}</div>;
            }
        )}
    </div>;
};

function substringAfter(str: string, split: string) {
    return str.split(split)[1];
}

function getUtfSec() {
    return Math.ceil(Date.now() / 1000);
}

