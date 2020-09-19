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
            items.push({text: "Users", link: "/admin/users", icon: "fad fa-users"})
        }
        if(user.tags.includes("KOTLIN_WORKSHOP_ATTENDEE")) {
            items.push({text: "Materials", link: "/materials", icon: "far fa-file"})
        }
        return items
    }
    initFab(name, newsletter_name, logo_url, extraMenuLinksFunction)
}