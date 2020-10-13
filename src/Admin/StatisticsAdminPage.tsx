import React from 'react';
import FooterSection from "../Section/FooterSection";
import Header from "../Section/Header/Header";
import {useStatistics} from "../Hooks";
import {registerPage} from "../Utils";
import {PageStatistics, Statistics, User} from "../Model";
import {AdminTable} from "./AdminTable";

export default function StatisticsAdminPage() {
    registerPage("statistics-admin")
    const statistics: Statistics | undefined | null = useStatistics()
    console.log(statistics)

    return <>
        <Header/>
        <div style={{height: "80px"}}/>
        {statistics && <>
            <div>{"Page views: " + statistics.pageViews}</div>
            <div>{"Unique user views: " + statistics.uniqueUsers}</div>
            <div>{"Accounts: " + statistics.accounts}</div>
            <AdminTable<PageStatistics> title="Users" list={statistics.pageStatistics} columns={[
                {name: 'pageKey', label: 'Page key', options: {filter: false, sort: true}},
                {name: 'pageViews', label: 'Page views', options: {filter: false, sort: true}},
                {name: 'uniqueUsers', label: 'Unique user views', options: {filter: false, sort: true, sortDirection: 'desc'}},
                {name: 'reactionsCount', label: 'Reactions', options: {filter: false, sort: true}},
            ]}/>
        </>}
        <FooterSection/>
    </>
};