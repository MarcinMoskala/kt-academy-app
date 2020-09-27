import React, {useEffect} from 'react';
import {useTranslations} from "../Translations";
import {useChallenge, useCourse} from "../Hooks";
import {registerPage} from "../Utils";
import {useParams} from "react-router-dom";
import playground from "kotlin-playground";
import {saveUserChallenge} from "../Network";
import {Challenge, ChallengeStatus} from "../Model";
import Header from "../Section/Header/Header";
import FooterSection from "../Section/FooterSection";
import {LoadingPage} from "../Loading";
import Swal from "sweetalert2";
import "./CourseElement.css"
import {PrevNextBar} from "./PrevNextBar";
import ReactMarkdown from "react-markdown";

type CodeEditorInstance = {
    state: string,
    getCode: () => string
}

export default function ChallengePage() {
    const {courseKey, challengeKey} = useParams<{ courseKey: string, challengeKey: string }>();
    registerPage(`challenge-${challengeKey}`);
    const t = useTranslations();
    const course = useCourse(courseKey)
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

    if (course === undefined) {
        return <LoadingPage/>
    }

    if (course === null) {
        return <div>Course not found</div>
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

            <div className="buttons-container">
                <div className="buttons-left">
                    <a onClick={(e) => onSave()}>Save</a> <a onClick={(e) => onRestore()}>Restore</a> <a
                    onClick={(e) => addTests()}>Add own tests</a>
                </div>
                {challengeStatus === "SOLVED" &&
                <div className="buttons-right green-color">
                    Solved <i className="far fa-check-circle"/>
                </div>
                }
            </div>

            <br/>

            <ReactMarkdown source={challenge.description}/>

            <br/>

            <PrevNextBar course={course} stepKey={challengeKey} stepType={"CHALLENGE"}/>
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