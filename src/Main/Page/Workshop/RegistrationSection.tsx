import {printMoney, Workshop} from "../../../Model";
import {useTranslations} from "../../../Translations";
import Link from "../../../Link";
import React from "react";

export function RegistrationSection({workshop}: { workshop: Workshop }) {
    const t = useTranslations()

    return <section className="contact short-section section--white" id="register">
        <div className="content-container">
            <h1>{t.workshopPage.registration.title}</h1>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <OrderOption
                    link={"/workshopForm/" + workshop.key}
                    buttonText={t.workshopPage.registration.private.buttonText}
                    explanation={t.workshopPage.registration.private.explanation
                        .replace("{workshop_price}", printMoney(workshop.basePrice.company))}/>
                <OrderOption
                    link={"/workshopPublicForm/" + workshop.key}
                    buttonText={t.workshopPage.registration.public.buttonText}
                    explanation={t.workshopPage.registration.public.explanation
                        .replace("{workshop_person_price}", printMoney(workshop.basePrice.person))}/>
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
