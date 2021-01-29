import React from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "./Main/Page/Home/HomePage";
import {Lang, LangContext} from "./Translations";
import {GlobalStateWrapper} from "./GlobalState";
import WorkshopsPage from "./Main/Page/Workshops/WorkshopsPage";
import WorkshopPage from "./Main/Page/Workshop/WorkshopPage";
import PuzzlerExamplesPage from "./Main/Page/PuzzlerExamplesPage";
import PrivacyPolicyPage from "./Main/Page/PrivacyPolicyPage";
import WorkshopFormPage from "./Main/Page/Form/WorkshopFormPage";
import ChallengesExamplePage from "./Main/Page/ChallengesExamplePage";
import UsersAdminPage from "./Admin/UsersAdminPage";
import GenerateDtoPage from "./Extra/Generate/GenerateDtoPage";
import MaterialsPage from "./Logged/MaterialsPage";
import ChallengePage from "./Logged/Course/ChallengePage";
import WorkshopRequestFormPage from "./Main/Page/Form/WorkshopRequestPublicFormPage";
import WorkshopsSubmissionsAdminPage from "./Admin/WorkshopsSubmissionsAdminPage";
import CoursePage from "./Logged/Course/CoursePage";
import CoursesPage from "./Logged/Course/CoursesPage";
import VideoPage from "./Logged/Course/VideoPage";
import {UserEditPageWrapper, UserPageWrapper} from "./Logged/User/UserPage";
import ProgrammingMusicTimerPage from "./Extra/Music/ProgrammingMusicTimerPage";
import StatisticsAdminPage from "./Admin/StatisticsAdminPage";
import PageStatisticsAdminPage from "./Admin/PageStatisticsAdminPage";
import JsonFormatPage from "./Extra/Json/JsonFormatPage";
import ConsultingPage from "./Main/Page/ConsultingPage";
import WorkshopRegisterToPlannedPublicFormPage from "./Main/Page/Form/WorkshopRegisterToPlannedPublicFormPage";

// LogRocket.init('qm0xny/kt-academy');

const App = () => {
    const routes: { path: string, component }[] = [
        {path: "/user/me", component: UserEditPageWrapper},
        {path: "/user/:userKey", component: UserPageWrapper},
        {path: "/course/:courseKey/challenge/:challengeKey", component: ChallengePage},
        {path: "/course/:courseKey/video/:videoKey", component: VideoPage},
        {path: "/course/:courseKey", component: CoursePage},
        {path: "/course", component: CoursesPage},
        {path: "/workshopForm/:workshopKey", component: WorkshopFormPage},
        {path: "/workshopPublicForm/:workshopKey", component: WorkshopRequestFormPage},
        {path: "/workshopPublicRegisterForm/:workshopKey", component: WorkshopRegisterToPlannedPublicFormPage},
        {path: "/workshop/:workshopKey", component: WorkshopPage},
        {path: "/music", component: ProgrammingMusicTimerPage},
        {path: "/json", component: JsonFormatPage},
        {path: "/generate", component: GenerateDtoPage},
        {path: "/materials", component: MaterialsPage},
        {path: "/consulting", component: ConsultingPage},
        {path: "/workshop", component: WorkshopsPage},
        {path: "/puzzler", component: PuzzlerExamplesPage},
        {path: "/challenges", component: ChallengesExamplePage},
        {path: "/privacyPolicy", component: PrivacyPolicyPage},
        {path: "/admin/users", component: UsersAdminPage},
        {path: "/admin/workshopSubmissions", component: WorkshopsSubmissionsAdminPage},
        {path: "/admin/statistics/:pageKey", component: PageStatisticsAdminPage},
        {path: "/admin/statistics", component: StatisticsAdminPage},
        {path: "", component: HomePage},
    ]
    return <GlobalStateWrapper>
        <div className="container py-5">
            <div className="row justify-content-center">
                <Switch>
                    {routes.map((route, i) =>
                        <Route path={"/pl" + route.path} key={i}>
                            <LangContext.Provider value={Lang.PL}>
                                {React.createElement(route.component)}
                            </LangContext.Provider>
                        </Route>)}
                    {routes.map((route, i) =>
                        <Route path={route.path} key={i}>
                            <LangContext.Provider value={Lang.EN}>
                                {React.createElement(route.component)}
                            </LangContext.Provider>
                        </Route>)}
                </Switch>
            </div>
        </div>
    </GlobalStateWrapper>;
}

export default App