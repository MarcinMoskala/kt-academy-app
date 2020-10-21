import React, {useState} from 'react';
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import "../../Utils";
import {useTranslations} from "../../Translations";
import {registerPage} from "../../Utils";
import "./JsonFormatPage.css"
import {objectModel} from "./ObjectModel";
import {modelToKotlin, modelToTS} from "./StringifyModel";

export default function JsonFormatPage() {
    registerPage(`json-format`)
    const t = useTranslations();
    const defaultCode = `{
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}
`
    const [code, setCode] = useState<string>(defaultCode)
    const lines = Math.max(10, code.split(/\r\n|\r|\n/).length)
    const {result, error} = parseJsonOrNull(code)
    const formatted = result ? JSON.stringify(result, undefined, 4) : ""

    return <>
        <Header/>
        <section className="form json-formatter">
            <div className="content-container">
                <h1>JSON formatter</h1>
                <p>No requests, no cookies, everything stays on your computer. Your data are safe :)</p>

                <textarea rows={lines} name="code" className="code-input"
                          value={code} onChange={(e) => setCode(e.target.value)}/>
                {result === null && <p>Cannot parse this object</p>}
                {error !== null && <p>Error: {error.message}</p>}
                <CodeComponent code={formatted}/>
                {result && <JsonToObjects value={result}/>}
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

function JsonToObjects({value}: { value: any }) {
    const model = objectModel(value)
    if (!model) return <></>

    const tsTypeDef = modelToTS(model)
    const kotlinTypeDef = modelToKotlin("YourClass", model)
    return <div>
        <h3>TypeScript definition:</h3>
        <CodeComponent code={tsTypeDef}/>
        <h3>Kotlin definition:</h3>
        <CodeComponent code={kotlinTypeDef}/>
    </div>
}

function CodeComponent(props: { code: string }) {
    return <pre className="code-wrapper"><code>{props.code}</code></pre>;
}
