module.exports = ({ root, siteName, subtitle, description, twitterHandle }) => {
    return {
        siteMetadata: {
            title: 'Gatsby Documentation',
            siteName,
            subtitle,
            description,
            twitterHandle
        },
        plugins: [
            {
                resolve: `gatsby-theme-documentation-core`,
                options: {
                    root
                }
            }
        ]
    };
};
