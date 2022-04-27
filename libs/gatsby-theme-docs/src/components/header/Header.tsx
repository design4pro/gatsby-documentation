import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Link from '../ui/Link';
import SearchBar from './search';
import { classes, Root } from './styles';
import { SwitchTheme } from './SwitchTheme';

export const Header = () => {
  const {
    site: {
      siteMetadata: { header },
    },
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
    <Root>
      <Toolbar>
        <div className={classes.title}>
          <Link to={finalLink} color="inherit" className={classes.titleLink}>
            <Typography variant="h6">{header.title}</Typography>
          </Link>
        </div>
        <div className={classes.toolbarInner}>
          <div className={classes.toolbarLinks}>
            {header.links.map((link, key: string) => {
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
        <SearchBar />
      </Toolbar>
    </Root>
  );
};

export default Header;
