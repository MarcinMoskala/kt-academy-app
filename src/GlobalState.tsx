import React, {useContext, useEffect} from "react";
import {User} from "./Model";
import initShowFab from "./initShowFab";

export type GlobalState = {
    user: User | null,
    setUser: (user: User | null) => void
}

export const GlobalStateContext = React.createContext<GlobalState>({
    user: null,
    setUser: () => {
    },
});

export function useGlobalState(): GlobalState {
    return useContext(GlobalStateContext);
}

export const GlobalStateWrapper = ({children}) => {
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        initShowFab(setUser)
    }, [])

    return <GlobalStateContext.Provider value={{user: user, setUser: setUser}}>
        {children}
    </GlobalStateContext.Provider>;
};