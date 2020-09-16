import React, {useState} from 'react';
import Header from "../Section/Header/Header";
import FooterSection from "../Section/FooterSection";
import "../../Utils";
import {useTranslations} from "../../Translations";
import {useForm} from "react-hook-form";
import {callApi} from "../../Utils";
import KotlinPlayground from "react-kotlin-playground/es";

type GenerationForm = {
    code: string,
    newName: string,
    suffix: string,
}

type GenerateResp = {
    dto: string,
    groovyBuilder: string,
    groovyObjectAssertion: string,
}

export default function GenerateDtoPage() {
    const t = useTranslations();
    const [resp, setResp] = useState<GenerateResp>()
    const {register, setValue, handleSubmit, errors} = useForm<GenerationForm>();

    const onSubmit = (data: GenerationForm) => {
        callApi<GenerateResp>("generate", {
            method: "POST",
            body: {
                code: data.code,
                options: {
                    newName: data.newName,
                    suffix: data.suffix
                }
            }
        }).then(d => {
            setResp(d)
        })
    }

    const defaultCode = `class User(
   val id: UserId, 
   val name: String, 
   val surname: String, 
   val age: Int, 
   val tokens: List<Token>
)`

    return <>
        <Header/> {/* Should have Home link */}
        <section className="form">
            <div className="content-container" style={{paddingTop: "80px"}}>
                <h1>{t.generate.title}</h1>
                <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: "40px"}}>
                    <fieldset>
                        <label htmlFor="code">{t.generate.pastePrompt}</label>
                        <textarea name="code" style={{height: "200px"}} id="code" ref={register} placeholder="class User(..." value={defaultCode}/>
                    </fieldset>

                    <div style={{display: 'flex'}}>
                        <fieldset style={{flex: 1}}>
                            <label htmlFor="newName">{t.generate.dtoName}</label>
                            <input type="text" name="newName" id="newName" ref={register} placeholder=""/>
                        </fieldset>
                        <fieldset style={{flex: 1}}>
                            <label htmlFor="suffix">{t.generate.dtoSuffix}</label>
                            <input type="text" name="suffix" id="suffix" ref={register} placeholder="" value="Json"/>
                        </fieldset>
                    </div>

                    <input type="submit" className="button button--mini" id="submit"
                           style={{position: "relative", right: "50%", left: "40%"}}
                           value={t.generate.generateButton}/>
                </form>

                {resp &&
                <>
                    <div>
                        <h3>DTO</h3>
                        <KotlinPlayground mode="kotlin" className="text-align-left margin-bottom-50">
                            {resp.dto}
                        </KotlinPlayground>
                    </div>
                    <div>
                        <h3>Groovy builder</h3>
                        <KotlinPlayground mode="groovy" className="text-align-left margin-bottom-50">
                            {resp.groovyBuilder}
                        </KotlinPlayground>
                    </div>
                    <div>
                        <h3>Groovy Assertion</h3>
                        <KotlinPlayground mode="groovy" className="text-align-left margin-bottom-50">
                            {resp.groovyObjectAssertion}
                        </KotlinPlayground>
                    </div>
                </>
                }
            </div>
        </section>
        <FooterSection/>
    </>;
};