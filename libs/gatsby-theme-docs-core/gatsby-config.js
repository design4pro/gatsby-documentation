const withDefaults = require(`./utils/default-options`);

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);

  const gatsbyRemarkPlugins = [
    `gatsby-remark-autolink-headers`,
    {
      resolve: `gatsby-remark-images`,
      options: {
        // should this be configurable by the end-user?
        maxWidth: 1380,
        linkImagesToOriginal: false
      }
    },
    `gatsby-remark-copy-linked-files`,
    `gatsby-remark-smartypants`
  ];

  return {
    siteMetadata: {
      title: `Gatsby Documentation`,
      description: `Minimal Gatsby Theme for documentation websites`,
      docsLocation: `https://github.com/design4pro/gatsby-theme-docs/tree/master/content`,
      siteUrl: `https://docs.design4.pro`,
      basePath: options.basePath || `/`,
      social: [
        {
          name: `Twitter`,
          url: `https://twitter.com/design4pro`
        },
        {
          name: `GitHub`,
          url: `https://github.com/design4pro`
        }
      ],
      header: {
        title: `Gatsby Documentation`,
        links: [{ text: 'Home', link: '/' }]
      },
      sidebar: {
        ignoreIndex: false
      }
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.contentPath || `content`,
          name: options.contentPath || `content`
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.assetPath || `static/assets`,
          name: options.assetPath || `static/assets`
        }
      },
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: gatsbyRemarkPlugins
        }
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: gatsbyRemarkPlugins
        }
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Gatsby Documentation Starter`,
          short_name: `GatsbyDocumentation`,
          start_url: `/`,
          background_color: `#ffffff`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon: `static/assets/gatsby-icon.png`
        }
      },
      `gatsby-plugin-offline`,
      // Add typescript stack into webpack
      `gatsby-plugin-typescript`,
      {
        resolve: 'gatsby-plugin-local-search',
        options: {
          // A unique name for the search index. This should be descriptive of
          // what the index contains. This is required.
          name: 'pages',

          // Set the search engine to create the index. This is required.
          // The following engines are supported: flexsearch, lunr
          engine: 'flexsearch',

          // Provide options to the engine. This is optional and only recommended
          // for advanced users.
          //
          // Note: Only the flexsearch engine supports options.
          engineOptions: 'speed',

          // GraphQL query used to fetch all data for the search index. This is
          // required.
          query: `
            {
              allMdx {
                nodes {
                  id
                  fields {
                    slug
                    title
                  }
                  rawBody
                }
              }
            }
          `,

          // Field used as the reference value for each document.
          // Default: 'id'.
          ref: 'id',

          // List of keys to index. The values of the keys are taken from the
          // normalizer function below.
          // Default: all fields
          index: ['title', 'body'],

          // List of keys to store and make available in your UI. The values of
          // the keys are taken from the normalizer function below.
          // Default: all fields
          store: ['id', 'slug', 'title'],

          // Function used to map the result from the GraphQL query. This should
          // return an array of items to index in the form of flat objects
          // containing properties to index. The objects must contain the `ref`
          // field above (default: 'id'). This is required.
          normalizer: ({ data }) =>
            data.allMdx.nodes.map(node => ({
              id: node.id,
              slug: node.fields.slug,
              title: node.fields.title,
              body: node.rawBody
            }))
        }
      }
    ].filter(Boolean)
  };
};
