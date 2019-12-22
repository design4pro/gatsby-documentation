import PropTypes from "prop-types"
import React, { Children, useCallback } from "react"
import isPlainObject from "../../utils/is-plain-object"
import reducers from "../reducers"
import StoreContext from "./context"
import { useLocalStorageReducer } from "./hooks"
import initialState from "./initial-state"

export const asyncer = (dispatch, state) => action =>
  typeof action === "function" ? action(dispatch, state) : dispatch(action)

export const StoreProvider = ({ children }) => {
  const [state, dispatchRoot, writeError] = useLocalStorageReducer(
    "state",
    reducers,
    initialState
  )

  if (!isPlainObject(initialState)) {
    throw new Error("Provider Expected the initialState to be a PlainObject")
  }

  const dispatch = useCallback(asyncer(dispatchRoot, state), [])

  const value = { state, dispatch, writeError }

  return (
    <StoreContext.Provider value={value}>
      {Children.only(children)}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default StoreProvider
