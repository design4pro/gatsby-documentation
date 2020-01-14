const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const Debug = require('debug');

const debug = Debug('gatsby-theme-docs');
const withDefaults = require('./default-options');

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
    const { program } = store.getState();
    const { contentPath, assetPath } = withDefaults(themeOptions);

    const dirs = [
        path.join(program.directory, contentPath),
        path.join(program.directory, assetPath)
    ];

    dirs.forEach(dir => {
        debug(`Initializing ${dir} directory`);

        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    });
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
        const parent = getNode(node.parent);
        let value = parent.relativePath.replace(parent.ext, '');

        if (value === 'index') {
            value = '';
        }

        createNodeField({
            name: `slug`,
            node,
            value: `/${value}`
        });

        createNodeField({
            name: 'id',
            node,
            value: node.id
        });

        createNodeField({
            name: 'title',
            node,
            value: node.frontmatter.title
        });
    }
};

// These templates are simply data-fetching wrappers that import components
const DocsTemplate = require.resolve(`./src/templates/docs-query`);

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMdx {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        tableOfContents
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panic(result.errors);
    }

    // Create Docs and Doc pages.
    const { allMdx } = result.data;
    const pages = allMdx.edges;

    // Create a page for each Doc page
    pages.forEach(({ node }, index) => {
        const previous = index === pages.length - 1 ? null : pages[index + 1];
        const next = index === 0 ? null : pages[index - 1];

        createPage({
            path: node.fields.slug ? node.fields.slug : '/',
            component: DocsTemplate,
            context: {
                ...node,
                previous,
                next
            }
        });
    });
};

// Webpack feature for aliasing in your import statements, just import this plugin
// and all of your folders inside your src will be available with aliases.
//
// ```js
// import "styles/layout.css"
// import Header from "components/Header"
// ```
//
// Instead of
//
// ```js
// import "../../styles/layout.css"
// import Header from "../components/Header/index.js"
// ```
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        }
    });
};
