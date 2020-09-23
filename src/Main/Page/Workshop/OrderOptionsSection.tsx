import {Workshop} from "../../../Model";
import {useTranslations} from "../../../Translations";
import Link from "../../../Link";
import React from "react";

export function OrderOptionsSection({workshop}: { workshop: Workshop }) {
    const t = useTranslations()

    return <section className="contact short-section section--white" id="contact">
        <div className="content-container">
            <h1>Request</h1>
            <Link to={"/workshopForm/" + workshop.key}
                  className="button wow swing button-detailed-page-gtm margin-top-20">
                {"Request open online workshop"}
            </Link>
            <p>{"Choose this option if you need workshop for yourself or for a small group of people. The base price is 400 EUR per person for 3 days."}</p>
            <Link to={"/workshopForm/" + workshop.key}
                  className="button wow swing button-detailed-page-gtm margin-top-20">
                {"Request closed workshop"}
            </Link>
            <p>{"Choose this option if you need workshop for your team or company. The base price is 4500 EUR for the group for 3 days."}</p>
        </div>
    </section>;
}