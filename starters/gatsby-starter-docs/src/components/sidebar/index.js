import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Tree from './tree';

const Sidebar = ({ data }) => {
    const { allMdx } = data;

    return (
        <ul>
            <Tree edges={allMdx.edges} />
        </ul>
    );
};

export default () => {
    const data = useStaticQuery(
        graphql`
            query SidebarQuery {
                allMdx {
                    edges {
                        node {
                            slug
                            title
                        }
                    }
                }
            }
        `
    );

    return <Sidebar data={data} />;
};
