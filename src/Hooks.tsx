import React, {useEffect} from "react";
import {Challenge, User, Workshop, WorkshopSubmission} from "./Model";
import {useLang} from "./Translations";
import {
    requestChallenge,
    requestCurrentUser,
    requestUsersList,
    requestWorkshop,
    requestWorkshops,
    requestWorkshopSubmissionsList
} from "./Network";

export function useWorkshop(workshopKey: string): Workshop | undefined {
    const [workshop, setWorkshop] = React.useState<Workshop>();
    const lang = useLang()

    useEffect(() => {
        requestWorkshop(workshopKey, lang.key)
            .then(
                (result) => setWorkshop(result),
                (error) => console.log(error)
            )
    }, [workshopKey, lang.key])

    return workshop
}

export function useWorkshops(tag: string | null, trainer: string | null): Workshop[] | undefined {
    const [workshops, setWorkshops] = React.useState<Workshop[]>();
    const lang = useLang()

    useEffect(() => {
        requestWorkshops(lang.key, trainer, tag)
            .then(
                (result) => setWorkshops(result),
                (error) => console.log(error)
            )
    }, [lang.key, tag, trainer])

    return workshops
}

export function useUsersList(): User[] | undefined {
    const [usersList, setUsersList] = React.useState<User[]>();

    useEffect(() => {
        requestUsersList()
            .then(
                (result) => setUsersList(result),
                (error) => console.log(error)
            )
    }, [])

    return usersList
}

export function useWorkshopSubmissionsList(): WorkshopSubmission[] | undefined {
    const [submissions, setSubmissions] = React.useState<WorkshopSubmission[]>();

    useEffect(() => {
        requestWorkshopSubmissionsList()
            .then(
                (result) => setSubmissions(result),
                (error) => console.log(error)
            )
    }, [])

    return submissions
}

export function useUser(): User | undefined | null {
    const [user, setUser] = React.useState<User | null>();

    useEffect(() => {
        requestCurrentUser()
            .then(
                (result) => setUser(result),
                (error) => console.log(error)
            )
    }, [])

    return user
}

export function useChallenge(challengeKey: string): Challenge | undefined | null {
    const [challenge, setChallenge] = React.useState<Challenge | null>();

    useEffect(() => {
        requestChallenge(challengeKey)
            .then(
                (result) => setChallenge(result),
                (error) => console.log(error)
            )
    }, [])

    return challenge
}