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
import UsersAdminPage from "./Admin/UsersAdminPage";
import GenerateDtoPage from "./Main/Page/GenerateDtoPage";
import MaterialsPage from "./Logged/Materials";
import initShowFab from "./initShowFab";

const App = () => {
    console.log('public url: ', process.env.PUBLIC_URL)
    const routes: { path: string, component }[] = [
        {path: "/workshopForm/:workshopKey", component: WorkshopFormPage},
        {path: "/workshop/:workshopKey", component: WorkshopPage},
        {path: "/generate", component: GenerateDtoPage},
        {path: "/materials", component: MaterialsPage},
        {path: "/workshop", component: WorkshopsPage},
        {path: "/puzzler", component: PuzzlerExamplesPage},
        {path: "/challenges", component: ChallengesExamplePage},
        {path: "/privacyPolicy", component: PrivacyPolicyPage},
        {path: "/admin/users", component: UsersAdminPage},
        {path: "", component: HomePage},
    ]
    initShowFab()
    return <div className="container py-5">
        <div className="row justify-content-center">
            <Switch>
                {routes.map((route, i) =>
                    <Route path={"/pl" + route.path} key={i}>
                        <LangContext.Provider value={Lang.PL}>
                            {React.createElement(route.component)}
                        </LangContext.Provider>
                    </Route>)}
                {routes.map((route, i) =>
                    <Route path={route.path} key={i}>
                        <LangContext.Provider value={Lang.EN}>
                            {React.createElement(route.component)}
                        </LangContext.Provider>
                    </Route>)}
            </Switch>
        </div>
    </div>;
}

export default App