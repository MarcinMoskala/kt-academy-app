import React from 'react';
import {useTranslations} from "../../Translations";
import {useCourse} from "../../Hooks";
import {registerPage} from "../../Utils";
import {useParams} from "react-router-dom";
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import {LoadingPage} from "../../Loading";
import {Video} from "./Video";
import {PrevNextBar} from "./PrevNextBar";

export default function VideoPage() {
    const {courseKey, videoKey} = useParams<{ courseKey: string, videoKey: string }>();
    registerPage(`video-${videoKey}`);
    const course = useCourse(courseKey)
    const t = useTranslations();

    if (course === undefined) {
        return <LoadingPage/>
    }

    if (course === null) {
        return <div>Course not found</div>
    }

    const video = course.steps.find(it => it.type === "VIDEO" && it.key === videoKey)

    if (!video) {
        return <div>Video not found</div>
    }

    return <>
        <Header allowedLangs={["EN"]}/>
        <div className="content-container text-align-left" style={{paddingTop: "80px"}}>
            <h1>{video.title}</h1>
            <Video videoKey={videoKey}/>

            <PrevNextBar course={course} stepKey={videoKey} stepType={"VIDEO"}/>

        </div>
        <FooterSection/>
    </>;
};