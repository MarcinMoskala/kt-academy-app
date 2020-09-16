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
    dto: string
}

export default function GenerateDtoPage() {
    const t = useTranslations();
    const [dto, setDto] = useState<string>()
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
            setDto(d.dto)
        })
    }

    return <>
        <Header/> {/* Should have Home link */}
        <section className="form">
            <div className="content-container" style={{paddingTop: "80px"}}>
                <h1>Generate dto</h1>
                <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: "40px"}}>
                    <fieldset>
                        <label htmlFor="code">Paste your code here</label>
                        <textarea name="code" rows={7} id="code" ref={register} placeholder="class User(..."/>
                    </fieldset>

                    <div style={{display: 'flex'}}>
                        <fieldset style={{flex: 1}}>
                            <label htmlFor="newName">DTO name</label>
                            <input type="text" name="newName" id="newName" ref={register} placeholder=""/>
                        </fieldset>
                        <fieldset style={{flex: 1}}>
                            <label htmlFor="suffix">(or) DTO Suffix</label>
                            <input type="text" name="suffix" id="suffix" ref={register} placeholder="" value="Json"/>
                        </fieldset>
                    </div>

                    <input type="submit" className="button button--mini" id="submit"
                           style={{position: "relative", right: "50%", left: "40%"}}
                           value="Generuj"/>
                </form>

                {dto &&
                <div>
                    <h3>DTO</h3>
                    <KotlinPlayground mode="kotlin" className="text-align-left margin-bottom-50">
                        {dto}
                    </KotlinPlayground>
                </div>
                    }
            </div>
        </section>
        <FooterSection/>
    </>;
};