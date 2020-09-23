import React from 'react';
import FooterSection from "../Section/FooterSection";
import Header from "../Section/Header/Header";
import {useUsersList} from "../Hooks";
import {registerPage} from "../Utils";
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
            {name: 'email', label: 'Email', options: {filter: false, sort: true}},
            {name: 'createdAt', label: 'Created at', options: {filter: false, sort: true, sortDirection: 'desc'}},
            {name: 'name', label: 'Name', options: {filter: false, sort: true}},
            {name: 'surname', label: 'Surname', options: {filter: false, sort: true}},
            {name: 'newsletters', label: 'Newsletters', options: {filter: true, sort: true}},
            {name: 'tags', label: 'Tags', options: {filter: true, sort: true}},
        ]}/>
        }
        <FooterSection/>
    </>
};