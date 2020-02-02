import { InferProps, node } from 'prop-types';
import React, { useCallback } from 'react';
import isPlainObject from '../../utils/is-plain-object';
import reducers from '../reducers';
import StoreContext from './context';
import { useLocalStorageReducer } from './hooks';
import initialState from './initial-state';

export const asyncer = (dispatch: any, state: any) => (action: any) =>
  typeof action === 'function' ? action(dispatch, state) : dispatch(action);

export const StoreProvider = ({
  children
}: InferProps<typeof StoreProvider.propTypes>) => {
  const [state, dispatchRoot, writeError] = useLocalStorageReducer(
    'state',
    reducers,
    initialState,
    undefined
  );

  if (!isPlainObject(initialState)) {
    throw new Error('Provider Expected the initialState to be a PlainObject');
  }

  const dispatch = useCallback(asyncer(dispatchRoot, state), []);

  const value = { state, dispatch, writeError };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: node
};

export default StoreProvider;
