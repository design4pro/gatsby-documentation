import { styled } from './node_modules/@material-ui/core';
import OpenInNewIcon from './node_modules/@material-ui/icons/OpenInNew';
import UnfoldLessIcon from './node_modules/@material-ui/icons/UnfoldLess';
import UnfoldMoreIcon from './node_modules/@material-ui/icons/UnfoldMore';
import { Link } from './node_modules/components/ui/link';
import { withPrefix } from './node_modules/gatsby';
import { size } from './node_modules/polished';
import { array, bool, func, string } from './node_modules/prop-types';
import React, { Fragment, useEffect, useMemo, useState } from './node_modules/react';
import usePrevious from './node_modules/react-use/lib/usePrevious';
import Category from './category';

const StyledList = styled('ul')({
    marginLeft: 0,
    listStyle: 'none',
    marginBottom: 32
});

const listItemStyles = {
    color: 'inherit',
    ':hover': {
        // opacity: colors.hoverOpacity
    }
};

const StyledListItem = styled('li')({
    fontSize: '1rem',
    lineHeight: 1.5,
    marginBottom: '0.8125rem',
    a: {
        ...listItemStyles,
        textDecoration: 'none',
        '&.active': {
            pointerEvents: 'none'
        }
    }
});

const ExpandAll = styled('button')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    padding: '4px 0',
    border: 0,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1,
    background: 'none',
    outline: 'none',
    cursor: 'pointer',
    svg: {
        ...size(12),
        marginRight: 8
    }
});

const StyledOutlinkIcon = styled(OpenInNewIcon)(size(14), {
    verticalAlign: -1,
    marginLeft: 8
});

function getId(title) {
    return withPrefix(title);
}

function isPageSelected(path, pathname) {
    const [a, b] = [withPrefix(path), pathname].map(string =>
        string.replace(/\/$/, '')
    );
    return a === b;
}

function isCategorySelected({ path, pages }, pathname) {
    return path
        ? isPageSelected(path, pathname)
        : pages.some(page => isPageSelected(page.path, pathname));
}

function getSidebarState(contents, pathname) {
    const activeCategory = contents.find(category =>
        isCategorySelected(category, pathname)
    );
    if (activeCategory) {
        return { [getId(activeCategory.title)]: true };
    }

    return {};
}

export const SidebarNav = props => {
    const { pathname, contents } = props;
    const prevPathname = usePrevious(pathname);
    const [state, setState] = useState(getSidebarState(contents, pathname));

    const allExpanded = useMemo(
        () => contents.every(({ title }) => state[getId(title)]),
        [contents, state]
    );

    useEffect(() => {
        if (pathname !== prevPathname) {
            const category = contents.find(({ pages }) =>
                pages.find(page => isPageSelected(page.path, pathname))
            );
            if (category) {
                const id = getId(category.title);
                if (!state[id]) {
                    setState(prevState => ({
                        ...prevState,
                        [id]: true
                    }));
                }
            }
        }
    }, [contents, pathname, prevPathname, state, setState]);

    function toggleCategory(title) {
        setState(prevState => {
            const id = getId(title);
            const expanded = !prevState[id];

            if (props.onToggleCategory) {
                props.onToggleCategory(title, expanded);
            }

            return {
                ...prevState,
                [id]: expanded
            };
        });
    }

    function toggleAll() {
        const expanded = !allExpanded;
        setState(
            contents.reduce(
                (acc, { title }) => ({
                    ...acc,
                    [getId(title)]: expanded
                }),
                {}
            )
        );

        if (props.onToggleAll) {
            props.onToggleAll(expanded);
        }
    }

    return (
        <Fragment>
            {contents.map(({ title, path, pages }, index, array) => {
                const contents = (
                    <StyledList>
                        {pages.map(page => (
                            <StyledListItem key={page.path}>
                                {page.anchor ? (
                                    <a
                                        href={page.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {page.title}
                                        <StyledOutlinkIcon />
                                    </a>
                                ) : (
                                    <Link
                                        className={
                                            isPageSelected(
                                                page.path,
                                                props.pathname
                                            )
                                                ? 'active'
                                                : null
                                        }
                                        to={page.path}
                                        onClick={props.onLinkClick}
                                    >
                                        {page.title}
                                    </Link>
                                )}
                            </StyledListItem>
                        ))}
                    </StyledList>
                );

                if (!title) {
                    const Icon = allExpanded ? UnfoldLessIcon : UnfoldMoreIcon;
                    return (
                        <Fragment key="root">
                            {contents}
                            {array.length > 2 && (
                                <ExpandAll onClick={toggleAll}>
                                    <Icon />
                                    {allExpanded ? 'Collapse' : 'Expand'} all
                                </ExpandAll>
                            )}
                        </Fragment>
                    );
                }

                return (
                    <Category
                        key={title}
                        title={title}
                        path={path}
                        expanded={Boolean(
                            state[getId(title)] || props.alwaysExpanded
                        )}
                        active={isCategorySelected(
                            { pages, path },
                            props.pathname
                        )}
                        onClick={props.alwaysExpanded ? null : toggleCategory}
                    >
                        {contents}
                    </Category>
                );
            })}
        </Fragment>
    );
};

SidebarNav.propTypes = {
    alwaysExpanded: bool,
    contents: array.isRequired,
    pathname: string.isRequired,
    onToggleAll: func,
    onToggleCategory: func,
    onLinkClick: func
};

export default SidebarNav;
