import { graphql } from 'gatsby';
import DocsPage from '../components/docs';

export default DocsPage;

export const query = graphql`
    query DocsPageQuery($id: String!) {
        site {
            siteMetadata {
                title
                docsLocation
            }
        }
        mdxDocsPage(id: { eq: $id }) {
            id
            title
            slug
            body
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
        allDocsPage {
            edges {
                node {
                    slug
                    title
                }
            }
        }
    }
`;
