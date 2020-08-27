import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home/Home";
import {Lang, LangContext} from "./Translations";
import WorkshopsPage from "./Workshops/WorkshopsPage";
import WorkshopPage from "./Workshop/WorkshopPage";

const App = () => {
    return <div className="container py-5">
        <div className="row justify-content-center">
            <Switch>
                <KtRoute path="/workshop/:workshopKey" component={WorkshopPage}/>
                <KtRoute path="/workshop" component={WorkshopsPage}/>
                <KtRoute component={Home}/>
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