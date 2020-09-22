import React from 'react';
import FooterSection from "../Main/Section/FooterSection";
import Header from "../Main/Section/Header/Header";
import {useWorkshopSubmissionsList} from "../Hooks";
import {registerPage} from "../Utils";
import {AdminTable} from "./AdminTable";
import {WorkshopSubmission} from "../Model";

export default function WorkshopsSubmissionsAdminPage() {
    registerPage("users-admin")
    const workshopSubmissions = useWorkshopSubmissionsList()
    console.log(workshopSubmissions)

    const [selected, setSelected] = React.useState<WorkshopSubmission[]>([]);

    const onChangeStatus = () => {
    }

    return <>
        <Header/>
        {workshopSubmissions &&
        <AdminTable list={workshopSubmissions} columns={[
            {property: 'timestamp', label: 'Timestamp'},
            {property: 'workshopKey', label: 'WorkshopKey'},
            {property: 'lang', label: 'Lang'},
            {property: 'data', label: 'Details'},
            {property: 'status', label: 'Status'},
        ]} selectedChanged={setSelected}/>
        }
        <div>
            Actions: <a onClick={() => onChangeStatus}>Change status</a>
        </div>
        <FooterSection/>
    </>;
};