import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./Home/Home";
import {Lang} from "./Translations";
import WorkshopsPage from "./Workshops/WorkshopsPage";

const App = () => {
  return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <Switch>
            {/*<Route path="/game" component={Game} />*/}
            {/*<Route path="/weather/:city?" component={WeatherContainer} />*/}
            <Route path="/pl/workshop">
                <WorkshopsPage lang={Lang.PL}/>
            </Route>
            <Route path="/workshop">
                <WorkshopsPage lang={Lang.EN}/>
            </Route>
            <Route path="/pl">
                <Home lang={Lang.PL}/>
            </Route>
            <Route>
                <Home lang={Lang.EN}/>
            </Route>
          </Switch>
        </div>
      </div>
  );
}

export default App