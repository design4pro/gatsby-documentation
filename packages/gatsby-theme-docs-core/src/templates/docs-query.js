import { graphql } from 'gatsby';
import DocsPage from '../components/docs';

export default DocsPage;

export const query = graphql`
    query DocsPageQuery($id: String!) {
        site {
            siteMetadata {
                title
                docsLocation
                siteUrl
            }
        }
        mdx(fields: { id: { eq: $id } }) {
            fields {
                id
                slug
                title
            }
            body
            tableOfContents
            parent {
                ... on File {
                    relativePath
                }
            }
            frontmatter {
                metaTitle
                metaDescription
            }
        }
        allMdx {
            edges {
                node {
                    fields {
                        slug
                        title
                    }
                }
            }
        }
    }
`;
