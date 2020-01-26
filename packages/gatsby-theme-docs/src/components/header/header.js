import { Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import {
    LinkDiv,
    LinkTag,
    Title,
    TitleLink,
    ToolbarInner,
    ToolbarLinks
} from './header.styles';
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
    const finalLink = header.link ? header.link : '/';

    return (
        <Toolbar>
            <Title>
                <TitleLink to={finalLink} color="inherit">
                    <Typography variant="h6">{header.title}</Typography>
                </TitleLink>
            </Title>
            <ToolbarInner>
                <ToolbarLinks>
                    {header.links.map((link, key) => {
                        if (link.link !== '' && link.text !== '') {
                            return (
                                <LinkDiv key={key}>
                                    <LinkTag
                                        to={link.link}
                                        target="_blank"
                                        rel="noopener"
                                        color="primary"
                                        variant="subtitle1"
                                    >
                                        {link.text}
                                    </LinkTag>
                                </LinkDiv>
                            );
                        }

                        return '';
                    })}
                </ToolbarLinks>
            </ToolbarInner>
            <div>
                <SwitchTheme />
            </div>
        </Toolbar>
    );
};

export default Header;
