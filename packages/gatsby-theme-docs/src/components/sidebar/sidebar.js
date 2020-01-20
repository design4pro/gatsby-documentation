import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import SidebarTree from './sidebar-tree';

export const Sidebar = () => {
    const { allMdx } = useStaticQuery(
        graphql`
            query SidebarQuery {
                allMdx {
                    edges {
                        node {
                            fields {
                                slug
                                title
                            }
                            frontmatter {
                                navPosition
                            }
                        }
                    }
                }
            }
        `
    );

    return (
        <ul>
            <SidebarTree edges={allMdx.edges} />
        </ul>
    );
};

export default Sidebar;
