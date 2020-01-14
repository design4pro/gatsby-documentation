import { config } from '@design4pro/gatsby-theme-docs-core';
import { createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Layout from 'components/layout';
import Seo from 'components/seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useTheme } from 'hooks/use-theme';
import PropTypes from 'prop-types';
import React from 'react';
import { getBrowserTheme } from 'utils/browser-theme';
import theme from '../theme';

export const DocsPage = props => {
    const {
        data: { mdx }
    } = props;

    // SEO data
    const metaTitle = mdx ? mdx.frontmatter.metaTitle : undefined;
    const metaDescription = mdx ? mdx.frontmatter.metaDescription : undefined;
    let canonicalUrl = config.siteMetadata.siteUrl;
    canonicalUrl =
        config.basePath !== '/' ? canonicalUrl + config.basePath : canonicalUrl;
    canonicalUrl = canonicalUrl + (mdx ? mdx.slug : undefined);

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
            <Seo
                title={metaTitle}
                description={metaDescription}
                canonicalUrl={canonicalUrl}
            />
            <Layout {...props}>
                {mdx && <MDXRenderer>{mdx.body}</MDXRenderer>}
            </Layout>
        </ThemeProvider>
    );
};

DocsPage.propTypes = {
    location: PropTypes.object,
    data: PropTypes.object
};

export default DocsPage;
