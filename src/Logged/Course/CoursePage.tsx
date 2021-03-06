import React from 'react';
import Header, {Width} from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import HeaderBg from "../../Section/Header/background-img/1-1920x702.png";
import "./CoursePage.css"
import {CourseListItem, CourseListItemAction} from "./CourseListItem";
import {useCourse} from "../../Hooks";
import {useParams} from "react-router-dom";
import {ErrorPage, LoadingPage} from "../../Loading";
import ContactSection from "../../Main/Section/ContactSection";
import {Course, CourseStep, getLink} from "../../Model";
import {registerPage} from "../../Utils";
import {useGlobalState} from "../../GlobalState";

export default function CoursePageWrapper() {
    const {courseKey} = useParams<{ courseKey: string }>();
    registerPage(`course-${courseKey}`);
    const {user} = useGlobalState()
    const course = useCourse(courseKey, user)

    if (course === undefined) {
        return <LoadingPage/>
    }

    if (course === null) {
        return <ErrorPage message="Course not found"/>
    }

    return <CoursePage course={course}/>
}

function CoursePage({course}: { course: Course }) {
    const firstClickableStep = course.steps
        .find(step => step.type !== "LINK" && step.state !== "FINISHED")
    const firstClickableStepLink = firstClickableStep && getLink(course.key, firstClickableStep)
    return <>
        <Header allowedLangs={["EN"]} banner={{
            img: HeaderBg,
            width: Width.Half,
            title: course.name,
            // subtitle: course.description,
            ...(firstClickableStepLink && {
                button: {
                    text: "Start now",
                    to: firstClickableStepLink
                }
            })
        }}/>

        <div className="content-container text-align-left">
            <div className="course-description">{course.description}</div>
            {course.steps.map(step =>
                <CourseListItem title={step.title}
                                link={getLink(course.key, step)}
                                action={getAction(step)}
                                hint={getHint(step)}/>
            )}

        </div>

        <ContactSection/>
        <FooterSection/>
    </>;
}

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
        return "This course is only for Kt. Academy workshop attendees. You can find our workshop offer in the workshops section."
    } else {
        return null
    }
}