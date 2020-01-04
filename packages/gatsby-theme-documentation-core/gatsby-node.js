const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const crypto = require(`crypto`);
const Debug = require(`debug`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { urlResolve } = require(`gatsby-core-utils`);

const debug = Debug(`gatsby-theme-documentation-core`);
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

exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes } = actions;

    createTypes(`interface DocsPage @nodeInterface {
        id: ID!
        title: String!
        body: String!
        slug: String!
        date: Date! @dateformat
        tags: [String]!
        keywords: [String]!
        excerpt: String!
    }`);

    createTypes(
        schema.buildObjectType({
            name: `MdxDocsPage`,
            fields: {
                id: { type: `ID!` },
                title: {
                    type: `String!`
                },
                slug: {
                    type: `String!`
                },
                date: { type: `Date!`, extensions: { dateformat: {} } },
                tags: { type: `[String]!` },
                keywords: { type: `[String]!` },
                excerpt: {
                    type: `String!`,
                    args: {
                        pruneLength: {
                            type: `Int`,
                            defaultValue: 140
                        }
                    },
                    resolve: mdxResolverPassthrough(`excerpt`)
                },
                body: {
                    type: `String!`,
                    resolve: mdxResolverPassthrough(`body`)
                }
            },
            interfaces: [`Node`, `DocsPage`]
        })
    );
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
    { node, actions, getNode, createNodeId },
    themeOptions
) => {
    const { createNode, createParentChildLink } = actions;
    const { contentPath, basePath } = withDefaults(themeOptions);

    // Make sure it's an MDX node
    if (node.internal.type !== `Mdx`) {
        return;
    }

    // Create source field (according to contentPath)
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;

    if (
        ['MarkdownRemark', 'Mdx'].includes(node.internal.type) &&
        source === contentPath
    ) {
        let slug;
        if (node.frontmatter.slug) {
            if (path.isAbsolute(node.frontmatter.slug)) {
                // absolute paths take precedence
                slug = node.frontmatter.slug;
            } else {
                // otherwise a relative slug gets turned into a sub path
                slug = urlResolve(basePath, node.frontmatter.slug);
            }
        } else {
            // otherwise use the filepath function from gatsby-source-filesystem
            const filePath = createFilePath({
                node: fileNode,
                getNode,
                basePath: contentPath
            });

            slug = urlResolve(basePath, filePath);
        }
        // normalize use of trailing slash
        slug = slug.replace(/\/*$/, `/`);
        const fieldData = {
            title: node.frontmatter.title,
            tags: node.frontmatter.tags || [],
            slug,
            date: node.frontmatter.date,
            keywords: node.frontmatter.keywords || [],
            frontmatter: node.frontmatter
        };

        const mdxDocsPageId = createNodeId(`${node.id} >>> MdxDocsPage`);
        await createNode({
            ...fieldData,
            // Required fields.
            id: mdxDocsPageId,
            parent: node.id,
            children: [],
            internal: {
                type: `MdxDocsPage`,
                contentDigest: crypto
                    .createHash(`md5`)
                    .update(JSON.stringify(fieldData))
                    .digest(`hex`),
                content: JSON.stringify(fieldData),
                description: `Mdx implementation of the DocsPage interface`
            }
        });
        createParentChildLink({ parent: node, child: getNode(mdxDocsPageId) });
    }
};

// These templates are simply data-fetching wrappers that import components
const DocsTemplate = require.resolve(`./src/templates/docs-query`);

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMdxDocsPage {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panic(result.errors);
    }

    // Create Docs and Doc pages.
    const { allMdxDocsPage } = result.data;
    const pages = allMdxDocsPage.edges;

    // Create a page for each Post
    pages.forEach(({ node }) => {
        createPage({
            path: node.slug ? node.slug : '/',
            component: DocsTemplate,
            context: {
                id: node.id
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
