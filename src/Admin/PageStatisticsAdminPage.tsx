import React from 'react';
import FooterSection from "../Section/FooterSection";
import Header from "../Section/Header/Header";
import {usePageStatistics} from "../Hooks";
import {registerPage} from "../Utils";
import {PageStatistics, StatisticsDataPoint} from "../Model";
import {AdminTable} from "./AdminTable";
import {useParams} from "react-router-dom";

export default function PageStatisticsAdminPage() {
    const {pageKey} = useParams<{ pageKey: string }>();
    registerPage(`statistics-admin-${pageKey}`)
    const pageStatistics: PageStatistics | undefined | null = usePageStatistics(pageKey)
    console.log(pageStatistics)

    return <>
        <Header/>
        <div style={{height: "80px"}}/>
        {pageStatistics && <>
            <div>{"Page views: " + pageStatistics.pageViews}</div>
            <div>{"Unique user views: " + pageStatistics.uniqueUsers}</div>
            {pageStatistics.reactionsCount && Object.keys(pageStatistics.reactionsCount).length !== 0 &&
            <div>{"Reactions count: " + JSON.stringify(pageStatistics.reactionsCount)}</div>
            }
            <AdminTable<StatisticsDataPoint> title="Users" list={pageStatistics.pageViewsHistory!} columns={[
                {name: 'day', label: 'Day', options: {filter: false, sort: true}},
                {name: 'amount', label: 'Amount', options: {filter: false, sort: true}},
            ]}/>
        </>}
        <FooterSection/>
    </>
};