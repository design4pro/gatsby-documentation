module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Gatsby Documentation Starter`,
    author: `DESIGN4PRO`,
    description: `A starter documentation.`,
    siteUrl: `https://docs.design4.io/`,
    docsLocation: `https://github.com/design4pro/gatsby-documentation-starter/tree/master/content`,
    social: {
      twitter: `design4pro`,
    },
    sidebar: {
      forcedNavOrder: ["/introduction", "/codeblock"],
      collapsedNav: ["/codeblock"],
      links: [{ text: "DESIGN4PRO", link: "https://design4.io" }],
      frontline: false,
      ignoreIndex: true,
    },
  },
  plugins: [
    `gatsby-plugin-flow`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // eslint-disable-next-line no-undef
        path: `${__dirname}/content`,
        name: `docs`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
          },
        ],
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Documentation Starter`,
        short_name: `GatsbyDocumentation`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order
      // - Add the plugin
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
      // 'gatsby-plugin-styled-components',
    },
  ],
}
