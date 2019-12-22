const path = require(`path`)
const { startCase } = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allMdx {
            edges {
              node {
                fields {
                  id
                }
                tableOfContents
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors) // eslint-disable-line no-console
        reject(result.errors)
      }

      result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug ? node.fields.slug : "/",
          component: path.resolve(`./src/templates/docs.js`),
          context: {
            id: node.fields.id,
          },
        })
      })

      resolve()
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    let value = parent.relativePath.replace(parent.ext, "")

    if (value === "index") {
      value = ""
    }

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`,
    })

    createNodeField({
      name: "id",
      node,
      value: node.id,
    })

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title || startCase(parent.name),
    })
  }
}
