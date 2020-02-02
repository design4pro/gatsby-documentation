const getMql = () =>
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) ||
    undefined;

export const getBrowserTheme = () => {
    const mql = getMql();

    return mql && mql.matches ? 'dark' : 'light';
};

export const onBrowserThemeChanged = callback => {
    const mql = getMql();
    const mqlListener = e => callback(e.matches ? 'dark' : 'light');

    mql && mql.addListener(mqlListener);

    return () => mql && mql.removeListener(mqlListener);
};
