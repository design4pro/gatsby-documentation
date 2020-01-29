import { Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'components/ui/link';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import useStyles from './header.styles';
import { SwitchTheme } from './switch-theme';

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
    const classes = useStyles();
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
            <div className={classes.toolbarInner}>
                <div className={classes.toolbarLinks}>
                    {header.links.map((link, key) => {
                        if (link.link !== '' && link.text !== '') {
                            return (
                                <div className={classes.linkDiv} key={key}>
                                    <Link
                                        to={link.link}
                                        target="_blank"
                                        rel="noopener"
                                        color="primary"
                                        variant="subtitle1"
                                        className={classes.link}
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
