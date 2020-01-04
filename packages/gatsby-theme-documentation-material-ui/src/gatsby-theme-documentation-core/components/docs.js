import { createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/use-theme';
import { getBrowserTheme } from '../../utils/browser-theme';
import theme from '../theme';

export const DocsPage = ({ location, data }) => {
    console.log({ location, data });

    // We keep the theme in app state
    let [themeType] = useTheme();

    if (themeType === 'auto') {
        themeType = getBrowserTheme();
    }

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme({
        palette: {
            type: themeType
        },
        ...theme(themeType)
    });

    return (
        <ThemeProvider theme={muiTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            docs.js
        </ThemeProvider>
    );
};

DocsPage.propTypes = {
    location: PropTypes.object,
    data: PropTypes.object
};

export default DocsPage;
