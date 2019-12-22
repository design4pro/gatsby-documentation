import React from 'react';
import { graphql } from 'gatsby';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useTheme } from '../components/theme/use-theme';
import { getBrowserTheme } from '../utils/browser-theme';
import Layout from '../components/Layout';

const DocsPageTemplate = props => {
    let [theme] = useTheme();
    const { data, location, children } = props;

    if (!data) {
        return null;
    }

    if (theme === 'auto') {
        theme = getBrowserTheme();
    }

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme({
        palette: {
            type: theme
        }
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Layout location={location} data={data}>
                {children}
            </Layout>
        </ThemeProvider>
    );
};

export default DocsPageTemplate;

export const pageQuery = graphql`
    query($id: String!) {
        site {
            siteMetadata {
                title
                docsLocation
            }
        }
        mdx(fields: { id: { eq: $id } }) {
            fields {
                id
                title
                slug
            }
            body
            tableOfContents
            parent {
                ... on File {
                    relativePath
                }
            }
            frontmatter {
                metaTitle
                metaDescription
            }
        }
        allMdx {
            edges {
                node {
                    fields {
                        slug
                        title
                    }
                }
            }
        }
    }
`;
