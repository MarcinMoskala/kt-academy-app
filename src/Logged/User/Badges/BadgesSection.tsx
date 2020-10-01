import React from "react";
import CertifiedKotlinBadge from "./badge_certified_kotlin_developer.png"
import KotlinDeveloperBadge from "./badge_kotlin_developer_1.png"
import ReviewerBadge from "./badge_reviewer.png"
import AuthorBadge from "./badge_author.png"
import "./BadgesSection.css"
import {User} from "../../../Model";

type BadgesProps = {
    user: User
};

export function BadgesSection({user}: BadgesProps) {
    return <div>
        <h2>Achievements</h2>
        <div className="flex-container--row badges-section">
            {user.tags.includes("PASSED_KOTLIN_EXAM") &&
            <Badge imgSrc={CertifiedKotlinBadge} text={"Certified Kotlin Developer"}/>
            }
            {user.tags.includes("KOTLIN_WORKSHOP_ATTENDEE") &&
            <Badge imgSrc={KotlinDeveloperBadge} text={"Kotlin Developer"}/>
            }
            {user.tags.includes("PASSED_KOTLIN_EXAM") &&
            <Badge imgSrc={ReviewerBadge} text={"Effective Kotlin Reviewer"}/>
            }
            {user.tags.includes("BLOG_AUTHOR") &&
            <Badge imgSrc={AuthorBadge} text={"Kt. Academy author"}/>
            }
        </div>
    </div>;
}

const Badge = ({text, imgSrc}: { text: string, imgSrc: string }) =>
    <div className="flex-item flex-item-paddings flex-container--column badge-container">
        <img className="badge-img" src={imgSrc}/>
        <p className="badge-text">{text}</p>
    </div>;