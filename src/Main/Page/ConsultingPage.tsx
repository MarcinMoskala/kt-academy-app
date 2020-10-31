import React from 'react';
import Header from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import "../../Utils";
import {useTranslations} from "../../Translations";
import {registerPage} from "../../Utils";
import {SectionSimple} from "../../Section/SectionSimple";
import ReactMarkdown from "react-markdown";
import Link from "../../Link";
import MarcinPic from "./Workshop/Trainer/Marcin_Moskala.jpg";
import BartoszPic from "./Workshop/Trainer/BartoszAllegro.jpeg";
import MarekPic from "./Workshop/Trainer/MarekK.jpg";
import WlodekPic from "./Workshop/Trainer/Wlodek_Krakowski.jpg";
import Swal from "sweetalert2";

export default function ConsultingPage() {
    registerPage("consulting")
    const t = useTranslations();

    return <>
        <Header/>
        <SectionSimple title={"Consulting"}
                       text={"Our team of experts is ready to help you with your company problems."}/>

        <ConsultingSection title="A/B testing" imgSrc={BartoszPic}
                           description="If you want to introduce A/B testing in your company, our consultants, who implemented A/B testing process and platform for Allegro, the boggest tech company in Poland and one of the biggest in the World, are ready to share their experience and help you with smooth transition in your company."/>

        <ConsultingSection title="System Design" imgSrc={MarcinPic}
                           description="Complex project require proper architecture design that both support dividing parts of the project between teams, and easier testing. Here he often need microservices, proper asynchronous messaging, distributed databases. In Allegro we made such transition, and we can help you make a similar one pragmatically in your company too."/>

        <ConsultingSection title="Softwere Architecture" imgSrc={WlodekPic}
                           description="Proper code, project and services architecture based on the best practices and design patterns."/>

        <ConsultingSection title="Kotlin" imgSrc={MarcinPic}
                           description="For companies introducing or willing to introduce Kotlin."/>

        <ConsultingSection title="Basic programming" imgSrc={MarekPic}
                           description="If just start your path as a developer and you need lesson, a consultancy, or a code review, we are ready to help. "/>

        <FooterSection/>
    </>;
};

function ConsultingSection({title, imgSrc, description}: { title: string, imgSrc: string, description: string }) {
    return <section className="requirements short-section short-list">
        <div className="content-container short-content-container">
            <h2>{title}</h2>
            <PersonImage src={imgSrc}/>
            <ReactMarkdown source={description}/>
            <a onClick={() => showApplicationForm()} className="button margin-top-20">
                Schedule a meeting
            </a>
        </div>
    </section>;
}

export function PersonImage({src = MarcinPic, alt = "Person image"}: { src?: string, alt?: string }) {
    return <div className="flex-item--image-container margin-bottom-20">
        <img className="round-photo round-photo-middle wow zoomIn" src={src} alt={alt}/>
    </div>;
}

async function showApplicationForm() {
    const {value: formValues} = await Swal.fire({
        title: 'Multiple inputs',
        html:
            '<div>Email</div>' +
            '<input id="swal-input1" class="swal2-input">' +
            '<div>When can we meet?</div>' +
            '<input id="swal-input2" class="swal2-input">' +
            '<div>More about your case</div>' +
            '<input id="swal-input3" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                // @ts-ignore
                document.getElementById('swal-input1')!.value,
                // @ts-ignore
                document.getElementById('swal-input2')!.value
            ]
        }
    })

    // if (formValues) {
    //     Swal.fire(JSON.stringify(formValues))
    // }
}