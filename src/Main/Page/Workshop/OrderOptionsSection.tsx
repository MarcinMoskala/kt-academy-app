import {printMoney, Workshop} from "../../../Model";
import {useTranslations} from "../../../Translations";
import Link from "../../../Link";
import React from "react";

export function OrderOptionsSection({workshop}: { workshop: Workshop }) {
    const t = useTranslations()

    return <section className="contact short-section section--white" id="contact">
        <div className="content-container">
            <h1>Request workshop</h1>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <OrderOption
                    link={"/workshopForm/" + workshop.key}
                    buttonText={"Register for private workshop"}
                    explanation={`Choose this option if you need workshop for your team or company. The base price is ${printMoney(workshop.basePrice.company)} for the group for 3 days.`}
                />
                <OrderOption
                    link={"/workshopOpenForm/" + workshop.key}
                    buttonText={"Request open online workshop"}
                    explanation={`Choose this option if you need workshop for yourself or for a small group of people. The base price is ${printMoney(workshop.basePrice.person)} per person for 3 days.`}
                />
            </div>
        </div>
    </section>;
}

const OrderOption = ({link, buttonText, explanation}: { link: string, buttonText: string, explanation: string }) =>
    <div style={{flex: 1, padding: "20px", borderRadius: "3px", boxShadow: "1px 1px 4px #cacaca", margin: "20px"}}>
        <p style={{}}>{explanation}</p>
        <Link to={link}
              className="button button-detailed-page-gtm margin-top-10">
            {buttonText}
        </Link>
    </div>;
