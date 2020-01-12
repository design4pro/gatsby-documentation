const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const crypto = require(`crypto`);
const Debug = require(`debug`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { urlResolve } = require(`gatsby-core-utils`);

const debug = Debug(`gatsby-theme-docs`);
const withDefaults = require(`./default-options`);

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

const mdxResolverPassthrough = fieldName => async (
    source,
    args,
    context,
    info
) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
        id: source.parent
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
        fieldName
    });
    return result;
};

// exports.createSchemaCustomization = ({ actions, schema }) => {
//     const { createTypes } = actions;

//     createTypes(`
//         interface DocsPage @nodeInterface {
//             id: ID!
//             title: String!
//             body: String!
//             slug: String!
//             date: Date! @dateformat
//             tags: [String]!
//             keywords: [String]!
//             excerpt: String!
//         }
//     `);

//     createTypes(`
//         type Site implements Node @infer {
//             siteMetadata: SiteSiteMetadata!
//         }

//         type SiteSiteMetadata {
//             title: String!
//             description: String!
//             docsLocation: String
//         }
//     `);

//     createTypes(`
//         type File implements Node @infer {
//             childMarkdownRemark: MarkdownRemark
//         }
//         type MarkdownRemark implements Node @infer {
//             frontmatter: MarkdownRemarkFrontmatter
//             fields: MarkdownRemarkFields
//         }
//         type MarkdownRemarkFields {
//             image: String
//             version: String
//             slug: String
//             graphManagerUrl: String
//         }
//         type MarkdownRemarkFrontmatter {
//             title: String
//             subtitle: String
//             description: String
//         }
//     `);

//     createTypes(
//         schema.buildObjectType({
//             name: `MdxDocsPage`,
//             fields: {
//                 id: { type: `ID!` },
//                 title: {
//                     type: `String!`
//                 },
//                 slug: {
//                     type: `String!`
//                 },
//                 date: { type: `Date!`, extensions: { dateformat: {} } },
//                 tags: { type: `[String]!` },
//                 keywords: { type: `[String]!` },
//                 excerpt: {
//                     type: `String!`,
//                     args: {
//                         pruneLength: {
//                             type: `Int`,
//                             defaultValue: 140
//                         }
//                     },
//                     resolve: mdxResolverPassthrough(`excerpt`)
//                 },
//                 body: {
//                     type: `String!`,
//                     resolve: mdxResolverPassthrough(`body`)
//                 },
//                 relativePath: {
//                     type: `String`
//                 },
//                 headings: {
//                     type: `[MarkdownHeading!]`,
//                     args: {
//                         depth: {
//                             type: `MarkdownHeadingLevels`
//                         }
//                     },
//                     resolve: mdxResolverPassthrough(`headings`)
//                 }
//             },
//             interfaces: [`Node`, `DocsPage`]
//         })
//     );
// };

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

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        }
    });
};
