import React from 'react';
import {useTranslations} from "../Translations";
import FooterSection from "../Section/FooterSection";
import Header from "../Section/Header/Header";
import {useUsersList} from "../Hooks";
import {registerPage} from "../Utils";
import MUIDataTable from "mui-datatables";
import {AdminTable} from "./AdminTable";
import {User} from "../Model";

export default function UsersAdminPage() {
    registerPage("users-admin")
    const usersList = useUsersList()
    console.log(usersList)

    return <>
        <Header/>
        {usersList &&
        <AdminTable<User> title="Users" list={usersList} columns={[
            {name: 'email', label: 'Email'},
            {name: 'name', label: 'Name'},
            {name: 'surname', label: 'Surname'},
            {name: 'newsletters', label: 'Newsletters'},
            {name: 'tags', label: 'Tags'},
        ]}/>
        }
        <FooterSection/>
        </>
};