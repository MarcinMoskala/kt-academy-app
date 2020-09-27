import {User} from "./Model";

type FabMenuItem = { text: string, link: string, icon: string }
type LinksBuilder = (user: User) => FabMenuItem[]

declare global {
    function initFab(name: string, newsletter_name: string, logo_url: string, extraMenuLinksFunction: LinksBuilder);
}

export default function initShowFab() {
    const name = "Kt. Academy"
    const newsletter_name = "KT_ACADEMY"
    const logo_url = '/images/logo.png'
    const extraMenuLinksFunction: LinksBuilder = (user) => {
        const items: FabMenuItem[] = []
        if(user.tags.includes("ADMIN")) {
            items.push({text: "Users", link: "/admin/users", icon: "fas fa-users"})
            items.push({text: "Submissions", link: "/admin/workshopSubmissions", icon: "fas fa-chalkboard-teacher"})
        }
        if(user.tags.includes("KOTLIN_WORKSHOP_ATTENDEE") || user.tags.includes("ADMIN")) {
            items.push({text: "Courses", link: "/course", icon: "fas fa-chalkboard-teacher"})
        }
        return items
    }
    initFab(name, newsletter_name, logo_url, extraMenuLinksFunction)
}