import React from "react";
import "./CourseListItem.css"
import Link from "../Link";
import {CourseState} from "../Model";

type CourseListItemParams = {
    title: string,
    smallText?: string,
    state: CourseState,
    link: string
}

export const CourseListItem = ({title, smallText = "", state, link}: CourseListItemParams) =>
    <Link className="course-list-item"
          to={link}
          tabIndex={0}>
              <span className="course-list-item-title">
                  {title}
              </span>
        <div className="course-list-item-details">
            <span className="course-list-item-subtitle">{smallText}</span>
            <div className="course-list-item-icon">
                <div className="course-list-item-icon-image">
                    <i className={getIcon(state)}/>
                </div>
            </div>
        </div>
    </Link>;

function getIcon(state: CourseState): string {
    switch (state) {
        case "LOCKED":
            return "fas fa-lock";
        case "READY":
            return "fas fa-play-circle";
        case "STARTED":
            return "fas fa-play-circle";
        case "FINISHED":
            return "far fa-check-circle";

    }
}