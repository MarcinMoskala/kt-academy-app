import React, {useEffect} from "react";
import {User, Workshop} from "./Model";
import {callApi} from "./Utils";

export function useWorkshop(workshopKey: string): Workshop | undefined {
    const [workshop, setWorkshop] = React.useState<Workshop>();

    useEffect(() => {
        callApi<Workshop>("workshop/" + workshopKey)
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