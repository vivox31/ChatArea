import React, { createContext, useReducer } from 'react';
import refreshReducer from './reducer';
import { refreshApp } from './action';


const initialState = {
    refresh: false
};
const RefreshContext = createContext(initialState);

const RefreshContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(refreshReducer, initialState);

    const triggerRefresh = () => {
        dispatch(refreshApp());
    };

    return (
        <RefreshContext.Provider value={{ refresh:state.refresh, triggerRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};

export { RefreshContextProvider, RefreshContext };