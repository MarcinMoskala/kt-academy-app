import React from 'react';
import {useTranslations} from "../Translations";
import FooterSection from "../Main/Section/FooterSection";
import Header from "../Main/Section/Header/Header";
import {useUser} from "../Hooks";
import {registerPage} from "../Utils";
import Link from "../Link";

export default function Materials() {
    registerPage(`materials`)
    const t = useTranslations();
    const user = useUser()

    if (!user) {
        return <div style={{textAlign: "center"}}>
            Log in to see the materials (using floating action menu on the right-bottom corner)
        </div>
    }

    if (!(user.tags.includes("ADMIN") || user.tags.includes("KOTLIN_WORKSHOP_ATTENDEE"))) {
        return <div style={{textAlign: "center"}}>Sorry, you are not allowed to access this section.</div>
        return <div style={{textAlign: "center"}}>
            If you attended any workshop by Kt. Academy or by Marcin Moskała, contact us using "Send private feedback"
            on the floating action menu.
        </div>
    }

    return <>
        <Header allowedLangs={["EN"]} />
        <div className="content-container" style={{paddingTop: "80px"}}>
            <h1>Materials</h1>
            <div>
                <LinkParagraph text="Cheat Sheet" to="/Kotlin_Cheat_Sheet_Full.pdf"/>
                <LinkParagraph text="Coroutines Cheat Sheet" to="/Kotlin_Coroutines_Cheat_Sheet.pdf"/>
            </div>

            <div>
                <ExpandableTitle title="To stay up to date:">
                    <LinkParagraph text="Kotlin Twitter" to="https://twitter.com/kotlin"/>
                    <LinkParagraph text="Kotlin Reddit" to="https://www.reddit.com/r/Kotlin/"/>
                    <LinkParagraph text="Kotlin Slack"
                                   to="https://surveys.jetbrains.com/s3/kotlin-slack-sign-up?_ga=2.250217858.500119251.1600534868-1993516589.1588749989"/>
                    <LinkParagraph text="Kotlin Talks" to="https://kotlinlang.org/community/talks.html?time=all"/>
                    <LinkParagraph text="JetBrains blog" to="https://blog.jetbrains.com/kotlin/"/>
                    <LinkParagraph text="Kotlin Weekly" to="http://www.kotlinweekly.net/"/>
                    <LinkParagraph text="Kt. Academy blog" to="https://blog.kotlin-academy.com/"/>
                </ExpandableTitle>
            </div>

            <div>
                <h2>Kotlin Development</h2>
                <LinkParagraph text="Workshop slides"
                               to="https://docs.google.com/presentation/d/1w_qcoA4uKBv35ehPaQsDdCwzxC3qlnHuucLPBB7vuCk/edit?usp=sharing"/>
                <ExpandableTitle title="Recordings:">
                    <Video title="Functions" videoKey="fVxIaolQIjI"/>
                    <Video title="Control Structures" videoKey="hhFKZVLbPDk"/>
                    <Video title="Null safety" videoKey="MwCFwpWAvio"/>
                    <Video title="Classes and properties" videoKey="zGJB1NS2nmc"/>
                    <Video title="Extension Functions" videoKey="BNB7_fYz8Xo"/>
                    <Video title="Typing System" videoKey="rvROB5eiztw"/>
                    <Video title="Collection processing" videoKey="qc35Vog9YDs"/>
                    <Video title="Operator overloading" videoKey="gF4BmcRABi0"/>
                    <Video title="DSL and Scope Functions" videoKey="uZc6qpXxsHc"/>
                    <Video title="Delegation" videoKey="1h4GLIP-rEo"/>
                    <Video title="Kotlin and Java interoperability" videoKey="Au29CtEPZi4"/>
                    <Video title="Generics" videoKey="FYZ0Dbr292A"/>
                    <Video title="Extra: Multiplatform Development" videoKey="_TaQO2O_V0Y"/>
                </ExpandableTitle>
            </div>
            <div>
                <h2>Kotlin Coroutines</h2>

                <LinkParagraph text="Workshop slides"
                               to="https://docs.google.com/presentation/d/13Ue3hTEUdRAwFOV5ShumwZBStbHz39YW3SjVMizNPQg/edit?usp=sharing"/>

                <p>To learn coroutines by yourself, here are my recommendations:</p>

                <ExpandableTitle title="To learn by practice:">
                    <LinkParagraph text="JetBrains hand-on's"
                                   to="https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/01_Introduction"/>
                    <LinkParagraph text="Google Labs: Use Kotlin Coroutines in your Android App"
                                   to="https://codelabs.developers.google.com/codelabs/kotlin-coroutines/index.html"/>
                    <LinkParagraph text="Google Labs: Learn advanced coroutines with Kotlin Flow and LiveData"
                                   to="https://codelabs.developers.google.com/codelabs/advanced-kotlin-coroutines/index.html"/>
                </ExpandableTitle>

                <ExpandableTitle title="To learn theory:">
                    <LinkParagraph text="All presentations by Roman Elizarov"
                                   to="https://www.youtube.com/results?search_query=kotlin+coroutines+roman+elizarov+"/>
                    <LinkParagraph text="Android Docs about coroutines performance"
                                   to="https://developer.android.com/kotlin/coroutines-adv"/>

                    <p> Google IO about coroutines in Android:</p>
                    <Video videoKey="BOHK_w09pVA"/>
                    <Video videoKey="B8ppnjGPAGE"/>
                    <Video videoKey="KMb0Fs8rCRs"/>

                    <Video title="Great presentation about testing coroutines" videoKey="hMFwNLVK8HU"/>
                    <Video title="To understand how do they work under the hood" videoKey="DOoJnJJnAG4"/>
                    <Video title="Making a KTX library" videoKey="pUtC4nLEXjI"/>
                    <Video title="Introduction to flow" videoKey="xV1XRakSoWI"/>
                </ExpandableTitle>

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