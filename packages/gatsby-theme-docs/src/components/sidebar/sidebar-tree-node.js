import { config } from '@design4pro/gatsby-theme-docs-core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'components/ui/link';
import React from 'react';

export const SidebarTreeNode = props => {
    console.log({ props });

    const {
        className = '',
        setCollapsed,
        collapsed,
        url,
        title,
        items
    } = props;
    const isCollapsed = collapsed[url];
    const Icon = isCollapsed ? ExpandMoreIcon : ExpandLessIcon;
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
    console.log({ title, items, hasChildren });

    return (
        <div className={calculatedClassName}>
            {title && (
                <Link to={url}>
                    {title}-{!!hasChildren}-
                    {hasChildren ? (
                        <button
                            onClick={collapse}
                            aria-label="collapse"
                            className="collapser"
                        >
                            <Icon />d
                        </button>
                    ) : null}
                </Link>
            )}
            {!isCollapsed && hasChildren ? (
                <div>
                    {items.map(item => (
                        <SidebarTreeNode
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
