import React from 'react';
import FooterSection from "../Main/Section/FooterSection";
import Header from "../Main/Section/Header/Header";
import {useWorkshopSubmissionsList} from "../Hooks";
import {registerPage} from "../Utils";
import {AdminTable} from "./AdminTable";
import {WorkshopSubmission} from "../Model";
import Swal from "sweetalert2";
import {changeWorkshopSubmission} from "../Network";

export default function WorkshopsSubmissionsAdminPage() {
    registerPage("users-admin")
    const workshopSubmissions = useWorkshopSubmissionsList()
    console.log(workshopSubmissions)

    const elementClicked = (submission: WorkshopSubmission) => {
        let options = [
            "SUBMITTED",
            "CONFIRMED",
            "FINISHED",
            "OUTDATED",
            "WAITING",
            "SPAM"
        ];
        Swal.fire<string>({
            title: 'Change state to',
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Select new state',
            showCancelButton: true
        }).then(state => {
            if (state.value) {
                changeWorkshopSubmission(submission.id, {status: options[state.value]})
                    .then(_ => window.location.reload())
            }
        })

    }

    return <>
        <Header/>
        {workshopSubmissions &&
        <AdminTable title="Workshop submissions" list={workshopSubmissions} columns={[
            {name: 'timestamp', label: 'Timestamp', options: {filter: false, sort: true}},
            {name: 'workshopKey', label: 'WorkshopKey', options: {filter: true, sort: true}},
            {name: 'submissionType', label: 'Type', options: {filter: true, sort: true}},
            {name: 'lang', label: 'Lang', options: {filter: true, sort: true}},
            {name: 'data', label: 'Details', options: {filter: false, sort: false}},
            {name: 'status', label: 'Status', options: {filter: true, sort: true, filterList: ['SUBMITTED', 'CONFIRMED']}},
        ]} clicked={elementClicked}/>
        }
        <FooterSection/>
    </>;
};