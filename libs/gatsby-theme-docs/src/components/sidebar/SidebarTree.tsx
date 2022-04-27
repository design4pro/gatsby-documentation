import config from '@design4pro/gatsby-theme-docs-core/src/config';
import React, { Fragment, useState } from 'react';
import SidebarTreeNode from './SidebarTreeNode';

const calculateTreeData = (edges) => {
  const originalData = config.siteMetadata.sidebar.ignoreIndex
    ? edges.filter(
        ({
          node: {
            fields: { slug },
          },
        }) => slug !== '/'
      )
    : edges;

  const tree = originalData
    .sort((a, b) => (a.node.fields.slug > b.node.fields.slug ? 1 : -1))
    .reduce(
      (
        accu,
        {
          node: {
            fields: { slug, title },
            frontmatter: { navPosition, sidebarTitle },
          },
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
              title: sidebarTitle || title,
              items: [],
              position: navPosition || 100,
            };

            prevItems.push(tmp);
          }

          prevItems = tmp.items.sort((a, b) =>
            a.position > b.position ? 1 : -1
          );
        }

        if (slug === '/') {
          prevItems.push({
            url: slug,
            label: parts[parts.length - 1],
            title: sidebarTitle || title,
            items: [],
            position: navPosition || 100,
          });
        }

        accu.items.sort((a, b) => (a.position > b.position ? 1 : -1));

        return accu;
      },
      { items: [] }
    );

  return tree;
};

export const SidebarTree = (props) => {
  const { edges } = props;
  const [treeData] = useState(() => calculateTreeData(edges));
  const defaultCollapsed = {};
  treeData.items.forEach((item) => {
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
  const toggle = (url: string) => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url],
    });
  };

  return (
    <Fragment>
      {treeData.items.map((item) => (
        <SidebarTreeNode
          className={`firstLevel`}
          key={item.url}
          setCollapsed={toggle}
          collapsed={collapsed}
          {...item}
        />
      ))}
    </Fragment>
  );
};

export default SidebarTree;
