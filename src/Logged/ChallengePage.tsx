import React, {useEffect} from 'react';
import {useTranslations} from "../Translations";
import FooterSection from "../Main/Section/FooterSection";
import Header from "../Main/Section/Header/Header";
import {useChallenge} from "../Hooks";
import {registerPage} from "../Utils";
import {useParams} from "react-router-dom";
import playground from "kotlin-playground";
import {saveUserChallenge} from "../Network";
import {Challenge, ChallengeStatus} from "../Model";

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
    let codeEditorInstance: CodeEditorInstance

    useEffect(() => {
        playground('.challenge-code', {
            version: '1.4.00',
            onChange: (code: string) => {
                if (codeEditorInstance !== undefined) {
                    console.log(codeEditorInstance.getCode())
                    console.log(code)
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
        return <div style={{textAlign: "center"}}>
            Loading
        </div>
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