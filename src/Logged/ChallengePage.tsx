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
import Swal from "sweetalert2";

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
    const [challengeStatus, setChallengeStatus] = React.useState<ChallengeStatus | undefined>(challenge?.status);

    useEffect(() => {
        let codeEditorInstance: CodeEditorInstance
        let codeVariable: string
        playground('.challenge-code', {
            version: '1.4.00',
            onChange: (visibleCode: string) => {
                const separatorPosition = visibleCode.indexOf(SPLITTING_COMMENT)
                if (separatorPosition === -1) {
                    setCode(visibleCode)
                    codeVariable = visibleCode
                } else {
                    let positionAfterSeparatorAndEnter = separatorPosition + SPLITTING_COMMENT.length + 1;
                    setCode(visibleCode.substr(positionAfterSeparatorAndEnter))
                    codeVariable = visibleCode
                }
            },
            onTestPassed: () => {
                saveUserChallenge(challengeKey, {code: codeVariable, status: "SOLVED"})
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
        Swal.fire({
            title: 'Are you sure that you want to restore?',
            text: "You will lose all the progress you made!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, restore'
        }).then((result) => {
            saveUserChallenge(challengeKey, {code: challenge?.originalCode, status: "INITIAL"})
                .then((_) => window.location.reload())
        })
    }

    const addTests = () => {
        saveUserChallenge(challengeKey, {code: challenge?.originalCode + EXTRA_TESTS_SUFFIX, status: "INITIAL"})
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
                {`
${challenge.codeTests}
${SPLITTING_COMMENT}
//sampleStart
${challenge.code}
//sampleEnd
                `}
            </div>

            <div style={{display: "flex"}}>
                <div style={{flex: 1}}>
                    <a onClick={(e) => onSave()}>Save</a> <a onClick={(e) => onRestore()}>Restore</a> <a
                    onClick={(e) => addTests()}>Add own tests</a>
                </div>
                {challengeStatus === "SOLVED" &&
                <div style={{textAlign: "right", flex: 1, color: "#4dbb5f"}}>
                    Solved <i className="far fa-check-circle"/>
                </div>
                }
            </div>

            <br/>

            <div>
                {challenge.description}
            </div>
        </div>
        <FooterSection/>
    </>;
};

const SPLITTING_COMMENT = "// Your code starts here"

const EXTRA_TESTS_SUFFIX = `

class MoreTests() {
    @Test fun \`your test here\`() {
        Assert.assertEquals(true, false)
    }
}
`