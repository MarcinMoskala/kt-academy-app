import React from 'react';
import FooterSection from "../Section/FooterSection";
import Header from "../Section/Header/Header";
import {useStatistics} from "../Hooks";
import {registerPage} from "../Utils";
import {PageStatistics, Statistics} from "../Model";
import {AdminTable} from "./AdminTable";
import {useHistory} from "react-router-dom";

export default function StatisticsAdminPage() {
    registerPage("statistics-admin")
    const statistics: Statistics | undefined | null = useStatistics()
    const history = useHistory();

    const displayPageStatistics = statistics && [
        {
            pageKey: "All",
            uniqueUsers: statistics.uniqueUsers,
            pageViews: statistics.pageViews,
            reactionsCount: "",
            pageViewsHistory: null
        },
        {
            pageKey: "Kt. Academy",
            uniqueUsers: statistics.pageStatistics.filter(it => it.pageKey.startsWith("kta-")).reduce((acc, ps) => acc + ps.uniqueUsers, 0),
            pageViews: statistics.pageStatistics.filter(it => it.pageKey.startsWith("kta-")).reduce((acc, ps) => acc + ps.pageViews, 0),
            reactionsCount: "",
            pageViewsHistory: null
        },
        {
            pageKey: "Learning Driven",
            uniqueUsers: statistics.pageStatistics.filter(it => it.pageKey.startsWith("ld-")).reduce((acc, ps) => acc + ps.uniqueUsers, 0),
            pageViews: statistics.pageStatistics.filter(it => it.pageKey.startsWith("ld-")).reduce((acc, ps) => acc + ps.pageViews, 0),
            reactionsCount: "",
            pageViewsHistory: null
        },
        ...statistics.pageStatistics
    ]

    const onRowClicked = (page: PageStatistics) => {
        history.push(`/admin/statistics/${page.pageKey}`);
    };
    return <>
        <Header/>
        {statistics && displayPageStatistics && <>
            <div>{"Accounts: " + statistics.accounts}</div>
            <div>{"Subscribers: " + JSON.stringify(statistics.subscribers)}</div>
            <AdminTable<PageStatistics> title="Users" list={displayPageStatistics} clicked={onRowClicked} columns={[
                {name: 'pageKey', label: 'Page key', options: {filter: false, sort: true}},
                {name: 'pageViews', label: 'Page views', options: {filter: false, sort: true, sortOrder: 'desc'}},
                {name: 'uniqueUsers', label: 'Unique user views', options: {filter: false, sort: true}},
                {name: 'reactionsCount', label: 'Reactions', options: {filter: false, sort: true}},
            ]}/>
        </>}
        <FooterSection/>
    </>
};