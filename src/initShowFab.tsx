import {User} from "./Model";

type FabMenuItem = { text: string, link: string, icon: string }
type LinksBuilder = (user: User) => FabMenuItem[]
type OnSignedOnEvent = (user: User) => void
type OnSignedOutEvent = () => void

declare global {
    function initFab(name: string, newsletter_name: string, logo_url: string, extraMenuLinksFunction: LinksBuilder, onSignedEvent: OnSignedOnEvent, onSignedOutEvent: OnSignedOutEvent);
}

export default function initShowFab(setUser: (user: User | null) => void) {
    const name = "Kt. Academy"
    const newsletter_name = "KT_ACADEMY"
    const logo_url = '/images/logo.png'
    const extraMenuLinksFunction: LinksBuilder = (user) => {
        const items: FabMenuItem[] = []
        if (user.tags.includes("ADMIN")) {
            items.push({text: "Users", link: "/admin/users", icon: "fas fa-users"})
            items.push({text: "Submissions", link: "/admin/workshopSubmissions", icon: "fas fa-chalkboard-teacher"})
            items.push({text: "Statistics", link: "/admin/statistics", icon: "fas fa-chart-line"})
        }
        return items
    }
    const onSignedEvent: OnSignedOnEvent = (user) => {
        setUser(user)
    }
    const onSignedOutEvent: OnSignedOutEvent = () => {
        setUser(null)
    }
    initFab(name, newsletter_name, logo_url, extraMenuLinksFunction, onSignedEvent, onSignedOutEvent)
}