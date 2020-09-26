import React from 'react';
import {useTranslations} from "../Translations";
import Header, {Width} from "../Section/Header/Header";
import FooterSection from "../Section/FooterSection";
import HeaderBg from "../Section/Header/background-img/1-1920x702.png";
import "./CoursePage.css"
import {CourseListItem} from "./CourseListItem";
import {useCourse} from "../Hooks";
import {useParams} from "react-router-dom";
import {LoadingPage} from "../Loading";
import ContactSection from "../Main/Section/ContactSection";

export default function CoursePage() {
    const {courseKey} = useParams<{ courseKey: string }>();
    // registerPage(`challenge-${challengeKey}`);
    const t = useTranslations();
    const course = useCourse(courseKey)

    if (course === undefined) {
        return <LoadingPage/>
    }

    if (course === null) {
        return <div>Course does not exist</div>
    }

    return <>
        <Header allowedLangs={["EN"]} banner={{
            img: HeaderBg,
            width: Width.Half,
            title: "Collection processing",
            subtitle: "Become a master of collections",
            button: {
                text: "Start now",
                to: ""
            }
        }}/>
        <div className="content-container text-align-left">
            <div className="course-description">{course.description}</div>
            {course.steps.map(step =>
                <CourseListItem title={step.title} link={`/challenge/${step.key}`} state={step.state}/>
            )}

        </div>
        <ContactSection/>
        <FooterSection/>
    </>
        ;
};