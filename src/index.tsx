import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, useLocation} from "react-router-dom";
import {Integrations} from "@sentry/tracing";
import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://f0594f70bb72410aa5753d68528a9ccc@o472757.ingest.sentry.io/5506986",
    integrations: [
        new Integrations.BrowserTracing(),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop/>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

export default function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0)
        }
    }, [pathname]);

    return null;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
