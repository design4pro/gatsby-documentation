import { useEffect, useReducer } from 'react';
import {
    useStorageListener,
    useStorageReader,
    useStorageWriter
} from './storage';

const INTERNAL_SET_ACTION_TYPE = Symbol('INTERNAL_SET_ACTION_TYPE');

const createInternalSetAction = payload => ({
    type: INTERNAL_SET_ACTION_TYPE,
    payload
});
const isInternalSetAction = action =>
    action && action.type === INTERNAL_SET_ACTION_TYPE;
const createStorageReducer = reducer => (prevState, action) =>
    isInternalSetAction(action) ? action.payload : reducer(prevState, action);
const createUseStorageReducer = storage => (
    key,
    reducer,
    initializerArg,
    initializer
) => {
    const storageReducer = createStorageReducer(reducer);
    const storageInitializerArg = useStorageReader(
        storage,
        key,
        initializerArg
    );
    const [state, dispatch] = initializer
        ? useReducer(storageReducer, storageInitializerArg, initializer)
        : useReducer(storageReducer, storageInitializerArg);

    const writeError = useStorageWriter(storage, key, state);
    useStorageListener(key, newValue => {
        dispatch(createInternalSetAction(newValue));
    });

    useEffect(() => {
        dispatch(
            createInternalSetAction(
                initializer
                    ? initializer(storageInitializerArg)
                    : storageInitializerArg
            )
        );
    }, [key, dispatch, initializer, storageInitializerArg]);

    return [state, dispatch, writeError];
};

export default createUseStorageReducer;
