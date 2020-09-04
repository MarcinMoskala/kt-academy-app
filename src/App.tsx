import React from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "./Main/Page/Home/HomePage";
import {Lang, LangContext} from "./Translations";
import WorkshopsPage from "./Main/Page/Workshops/WorkshopsPage";
import WorkshopPage from "./Main/Page/Workshop/WorkshopPage";
import PuzzlerExamplesPage from "./Main/Page/PuzzlerExamplesPage";
import PrivacyPolicyPage from "./Main/Page/PrivacyPolicyPage";
import WorkshopFormPage from "./Main/Page/Form/WorkshopFormPage";
import ChallengesExamplePage from "./Main/Page/ChallengesExamplePage";

const App = () => {
    return <div className="container py-5">
        <div className="row justify-content-center">
            <Switch>
                <KtRoute path="/workshopForm/:workshopKey" component={WorkshopFormPage}/>
                <KtRoute path="/workshop/:workshopKey" component={WorkshopPage}/>
                <KtRoute path="/workshop" component={WorkshopsPage}/>
                <KtRoute path="/puzzler" component={PuzzlerExamplesPage}/>
                <KtRoute path="/challenges" component={ChallengesExamplePage}/>
                <KtRoute path="/privacyPolicy" component={PrivacyPolicyPage}/>
                <KtRoute component={HomePage}/>
            </Switch>
        </div>
    </div>;
}

function KtRoute({path = "", component}: { path?: string, component }) {
    return <>
        <Route path={"/pl" + path}>
            <LangContext.Provider value={Lang.PL}>
                {React.createElement(component)}
            </LangContext.Provider>
        </Route>
        <Route path={path}>
            <LangContext.Provider value={Lang.EN}>
                {React.createElement(component)}
            </LangContext.Provider>
        </Route>
    </>
}

export default App