import {printMoney, Workshop} from "../../../Model";
import {useTranslations} from "../../../Translations";
import Link from "../../../Link";
import React from "react";

export function RegistrationSection({workshop}: { workshop: Workshop }) {
    const t = useTranslations()

    const multipleOptions = !!workshop.basePrice.company && !!workshop.basePrice.person

    return <section className="contact short-section section--white" id="register">
        <div className="content-container">
            <h1>{t.workshopPage.registration.title}</h1>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {workshop.basePrice.company &&
                <OrderOption
                    link={"/workshopForm/" + workshop.key}
                    buttonText={multipleOptions ? t.workshopPage.registration.private.buttonText : t.workshopPage.registration.register}
                    explanation={
                        (multipleOptions ? t.workshopPage.registration.private.chooseOption : "") +
                        t.workshopPage.registration.private.explanation
                            .replace("{workshop_price}", printMoney(workshop.basePrice.company))
                            .replace("{workshop_price_pl}", printMoney(workshop.basePrice.companyPl ?? workshop.basePrice.company))
                            .replace("{days_num}", String(workshop.basePrice.daysNumber ?? 3))}/>
                }
                {workshop.basePrice.person &&
                <OrderOption
                    link={"/workshopPublicForm/" + workshop.key}
                    buttonText={multipleOptions ? t.workshopPage.registration.public.buttonText : t.workshopPage.registration.register}
                    explanation={
                        (multipleOptions ? t.workshopPage.registration.public.chooseOption : "") +
                        t.workshopPage.registration.public.explanation
                            .replace("{workshop_person_price}", printMoney(workshop.basePrice.person))
                            .replace("{workshop_person_price_pl}", printMoney(workshop.basePrice.personPl ?? workshop.basePrice.person))
                            .replace("{days_num}", String(workshop.basePrice.daysNumber ?? 3))}/>
                }
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
