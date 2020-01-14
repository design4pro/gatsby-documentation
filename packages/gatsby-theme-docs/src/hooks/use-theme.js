import { Actions, useStore } from 'state';

export const useTheme = () => {
    const { state, dispatch } = useStore();
    const { theme } = state;
    const setTheme = theme => dispatch(Actions.setTheme(theme));

    return [theme, setTheme];
};
