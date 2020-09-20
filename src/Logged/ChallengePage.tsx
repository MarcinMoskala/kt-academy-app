import React from 'react';
import {useTranslations} from "../Translations";
import FooterSection from "../Main/Section/FooterSection";
import Header from "../Main/Section/Header/Header";
import {useChallenge} from "../Hooks";
import {registerPage} from "../Utils";
import Link from "../Link";
import {useParams} from "react-router-dom";
import KotlinPlayground from "react-kotlin-playground/es";

export default function ChallengePage() {
    const {challengeKey} = useParams<{ challengeKey: string }>();
    registerPage(`challenge-${challengeKey}`);
    const t = useTranslations();

    const challenge = useChallenge(challengeKey)
    // const user = useUser();
    //
    // if (!user) {
    //     return <div style={{textAlign: "center"}}>
    //         Log in to see the materials (using floating action menu on the right-bottom corner)
    //     </div>
    // }
    //
    // if (!(user.tags.includes("ADMIN") || user.tags.includes("KOTLIN_WORKSHOP_ATTENDEE"))) {
    //     return <div style={{textAlign: "center"}}>Sorry, you are not allowed to access this section.</div>
    //     return <div style={{textAlign: "center"}}>
    //         If you attended any workshop by Kt. Academy or by Marcin Moskała, contact us using "Send private feedback"
    //         on the floating action menu.
    //     </div>
    // }

    if (challenge === null) {
        return <div style={{textAlign: "center"}}>
            Challenge not found
        </div>
    }

    if (challenge === undefined) {
        return <div style={{textAlign: "center"}}>
            Loading
        </div>
    }

    return <>
        <Header allowedLangs={["EN"]}/>
        <div className="content-container text-align-left" style={{paddingTop: "80px"}}>
            <h1>{challenge.title}</h1>

            <KotlinPlayground mode="kotlin" className="margin-bottom-50">
                {challenge.code}
            </KotlinPlayground>

            <div>
                <a>Save</a>
            </div>

            <div>
                {challenge.description}
            </div>
        </div>
        <FooterSection/>
    </>;
};

const Video = ({title, videoKey}: { title?: string, videoKey: string }) => <>
    <iframe width="560" height="315" src={"https://www.youtube-nocookie.com/embed/" + videoKey}
            frameBorder="0" style={{width: 560}}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen/>
    {title && <p>{title}</p>}
</>

const ExpandableTitle: React.FunctionComponent<{ title?: string }> = ({children, title}) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    return <>
        <h4 onClick={() => setExpanded(!expanded)}>{title + " " + (expanded ? "(hide)" : "(show)")}</h4>
        {expanded && children}
    </>
}

const LinkParagraph = ({to, text}: { to: string, text: string }) => <p><Link to={to}>{text}</Link></p>;