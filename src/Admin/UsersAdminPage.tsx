import React from 'react';
import FooterSection from "../Section/FooterSection";
import Header from "../Section/Header/Header";
import {useUsersList} from "../Hooks";
import {registerPage} from "../Utils";
import {AdminTable} from "./AdminTable";
import {User} from "../Model";
import Swal from "sweetalert2";
import {putUserAdmin} from "../Network";

export default function UsersAdminPage() {
    registerPage("users-admin")
    const usersList = useUsersList()

    const elementClicked = (user: User) => {
        Swal.fire<string>({
            title: 'Change tags to',
            input: 'text',
            inputValue: JSON.stringify(user.tags),
            showCancelButton: true
        }).then(state => {
            if (state.value) {
                putUserAdmin(user.id, {tags: JSON.parse(state.value)})
                    .then(_ => window.location.reload())
            }
        })
    }

    return <>
        <Header/>
        {usersList &&
        <AdminTable<User> title="Users" list={usersList} clicked={elementClicked} columns={[
            {name: 'email', label: 'Email', options: {filter: false, sort: true}},
            {name: 'createdAt', label: 'Created at', options: {filter: false, sort: true, sortOrder: 'desc'}},
            {name: 'name', label: 'Name', options: {filter: false, sort: true}},
            {name: 'surname', label: 'Surname', options: {filter: false, sort: true}},
            {name: 'newsletters', label: 'Newsletters', options: {filter: true, sort: true}},
            {name: 'tags', label: 'Tags', options: {filter: true, sort: true}},
        ]}/>
        }
        <FooterSection/>
    </>
};