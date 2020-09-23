import React, {useEffect} from 'react';
import {useTranslations} from "../Translations";
import {useChallenge} from "../Hooks";
import {registerPage} from "../Utils";
import {useParams} from "react-router-dom";
import playground from "kotlin-playground";
import {saveUserChallenge} from "../Network";
import {Challenge, ChallengeStatus} from "../Model";
import Header from "../Section/Header/Header";
import FooterSection from "../Section/FooterSection";
import {LoadingPage} from "../Loading";

type CodeEditorInstance = {
    state: string,
    getCode: () => string
}

export default function ChallengePage() {
    const {challengeKey} = useParams<{ challengeKey: string }>();
    registerPage(`challenge-${challengeKey}`);
    const t = useTranslations();

    const challenge: Challenge | undefined | null = useChallenge(challengeKey)
    const [code, setCode] = React.useState<string>();
    const [challengeStatus, setChallengeStatus] = React.useState<ChallengeStatus>();

    useEffect(() => {
        let codeEditorInstance: CodeEditorInstance
        playground('.challenge-code', {
            version: '1.4.00',
            onChange: (code: string) => {
                if (codeEditorInstance !== undefined) {
                    setCode(codeEditorInstance.getCode())
                }
            },
            onTestPassed: () => {
                saveUserChallenge(challengeKey, {status: "SOLVED"})
                    .then((_) => setChallengeStatus("SOLVED"))
            },
            getInstance: (instance: CodeEditorInstance) => {
                if (instance) codeEditorInstance = instance
            }
        })
    })

    const onSave = () => {
        saveUserChallenge(challengeKey, {code: code})
    }

    const onRestore = () => {
        saveUserChallenge(challengeKey, {code: challenge?.originalCode})
            .then((_) => window.location.reload())
    }

    if (challenge === null) {
        return <div style={{textAlign: "center"}}>
            Challenge not found
        </div>
    }

    if (challenge === undefined) {
        return <LoadingPage/>
    }

    return <>
        <Header allowedLangs={["EN"]}/>
        <div className="content-container text-align-left" style={{paddingTop: "80px"}}>
            <h1>{challenge.title}</h1>

            <div className="challenge-code" data-target-platform="junit" folded-button="true">
                {challenge.code}
            </div>

            <div>
                <a onClick={(e) => onSave()}>Save</a>
            </div>

            <br/>

            <div>
                <a onClick={(e) => onRestore()}>Restore</a>
            </div>

            <br/>

            {challengeStatus === "SOLVED" &&
            <div>
                Solved
            </div>
            }

            <div>
                {challenge.description}
            </div>
        </div>
        <FooterSection/>
    </>;
};