import React from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "./Main/Page/Home/HomePage";
import {Lang, LangContext} from "./Translations";
import WorkshopsPage from "./Main/Page/Workshops/WorkshopsPage";
import WorkshopPage from "./Main/Page/WorkshopPage";
import PuzzlerExamplesPage from "./Main/Page/PuzzlerExamplesPage";
import PrivacyPolicyPage from "./Main/Page/PrivacyPolicyPage";

const App = () => {
    return <div className="container py-5">
        <div className="row justify-content-center">
            <Switch>
                <KtRoute path="/workshop/:workshopKey" component={WorkshopPage}/>
                <KtRoute path="/workshop" component={WorkshopsPage}/>
                <KtRoute path="/puzzler" component={PuzzlerExamplesPage}/>
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