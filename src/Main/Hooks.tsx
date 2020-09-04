import React, {useEffect} from "react";
import {Workshop} from "../Model";
import {API_URL} from "../Network";

export function useWorkshop(workshopKey: string): Workshop | undefined {
    const [workshop, setWorkshop] = React.useState<Workshop>();

    useEffect(() => {
        fetch(API_URL + "/workshop/" + workshopKey)
            .then(res => res.json())
            .then(
                (result) => setWorkshop(result),
                (error) => console.log(error)
            )
    }, [workshopKey])

    return workshop
}