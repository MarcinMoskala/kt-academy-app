import React, {useEffect} from 'react';
import {useChallenge, useCourse} from "../../Hooks";
import {registerPage} from "../../Utils";
import {useParams} from "react-router-dom";
import playground from "kotlin-playground";
import {saveUserChallenge} from "../../Network";
import {Challenge, ChallengeStatus, Course} from "../../Model";
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import {ErrorPage, LoadingPage} from "../../Loading";
import Swal from "sweetalert2";
import "./CourseElement.css"
import {PrevNextBar} from "./PrevNextBar";
import ReactMarkdown from "react-markdown";

type CodeEditorInstance = {
    state: string,
    getCode: () => string
}

export default function ChallengePageWrapper() {
    const {courseKey, challengeKey} = useParams<{ courseKey: string, challengeKey: string }>();
    registerPage(`challenge-${courseKey}-${challengeKey}`);
    const course = useCourse(courseKey)
    const challenge = useChallenge(challengeKey)

    if (course === undefined) {
        return <LoadingPage/>
    }

    if (course === null) {
        return <ErrorPage message="Course not found"/>
    }

    if (challenge === undefined) {
        return <LoadingPage/>
    }

    if (challenge === null) {
        return <ErrorPage message="Challenge not found"/>
    }
    return <ChallengePage key={course.key + "-" + challenge.key} course={course} challenge={challenge}/>
}

function ChallengePage({course, challenge}: { course: Course, challenge: Challenge }) {
    const [code, setCode] = React.useState<string>(dropTestsCode(challenge.code));
    const [showCode, setShowCode] = React.useState<string>(dropTestsCode(challenge.code));

    const [platform, setPlatform] = React.useState<"junit" | "java">("junit");
    const [challengeStatus, setChallengeStatus] = React.useState<ChallengeStatus | undefined>(challenge?.status);

    useEffect(() => {
        let codeEditorInstance: CodeEditorInstance
        let codeVariable: string
        playground('.challenge-code', {
            version: '1.4.00',
            onChange: (visibleCode: string) => {
                const realCode = dropTestsCode(visibleCode)
                setCode(realCode)
                codeVariable = realCode
            },
            onTestPassed: () => {
                saveUserChallenge(challenge.key, {code: codeVariable, status: "SOLVED"})
                    .then((_) => setChallengeStatus("SOLVED"))
            },
            getInstance: (instance: CodeEditorInstance) => {
                if (instance) codeEditorInstance = instance
            }
        })
    })

    const onSave = () => {
        if(code) saveUserChallenge(challenge.key, {code: dropTestsCode(code)})
    }

    const onRestore = () => {
        Swal.fire({
            title: 'Are you sure that you want to restore?',
            text: "You will lose all the progress you made!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, restore'
        }).then((_) => {
            saveUserChallenge(challenge.key, {code: challenge?.originalCode, status: "INITIAL"})
                .then((_) => window.location.reload())
        })
    }

    const switchPlatform = () => {
        if (platform !== "junit") {
            setPlatform("junit")
        } else {
            let newCode = code ?? ""
            if (!newCode.includes("fun main(")) {
                newCode += EXTRA_MAIN_SUFFIX
            }
            setShowCode(newCode);
            setPlatform("java")
        }
    }

    const addTests = () => {
        setShowCode(code + EXTRA_TESTS_SUFFIX);
    }
    const showAddTests = !(code?.includes("class MoreTests"))

    // noinspection HtmlUnknownAttribute
    return <>
        <Header allowedLangs={["EN"]}/>
        <div className="content-container text-align-left" style={{paddingTop: "80px"}}>
            <h1>{challenge.title}</h1>

            <div key={challenge.key + "-" + showCode + "-" + platform}>
                <div className="challenge-code" data-target-platform={platform} folded-button="true">
                    {`
${challenge.codeTests}
${SPLITTING_COMMENT}
//sampleStart
${showCode}
//sampleEnd
                `}
                </div>
            </div>

            <div className="buttons-container">
                <div className="buttons-left">
                    <a onClick={(_) => onSave()}>Save</a> <a onClick={(_) => onRestore()}>Restore</a> {showAddTests &&
                <a
                    onClick={(_) => addTests()}>Add own tests</a>} <a onClick={(_) => switchPlatform()}>Switch
                    to {platform === "junit" ? "main" : "tests" /*Use https://www.npmjs.com/package/react-switch*/}</a>
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

            <PrevNextBar course={course} stepKey={challenge.key} stepType={"CHALLENGE"}/>
        </div>
        <FooterSection/>
    </>;
}

function dropTestsCode(code: string) {
    const splittingCodeIndex = code.indexOf(SPLITTING_COMMENT);
    if(splittingCodeIndex == -1) {
        return code
    }
    const realCodeStart = splittingCodeIndex + SPLITTING_COMMENT.length + 1 // (\n)
    return code.substr(realCodeStart)
}

const SPLITTING_COMMENT = "// Your code starts here"

const EXTRA_TESTS_SUFFIX = `

class MoreTests() {
    @Test fun \`your test here\`() {
        assertEquals(true, false)
    }
}
`

const EXTRA_MAIN_SUFFIX = `

fun main() {
    println("Hello, world")
}
`