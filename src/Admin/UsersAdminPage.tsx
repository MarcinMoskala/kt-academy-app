import React from 'react';
import {useTranslations} from "../Translations";
import FooterSection from "../Main/Section/FooterSection";
import Header from "../Main/Section/Header/Header";
import {useUsersList} from "../Hooks";
import {registerPage} from "../Utils";
import {AdminTable} from "./AdminTable";

export default function UsersAdminPage() {
    registerPage("users-admin")
    const t = useTranslations();
    const usersList = useUsersList()
    console.log(usersList)

    return <>
        <Header/>
        {usersList &&
        <AdminTable list={usersList} columns={[
            {property: 'email', label: 'Email'},
            {property: 'name', label: 'Name'},
            {property: 'surname', label: 'Surname'},
            {property: 'newsletters', label: 'Newsletters'},
            {property: 'tags', label: 'Tags'},
        ]} selectedChanged={(s) => console.log("Now selected "+s)}/>
        }
        <FooterSection/>
    </>;
};