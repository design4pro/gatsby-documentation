import { useContext, useReducer, useState } from 'react';
import StoreContext from './context';
import createUseStorageReducer from './reducer';
import createUseStorageState from './state';

const createUseReducer = storage => {
    if (storage) {
        return createUseStorageReducer(storage);
    }

    return (key, reducer, initializerArg, initializer) => {
        const [state, dispatch] = initializer
            ? useReducer(reducer, initializerArg, initializer)
            : useReducer(reducer, initializerArg);
        return [state, dispatch, undefined];
    };
};

const createUseState = storage => {
    if (storage) {
        return createUseStorageState(storage);
    }

    return (key, defaultState) => {
        const [state, setState] = useState(defaultState);
        return [state, setState, undefined];
    };
};

const getLocalStorage = () =>
    typeof localStorage === 'undefined' ? null : localStorage;
const getSessionStorage = () =>
    typeof sessionStorage === 'undefined' ? null : sessionStorage;

export const useLocalStorageState = createUseState(getLocalStorage());
export const useSessionStorageState = createUseState(getSessionStorage());
export const useLocalStorageReducer = createUseReducer(getLocalStorage());
export const useSessionStorageReducer = createUseReducer(getSessionStorage());

export const useStore = () => useContext(StoreContext);
