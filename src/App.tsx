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
    const routes: {path: string, component}[] = [
        {path:"/workshopForm/:workshopKey", component:WorkshopFormPage},
        {path:"/workshop/:workshopKey", component:WorkshopPage},
        {path:"/workshop", component:WorkshopsPage},
        {path:"/puzzler", component:PuzzlerExamplesPage},
        {path:"/challenges", component:ChallengesExamplePage},
        {path:"/privacyPolicy", component:PrivacyPolicyPage},
        {path:"", component:HomePage},
    ]
    return <div className="container py-5">
        <div className="row justify-content-center">
            <Switch>
                {routes.map(route => <Route path={"/pl" + route.path}>
                    <LangContext.Provider value={Lang.PL}>
                        {React.createElement(route.component)}
                    </LangContext.Provider>
                </Route>)}
                {routes.map(route => <Route path={route.path}>
                    <LangContext.Provider value={Lang.EN}>
                        {React.createElement(route.component)}
                    </LangContext.Provider>
                </Route>)}
            </Switch>
        </div>
    </div>;
}

export default App