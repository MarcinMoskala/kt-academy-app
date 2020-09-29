import React from 'react';
import {useTranslations} from "../Translations";
import Header, {Width} from "../Section/Header/Header";
import FooterSection from "../Section/FooterSection";
import HeaderBg from "../Section/Header/background-img/1-1920x702.png";
import "./CoursePage.css"
import {CourseListItem, CourseListItemAction} from "./CourseListItem";
import {useCourses} from "../Hooks";
import {LoadingPage} from "../Loading";
import {Course, CourseState} from "../Model";
import ContactSection from "../Main/Section/ContactSection";
import {registerPage} from "../Utils";

export default function CoursesPage() {
    registerPage(`courses`);
    const t = useTranslations();
    const courses: Course[] | undefined | null = useCourses()

    if (courses === undefined) {
        return <LoadingPage/>
    }

    if (courses === null) {
        return <div>Course does not exist</div>
    }

    return <>
        <Header allowedLangs={["EN"]} banner={{
            img: HeaderBg,
            width: Width.Half,
            title: "Courses",
            subtitle: "Our special learning place"
        }}/>
        <div className="content-container text-align-left">
            {courses.map(course =>
                <CourseListItem title={course.name} link={`/course/${course.key}`} action={getAction(course.state)} hint={getHint(course.state)} />
            )}

        </div>
        <ContactSection/>
        <FooterSection/>
    </>;
};

function getAction(state: CourseState): CourseListItemAction {
    switch (state) {
        case "LOCKED":
            return "locked";
        case "READY":
            return "play";
        case "STARTED":
            return "play";
        case "FINISHED":
            return "finished";
    }
    return "locked"
}


function getHint(state: CourseState): string | null {
    if(state === "LOCKED") {
        return "This course is only for Kt. Academy workshop attendees. You can see a list of resources, but you cannot access them."
    } else {
        return null
    }
}