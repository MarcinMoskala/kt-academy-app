import React from 'react';
import {useTranslations} from "../Translations";
import Header, {Width} from "../Section/Header/Header";
import FooterSection from "../Section/FooterSection";
import HeaderBg from "../Section/Header/background-img/1-1920x702.png";
import "./CoursePage.css"
import {CourseListItem, CourseListItemAction} from "./CourseListItem";
import {useCourse} from "../Hooks";
import {useParams} from "react-router-dom";
import {LoadingPage} from "../Loading";
import ContactSection from "../Main/Section/ContactSection";
import {CourseStep, getLink} from "../Model";
import {registerPage} from "../Utils";

export default function CoursePage() {
    const {courseKey} = useParams<{ courseKey: string }>();
    registerPage(`course-${courseKey}`);
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
            // TODO: Direct to the first non-link resource
            // button: {
            //     text: "Start now",
            //     to: ""
            // }
        }}/>
        <div className="content-container text-align-left">
            <div className="course-description">{course.description}</div>
            {course.steps.map(step =>
                <CourseListItem title={step.title} link={getLink(courseKey, step)} action={getAction(step)}
                                hint={getHint(step)} />
            )}

        </div>
        <ContactSection/>
        <FooterSection/>
    </>;
};

function getAction(step: CourseStep): CourseListItemAction {
    if (step.state === "LOCKED") {
        return "locked";
    }
    switch (step.type) {
        case "VIDEO":
            return "play";
        case "LINK":
            return "link";
        case "CHALLENGE":
            switch (step.state) {
                case "READY":
                    return "code";
                case "STARTED":
                    return "code";
                case "FINISHED":
                    return "finished";
            }
    }
    return "play";
}

function getHint(step: CourseStep): string | null {
    if (step.state === "LOCKED") {
        return "This course is only for Kt. Academy workshop attendees. You can see a list of resources, but you cannot access them."
    } else {
        return null
    }
}