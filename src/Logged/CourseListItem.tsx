import React from "react";
import "./CourseListItem.css"
import Link from "../Link";
import 'react-tippy/dist/tippy.css'
import {Tooltip} from 'react-tippy';

export type CourseListItemAction = "locked" | "play" | "finished" | "link";

type CourseListItemParams = {
    title: string,
    smallText?: string,
    action: CourseListItemAction,
    link: string | null,
    hint?: string | null,
}

export const CourseListItem = ({title, smallText = "", action, link, hint}: CourseListItemParams) =>
    <Tooltip
        title={hint ?? ""}
        position="bottom"
        trigger="mouseenter"
        disabled={!hint}>
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
                        <i className={getIcon(action)}/>
                    </div>
                </div>
            </div>
        </Link>
    </Tooltip>;

function getIcon(action: CourseListItemAction): string {
    switch (action) {
        case "locked":
            return "fas fa-lock";
        case "play":
            return "fas fa-play-circle";
        case "finished":
            return "far fa-check-circle";
        case "link":
            return "fas fa-link";
    }
}