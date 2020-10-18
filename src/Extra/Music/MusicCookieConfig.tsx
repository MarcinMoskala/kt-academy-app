import {useCookies} from "react-cookie";
import React, {Dispatch, SetStateAction} from "react";
import {useDidUpdateEffect} from "../../Utils";

export function useCookieState<T, S>(initialValue: T, setConfig: (config: S) => void, property: keyof S): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = React.useState<T>(initialValue);
    useDidUpdateEffect(() => {
        if (value != null) {
            const configChange = {[property]: value};
            // @ts-ignore
            setConfig(configChange)
        }
    }, [value])
    return [value, setValue]
}

export function useCookieMusicConfigState<T>(defaultValue: T, property: keyof CookieMusicConfig): [T, Dispatch<SetStateAction<T>>] {
    const {getConfig, setConfig} = useCookieMusicConfig()
    const initialConfig = getConfig()
    // @ts-ignore
    let value: T = initialConfig ? initialConfig[property] ?? defaultValue : defaultValue
    return useCookieState<T, CookieMusicConfig>(value, setConfig, property)
}

type CookieMusicConfig = {
    chosenVideo?: string,
    workTime?: number,
    breakTime?: number,
    volume?: number,
    totalSecPassed?: number,
}

function useCookieMusicConfig(): { getConfig: () => CookieMusicConfig, setConfig: (config: CookieMusicConfig) => void } {
    const [cookies, setCookie] = useCookies(['programming-music-config']);

    return {
        getConfig: () => cookies['programming-music-config'],
        setConfig: (value: CookieMusicConfig) => {
            const config = cookies['programming-music-config']
            setCookie('programming-music-config', {...config, ...value})
        }
    }
}