import React, {useEffect} from "react";
import {User, Workshop} from "./Model";
import {API_URL} from "./Network";
import {callApi} from "./Utils";

export function useWorkshop(workshopKey: string): Workshop | undefined {
    const [workshop, setWorkshop] = React.useState<Workshop>();

    useEffect(() => {
        fetch(API_URL + "workshop/" + workshopKey)
            .then(res => res.json())
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
        callApi("user")
            .then(
                (result) => setUsersList(result),
                (error) => console.log(error)
            )
    }, [])

    return usersList
}