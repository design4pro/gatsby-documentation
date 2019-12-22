import { createStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import React, { Fragment } from 'react';
import config from '../../gatsby-config';
import NextPrevious from './NextPrevious';
import SEO from './Seo';
import { SwitchTheme, useTheme } from './theme';

const forcedNavOrder = config.siteMetadata.sidebar.forcedNavOrder;
const drawerWidth = 240;
const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    })
);

const Layout = props => {
    const {
        data: {
            allMdx,
            mdx,
            site: {
                siteMetadata: { docsLocation }
            }
        }
    } = props;
    const [theme] = useTheme();
    const classes = useStyles(theme);
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
        .map(slug => {
            if (slug) {
                const { node } = allMdx.edges.find(
                    ({ node }) => node.fields.slug === slug
                );

                return { title: node.fields.title, url: node.fields.slug };
            }
        });

    // meta tags
    const metaTitle = mdx.frontmatter.title;
    const metaDescription = mdx.frontmatter.description;
    let canonicalUrl = config.siteMetadata.siteUrl;
    canonicalUrl =
        config.pathPrefix !== '/'
            ? canonicalUrl + config.pathPrefix
            : canonicalUrl;
    canonicalUrl = canonicalUrl + mdx.fields.slug;

    return (
        <Fragment>
            <SEO
                title={metaTitle}
                description={metaDescription}
                canonicalUrl={canonicalUrl}
            />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.title}>
                        JIRA
                    </Typography>
                    <div>
                        <SwitchTheme />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
            ></Drawer>
            <Container fixed maxWidth="md">
                <h1 className={'title'}>{mdx.fields.title}</h1>
                <Link
                    className={'gitBtn'}
                    to={`${docsLocation}/${mdx.parent.relativePath}`}
                >
                    <img src="" alt={'Github logo'} /> Edit on GitHub
                </Link>
                <div className={'mainWrapper'}>
                    <MDXRenderer>{mdx.body}</MDXRenderer>
                </div>
                <div className={'addPaddTopBottom'}>
                    <NextPrevious nav={nav} />
                </div>
            </Container>
        </Fragment>
    );
};

export default Layout;
