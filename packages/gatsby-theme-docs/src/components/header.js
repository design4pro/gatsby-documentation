import { darken, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles } from '@material-ui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useTheme } from 'hooks/use-theme';
import { Link } from './link';
import { SwitchTheme } from './switch-theme';

const useStyles = makeStyles(theme =>
    createStyles({
        title: {
            width: theme.drawerWidth - theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                width: theme.drawerWidth - theme.spacing(3)
            },
            position: `relative`,
            '&:after': {
                top: '50%',
                right: 0,
                height: '40px',
                content: `" "`,
                position: `absolute`,
                transform: 'translateY(-50%)',
                borderLeft: `1px solid ${theme.palette.divider}`
            }
        },
        titleLink: {
            textDecoration: `none`,
            color: theme.palette.text.primary
        },
        inner: {
            flexGrow: 1,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3)
            },
            [theme.breakpoints.up('md')]: {
                paddingLeft: theme.spacing(4),
                paddingRight: theme.spacing(4)
            }
        },
        links: {
            height: `100%`,
            display: `flex`,
            overflowX: `overlay`,
            overflowY: `hidden`
        },
        link: {
            height: `100%`,
            display: `flex`,
            alignItems: `center`,
            whiteSpace: `nowrap`,
            borderTop: `3px solid transparent`,
            borderBottom: `3px solid transparent`
        },
        linkTag: {
            textDecoration: `none`,
            color: theme.palette.primary.main,
            fontWeight: '500',
            '&:hover': {
                color: darken(
                    theme.palette.primary.main,
                    theme.palette.tonalOffset
                )
            }
        }
    })
);

export const Header = () => {
    const {
        site: {
            siteMetadata: { header }
        }
    } = useStaticQuery(
        graphql`
            query HeaderQuery {
                site {
                    siteMetadata {
                        header {
                            title
                            links {
                                link
                                text
                            }
                        }
                    }
                }
            }
        `
    );

    const [theme] = useTheme();
    const classes = useStyles(theme);
    const finalLink = header.link ? header.link : '/';

    return (
        <Toolbar>
            <div className={classes.title}>
                <Link
                    to={finalLink}
                    color="inherit"
                    className={classes.titleLink}
                >
                    <Typography variant="h6">{header.title}</Typography>
                </Link>
            </div>
            <div className={classes.inner}>
                <div className={classes.links}>
                    {header.links.map((link, key) => {
                        if (link.link !== '' && link.text !== '') {
                            return (
                                <div key={key} className={classes.link}>
                                    <Link
                                        to={link.link}
                                        target="_blank"
                                        rel="noopener"
                                        color="primary"
                                        variant="subtitle1"
                                        className={classes.linkTag}
                                    >
                                        {link.text}
                                    </Link>
                                </div>
                            );
                        }

                        return '';
                    })}
                </div>
            </div>
            <div>
                <SwitchTheme />
            </div>
        </Toolbar>
    );
};

export default Header;
