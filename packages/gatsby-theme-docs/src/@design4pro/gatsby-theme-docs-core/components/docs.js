import { CustomLinkContext } from '@design4pro/gatsby-theme-docs-core';
import { createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { MDXProvider } from '@mdx-js/react';
import Layout from 'components/layout';
import Seo from 'components/ui/seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useTheme } from 'hooks/use-theme';
import PropTypes from 'prop-types';
import React from 'react';
import { getBrowserTheme } from 'utils/browser-theme';
import theme from '../theme';
import components from './mdx/components';

export const Docs = props => {
    const {
        data: {
            mdx,
            site: {
                pathPrefix,
                siteMetadata: { siteUrl }
            }
        }
    } = props;

    console.log({ props });

    // SEO data
    const metaTitle = mdx ? mdx.frontmatter.metaTitle : undefined;
    const metaDescription = mdx ? mdx.frontmatter.metaDescription : undefined;
    let canonicalUrl = siteUrl;
    canonicalUrl =
        pathPrefix !== '/' ? canonicalUrl + pathPrefix : canonicalUrl;
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
                <CustomLinkContext.Provider
                    value={{
                        pathPrefix,
                        siteUrl
                    }}
                >
                    {mdx && (
                        <MDXProvider components={components}>
                            <MDXRenderer>{mdx.body}</MDXRenderer>
                        </MDXProvider>
                    )}
                </CustomLinkContext.Provider>
            </Layout>
        </ThemeProvider>
    );
};

Docs.propTypes = {
    location: PropTypes.object,
    data: PropTypes.object
};

export default Docs;
