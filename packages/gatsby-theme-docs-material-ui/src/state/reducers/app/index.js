import ActionTypes from '../../actions/types';
import { setTheme } from './theme';

export const AppReducers = {
    [ActionTypes.SET_THEME]: setTheme
};

export default AppReducers;
