import React, {useEffect, useState} from "react";
import {
    Challenge,
    Course,
    PageStatistics,
    RecommendationCollection,
    Statistics,
    User,
    Workshop,
    WorkshopSubmission
} from "./Model";
import {useLang} from "./Translations";
import {
    requestChallenge,
    requestCourse,
    requestCourses,
    requestCurrentUser, requestPageStatistics, requestStatistics,
    requestUsersList,
    requestVideoRecommendations,
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

export function useCourse(courseKey: string, user: User | null): Course | undefined | null {
    return useApiSingleData(() => requestCourse(courseKey), [courseKey, user])
}

export function useCourses(user: User | null): Course[] | undefined | null {
    return useApiSingleData(() => requestCourses(), [user])
}

export function useRecommendations(rating): RecommendationCollection | undefined | null {
    return useApiSingleData(() => requestVideoRecommendations(), [rating])
}

export function useStatistics(): Statistics | undefined | null {
    return useApiSingleData(() => requestStatistics(), [])
}

export function usePageStatistics(pageKey: string): PageStatistics | undefined | null {
    return useApiSingleData(() => requestPageStatistics(pageKey), [])
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

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<{ width?: number, height?: number }>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}