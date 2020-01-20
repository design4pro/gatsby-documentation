import { config } from '@design4pro/gatsby-theme-docs-core';
import Link from 'components/ui/link';
import React from 'react';

export const SidebarTreeNode = props => {
    const {
        className = '',
        setCollapsed,
        collapsed,
        url,
        title,
        items
    } = props;
    const isCollapsed = collapsed[url];
    const collapse = () => {
        setCollapsed(url);
    };
    const hasChildren = items.length !== 0;
    let location;

    if (typeof document != 'undefined') {
        location = document.location;
    }

    const active =
        location &&
        (location.pathname === url ||
            location.pathname === config.pathPrefix + url);
    const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

    return (
        <li className={calculatedClassName}>
            {title && (
                <Link to={url}>
                    {title}
                    {!config.siteMetadata.sidebar.frontLine &&
                    title &&
                    hasChildren ? (
                        <button
                            onClick={collapse}
                            aria-label="collapse"
                            className="collapser"
                        >
                            {/* {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />} */}
                        </button>
                    ) : null}
                </Link>
            )}

            {!isCollapsed && hasChildren ? (
                <ul>
                    {items.map(item => (
                        <SidebarTreeNode
                            key={item.url}
                            setCollapsed={setCollapsed}
                            collapsed={collapsed}
                            {...item}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    );
};

export default SidebarTreeNode;
