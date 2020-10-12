import React, {useEffect, useRef} from 'react';
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import "../../Utils";
import {useTranslations} from "../../Translations";
import {registerPage, useDidUpdateEffect} from "../../Utils";
import ReactPlayer from 'react-player'
import {PlusMinusPicker} from "./PlusMinusPicker";
import pretty from 'pretty-time';
import useSound from "use-sound";
import {useCookieMusicConfigState} from "./MusicCookieConfig";
import {RecommendedMusicVideos} from "./RecommendedMusicVideos";
import "./ProgrammingMusicTimerPage.css"
import {useFeedbackPopup} from "../../Popups";

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
    let pageKey = `programming-music-timer`;
    registerPage(pageKey)
    const showFeedbackPopup = useFeedbackPopup(pageKey)
    const t = useTranslations();
    const [playSound] = useSound("/sounds/boop.mp3");

    const [youtubeVideoKey, setYoutubeVideoKey] = useCookieMusicConfigState("IWZktANV-D8", "chosenVideo");
    const [workTimeMin, setWorkTime] = useCookieMusicConfigState(25, "workTime");
    const [breakTimeMin, setBreakTime] = useCookieMusicConfigState(5, "breakTime");
    const [volume, setVolume] = useCookieMusicConfigState(5, "volume");

    useDidUpdateEffect(() => {
        const player = getCurrentPlayer()
        if (player) player?.setVolume(volume)
    }, [volume])

    const [phase, setPhase] = React.useState<"work" | "break">("work");
    const isWorkTime = phase === "work"

    const [secPassed, setSecPassed] = React.useState<number>(0);
    const [totalConcentrationSec, setTotalConcentrationSec] = useCookieMusicConfigState(0, "totalSecPassed");
    const [timer, setTimer] = React.useState<NodeJS.Timeout>();
    let playerRef = useRef<ReactPlayer>(null)

    const getCurrentPlayer = () => (playerRef.current?.getInternalPlayer() as YouTubePlayer)

    const secUntilNext = (isWorkTime ? workTimeMin : breakTimeMin) * 60 - secPassed
    useEffect(() => {
        if (secUntilNext <= 0) togglePhase()
    }, [secUntilNext])

    const clearTimerInstance = () => {
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
            let tickTime = getUtfSec() - timerStartTime;
            setSecPassed(tickTime)
            setTotalConcentrationSec(totalConcentrationSec + tickTime)
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
            <div className="videoWrapper">
                <ReactPlayer volume={0.05}
                             key={youtubeVideoKey}
                             url={'https://www.youtube.com/watch?v=' + youtubeVideoKey}
                             onPlay={onVideoStarted}
                             onPause={onVideoPaused}
                             onReady={() => getCurrentPlayer().setVolume(volume)}
                             ref={playerRef}
                             loop={true}
                />
            </div>

            <div>
                <PlusMinusPicker value={volume} setValue={setVolume} step={1} min={0} unit="%"
                                 title={t.music.volume}/>
                <PlusMinusPicker value={workTimeMin} setValue={setWorkTime} step={5} min={1} unit="min"
                                 title={t.music.pickerWorkTime}/>
                <PlusMinusPicker value={breakTimeMin} setValue={setBreakTime} step={5} min={1} unit="min"
                                 title={t.music.pickerBreakTime}/>
            </div>
            <div>
                <div>{(isWorkTime ? t.music.displayWorkTime : t.music.displayBreakTime)}</div>
                <div>{t.music.sessionTime + timeDisplay(secPassed)}</div>
                <div>{(isWorkTime ? t.music.timeUntilBreak : t.music.timeUntilWork ) + timeDisplay(secUntilNext)}</div>
                <div>{t.music.totalConcentrationTime + timeDisplay(totalConcentrationSec)}</div>
                <div className="clickable" onClick={togglePhase}>{isWorkTime ? t.music.startBreak : t.music.startWork}</div>
                <div className="clickable" onClick={showFeedbackPopup}>{t.feedback.button}</div>
            </div>
            <br/>
            <br/>
            <RecommendedMusicVideos youtubeVideoKey={youtubeVideoKey} setYoutubeVideoKey={setYoutubeVideoKey}/>
        </div>
        <FooterSection/>
    </>;
};

function getUtfSec() {
    return Math.ceil(Date.now() / 1000);
}

