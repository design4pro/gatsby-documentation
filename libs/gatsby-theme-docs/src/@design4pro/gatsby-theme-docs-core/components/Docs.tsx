import { CustomLinkContext } from '@design4pro/gatsby-theme-docs-core/src/components/mdx/CustomLink';
import { MDXProvider } from '@mdx-js/react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { InferProps, object } from 'prop-types';
import React, { useEffect } from 'react';
import Layout from '../../../components/layout';
import { Seo } from '../../../components/ui';
import { useTheme } from '../../../hooks/use-theme';
import { getBrowserTheme } from '../../../utils/browser-theme';
import components from './mdx/components';
import theme from './theme';

export const Docs = (props: InferProps<typeof Docs.propTypes>) => {
  const {
    data: {
      mdx,
      site: {
        pathPrefix,
        siteMetadata: { siteUrl },
      },
    },
  } = props;

  // SEO data
  const metaTitle = mdx ? mdx.frontmatter.metaTitle : undefined;
  const metaDescription = mdx ? mdx.frontmatter.metaDescription : undefined;
  let canonicalUrl = siteUrl;
  canonicalUrl = pathPrefix !== '/' ? canonicalUrl + pathPrefix : canonicalUrl;
  canonicalUrl = canonicalUrl + (mdx ? mdx.slug : undefined);

  // We keep the theme in app state
  let [themeType] = useTheme();

  if (themeType === 'auto') {
    themeType = getBrowserTheme();
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', themeType);
  }, [themeType]);

  // we generate a MUI-theme from state's theme object
  let muiTheme = createTheme({
    palette: {
      type: themeType,
    },
    ...theme(themeType),
  });
  muiTheme = responsiveFontSizes(muiTheme);

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
            siteUrl,
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
  location: object,
  data: object,
};

export default Docs;
