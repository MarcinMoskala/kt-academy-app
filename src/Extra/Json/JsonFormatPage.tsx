import React, {useState} from 'react';
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import "../../Utils";
import {registerPage} from "../../Utils";
import "./JsonFormatPage.css"
import {objectModel} from "./ObjectModel";
import {modelToKotlin, modelToTS} from "./StringifyModel";

export default function JsonFormatPage() {
    registerPage(`json-format`)
    const defaultJson = `{"name": "Kt. Academy", "mission": {"primary": "Teach programming", "secondary": ["Help developers", "Promote best practices"]}}`
    const [className, setClassName] = useState<string>("YourClass")
    const [json, setJson] = useState<string>(defaultJson)
    const lines = Math.max(10, json.split(/\r\n|\r|\n/).length)
    const {result, error} = parseJsonOrNull(json)

    return <>
        <Header/>
        <section className="form json-formatter">
            <div className="content-container">
                <h1>JSON formatter</h1>
                <p>No requests, no cookies, everything stays on your computer. Your data are safe :)</p>

                <input type="text" className="code-input"
                       value={className} onChange={(e) => setClassName(e.target.value)}/>
                <textarea rows={lines} name="code" className="code-input"
                          value={json} onChange={(e) => setJson(e.target.value)}/>
                {result === null && <p>Cannot parse this object</p>}
                {error !== null && <p>Error: {error.message}</p>}
                {result && <JsonToObjects className={className} value={result}/>}
            </div>
        </section>
        <FooterSection/>
    </>;
};

function parseJsonOrNull(json: string): { result: any | null, error: SyntaxError | null } {
    try {
        return {result: JSON.parse(json), error: null};
    } catch (e) {
        console.log(e);
        if (e instanceof SyntaxError) {
            return {result: null, error: e};
        } else {
            return {result: null, error: null};
        }
    }
}

function JsonToObjects({className, value}: { className: string, value: any }) {
    const formatted = value ? JSON.stringify(value, undefined, 4) : ""
    const model = objectModel(value)
    if (!model) return <></>

    const tsTypeDef = modelToTS(className, model)
    const kotlinTypeDef = modelToKotlin(className, model)
    return <div>
        <h3>Pretty:</h3>
        <CodeComponent code={formatted}/>
        <h3>TypeScript definition:</h3>
        <CodeComponent code={tsTypeDef}/>
        <h3>Kotlin definition:</h3>
        <CodeComponent code={kotlinTypeDef}/>
    </div>
}

function CodeComponent(props: { code: string }) {
    return <pre className="code-wrapper"><code>{props.code}</code></pre>;
}