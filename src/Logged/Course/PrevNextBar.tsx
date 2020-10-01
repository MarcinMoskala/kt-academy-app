import Link from "../../Link";
import React from "react";
import {Course, CourseStepType, getLink} from "../../Model";

type PrevNextBarProps = {
    stepKey: string,
    stepType: CourseStepType,
    course: Course,
};

export function PrevNextBar({course, stepKey, stepType}: PrevNextBarProps) {
    const interestingSteps = course.steps.filter(step => step.type !== "LINK")
    const position = interestingSteps.findIndex((step) => step.key === stepKey && step.type === stepType)

    if (position === -1) return <></>

    const prevLink = position !== 0 ? getLink(course.key, interestingSteps[position - 1]) : null
    const nextLink = position < interestingSteps.length - 1 ? getLink(course.key, interestingSteps[position + 1]) : null

    return <div className="buttons-container">
        {prevLink &&
        <div className="buttons-left">
            <Link to={prevLink} className="button button pointer" style={{width: "150px"}}>Previous</Link>
        </div>
        }
        {nextLink &&
        <div className="buttons-right green-color">
            <Link to={nextLink} className="button button pointer" style={{width: "150px"}}>Next</Link>
        </div>
        }
    </div>;
}