import ActionTypes from "../types"

export const setTheme = theme => ({
  type: ActionTypes.SET_THEME,
  payload: { theme },
})
