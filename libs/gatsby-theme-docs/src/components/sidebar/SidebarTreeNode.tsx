import config from '@design4pro/gatsby-theme-docs-core/src/config';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from 'react';
import Link from '../ui/Link';

export const SidebarTreeNode = (props) => {
  const {
    className = '',
    depth = 0,
    setCollapsed,
    collapsed,
    url,
    label,
    title,
    items,
  } = props;
  const isCollapsed = collapsed[url];
  const Icon = isCollapsed ? KeyboardArrowRightIcon : KeyboardArrowDownIcon;
  const collapse = (e) => {
    e.preventDefault();
    setCollapsed(url);
  };
  const hasChildren = items.length !== 0;
  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }

  const isCatalog = label !== url.slice(1, -1) && hasChildren && !depth;
  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.pathPrefix + url);
  const calculatedClassName = `${className} ${
    isCatalog ? 'catalog' : ''
  } item ${active ? 'active' : ''} depth-${depth}`;

  let nextDepth = depth;

  if (hasChildren) {
    nextDepth = depth + 1;
  }

  return (
    <div className={calculatedClassName}>
      {title && !isCatalog && (
        <Link to={url}>
          <span className={'label'}>{title}</span>
          {hasChildren ? (
            <span
              onClick={collapse}
              aria-label="collapse"
              role="presentation"
              className={'collapser'}
            >
              <Icon />
            </span>
          ) : null}
        </Link>
      )}
      {isCatalog && (
        <span className={'catalog'}>{label.replace(`-`, ` `)}</span>
      )}
      {!isCollapsed && hasChildren ? (
        <div className={'hasChildren'}>
          {items.map((item) => (
            <SidebarTreeNode
              depth={nextDepth}
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SidebarTreeNode;
