import ActionTypes from '../types';

export const setTheme = theme => ({
    mode: ActionTypes.SET_THEME,
    payload: { theme }
});
