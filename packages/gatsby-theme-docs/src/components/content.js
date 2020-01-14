import { config } from '@design4pro/gatsby-theme-docs-core';
import { Link } from 'gatsby';
import React, { Fragment } from 'react';
import NextPrevious from './next-previous';

const Content = props => {
    const {
        children,
        data: {
            allMdx,
            mdx,
            site: {
                siteMetadata: { docsLocation }
            }
        }
    } = props;

    const forcedNavOrder = config.siteMetadata.sidebar.forcedNavOrder;

    const navItems = allMdx.edges
        .map(({ node }) => node.fields.slug)
        .filter(slug => slug !== '/')
        .sort()
        .reduce(
            (acc, cur) => {
                if (forcedNavOrder.find(url => url === cur)) {
                    return { ...acc, [cur]: [cur] };
                }

                const prefix = cur.split('/')[1];

                if (
                    prefix &&
                    forcedNavOrder.find(url => url === `/${prefix}`)
                ) {
                    return {
                        ...acc,
                        [`/${prefix}`]: [...acc[`/${prefix}`], cur]
                    };
                } else {
                    return { ...acc, items: [...acc.items, cur] };
                }
            },
            { items: [] }
        );

    const nav = forcedNavOrder
        .reduce((acc, cur) => {
            return acc.concat(navItems[cur]);
        }, [])
        .concat(navItems.items)
        // eslint-disable-next-line array-callback-return
        .map(slug => {
            if (slug) {
                const { node } = allMdx.edges.find(
                    ({ node }) => node.fields.slug === slug
                );

                return { title: node.fields.title, url: node.fields.slug };
            }
        });

    return (
        <Fragment>
            <h1>{mdx.title}</h1>

            {mdx.parent.relativePath && (
                <Link
                    className={'gitBtn'}
                    to={`${docsLocation}/${mdx.parent.relativePath}`}
                >
                    <img src="" alt={'Github logo'} /> Edit on GitHub
                </Link>
            )}

            <div>{children}</div>
            <div>
                <NextPrevious docsPage={mdx} nav={nav} />
            </div>
            <pre>{JSON.stringify(props.data, null, 2)}</pre>
        </Fragment>
    );
};

export default Content;