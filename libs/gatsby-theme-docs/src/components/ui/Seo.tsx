import { graphql, useStaticQuery } from 'gatsby';
import { arrayOf, InferProps, object, string } from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
export const Seo = (props: InferProps<typeof Seo.propTypes>) => {
  const {
    description = ``,
    lang = `en`,
    meta = [],
    title,
    canonicalUrl
  } = props;
  const { site } = useStaticQuery(
    graphql`
      query seoQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(meta)}
    >
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

Seo.propTypes = {
  description: string,
  lang: string,
  meta: arrayOf(object),
  title: string,
  canonicalUrl: string
};

export default Seo;
