const withDefaults = require(`./default-options`);

module.exports = themeOptions => {
    const options = withDefaults(themeOptions);

    const gatsbyRemarkPlugins = [
        {
            resolve: `gatsby-remark-images`,
            options: {
                // should this be configurable by the end-user?
                maxWidth: 1380,
                linkImagesToOriginal: false
            }
        },
        { resolve: `gatsby-remark-copy-linked-files` },
        { resolve: `gatsby-remark-smartypants` }
    ];

    return {
        pathPrefix: `/`,
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
                forcedNavOrder: []
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
                resolve: `gatsby-plugin-layout`,
                options: {
                    component: require.resolve(`./src/templates/docs-query.js`)
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
            `gatsby-plugin-offline`
        ].filter(Boolean)
    };
};
