import React, {useEffect} from "react";
import {Challenge, User, Workshop} from "./Model";
import {callApi} from "./Utils";
import {useLang} from "./Translations";

export function useWorkshop(workshopKey: string): Workshop | undefined {
    const [workshop, setWorkshop] = React.useState<Workshop>();
    const lang = useLang()

    useEffect(() => {
        callApi<Workshop>("workshop/" + workshopKey, {lang: lang.key})
            .then(
                (result) => setWorkshop(result),
                (error) => console.log(error)
            )
    }, [workshopKey])

    return workshop
}

export function useUsersList(): User[] | undefined {
    const [usersList, setUsersList] = React.useState<User[]>();

    useEffect(() => {
        callApi<User[]>("user")
            .then(
                (result) => setUsersList(result),
                (error) => console.log(error)
            )
    }, [])

    return usersList
}

export function useUser(): User | undefined | null {
    const [user, setUser] = React.useState<User | null>();

    useEffect(() => {
        callApi<User | null>("user/me")
            .then(
                (result) => setUser(result),
                (error) => console.log(error)
            )
    }, [])

    return user
}

export function useChallenge(key: string): Challenge | undefined | null {
    const [challenge, setChallenge] = React.useState<Challenge | null>();

    useEffect(() => {
        callApi<Challenge | null>(`challenge/${key}`)
            .then(
                (result) => setChallenge(result),
                (error) => console.log(error)
            )
    }, [])

    return challenge
}