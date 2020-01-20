import { config } from '@design4pro/gatsby-theme-docs-core';
import React, { useState } from 'react';
import SidebarTreeNode from './sidebar-tree-node';

const calculateTreeData = edges => {
    const originalData = config.siteMetadata.sidebar.ignoreIndex
        ? edges.filter(
              ({
                  node: {
                      fields: { slug }
                  }
              }) => slug !== '/'
          )
        : edges;

    const tree = originalData.reduce(
        (
            accu,
            {
                node: {
                    fields: { slug, title },
                    frontmatter: { navPosition }
                }
            }
        ) => {
            const parts = slug.split('/');
            let { items: prevItems } = accu;

            for (const part of parts.slice(1, -1)) {
                let tmp = prevItems.find(({ label }) => label === part);

                if (tmp) {
                    if (!tmp.items) {
                        tmp.items = [];
                    }
                } else {
                    tmp = {
                        url: slug,
                        label: part,
                        items: [],
                        position: navPosition || 100
                    };
                    prevItems.push(tmp);
                }

                prevItems = tmp.items.sort((a, b) =>
                    a.position > b.position ? 1 : -1
                );
            }

            const existingItem = prevItems.find(
                ({ label }) => label === parts[parts.length - 1]
            );

            if (existingItem) {
                existingItem.url = slug;
                existingItem.title = title;
            } else {
                prevItems.push({
                    label: parts[parts.length - 1],
                    url: slug,
                    items: [],
                    title,
                    position: navPosition || 100
                });
            }

            accu.items.sort((a, b) => (a.position > b.position ? 1 : -1));

            return accu;
        },
        { items: [] }
    );

    return tree;
};

export const SidebarTree = props => {
    const { edges } = props;
    const [treeData] = useState(() => calculateTreeData(edges));

    const defaultCollapsed = {};
    treeData.items.forEach(item => {
        if (
            config.siteMetadata.sidebar.collapsedNav &&
            config.siteMetadata.sidebar.collapsedNav.includes(item.url)
        ) {
            defaultCollapsed[item.url] = true;
        } else {
            defaultCollapsed[item.url] = false;
        }
    });

    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const toggle = url => {
        setCollapsed({
            ...collapsed,
            [url]: !collapsed[url]
        });
    };

    return (
        <SidebarTreeNode
            className={`${
                config.siteMetadata.sidebar.frontLine
                    ? 'showFrontLine'
                    : 'hideFrontLine'
            } firstLevel`}
            setCollapsed={toggle}
            collapsed={collapsed}
            {...treeData}
        />
    );
};

export default SidebarTree;
