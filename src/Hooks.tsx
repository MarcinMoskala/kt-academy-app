import React, {useEffect} from "react";
import {Challenge, Course, User, Workshop, WorkshopSubmission} from "./Model";
import {useLang} from "./Translations";
import {
    requestChallenge,
    requestCourse,
    requestCourses,
    requestCurrentUser,
    requestUsersList,
    requestWorkshop,
    requestWorkshops,
    requestWorkshopSubmissionsList
} from "./Network";

export function useWorkshop(workshopKey: string): Workshop | undefined | null {
    const lang = useLang()
    return useApiSingleData(() => requestWorkshop(workshopKey, lang.key), [workshopKey, lang.key])
}


export function useWorkshops(tag: string | null, trainer: string | null): Workshop[] | undefined | null {
    const lang = useLang()
    return useApiSingleData(() => requestWorkshops(lang.key, trainer, tag), [lang.key, trainer, tag])
}

export function useUsersList(): User[] | undefined | null {
    return useApiSingleData(() => requestUsersList())
}

export function useWorkshopSubmissionsList(): WorkshopSubmission[] | undefined | null {
    return useApiSingleData(() => requestWorkshopSubmissionsList())
}

export function useUser(): User | undefined | null {
    return useApiSingleData(() => requestCurrentUser())
}

export function useChallenge(challengeKey: string): Challenge | undefined | null {
    return useApiSingleData(() => requestChallenge(challengeKey), [challengeKey])
}

export function useCourse(courseKey: string): Course | undefined | null {
    return useApiSingleData(() => requestCourse(courseKey), [courseKey])
}

export function useCourses(): Course[] | undefined | null {
    return useApiSingleData(() => requestCourses())
}

export function useApiSingleData<T>(request: () => Promise<T>, deps: any[] = []): T | undefined | null {
    const [data, setData] = React.useState<T | null>();

    useEffect(() => {
        request()
            .then(
                (result) => setData(result),
                (error) => console.log(error)
            )
    }, deps)

    return data
}