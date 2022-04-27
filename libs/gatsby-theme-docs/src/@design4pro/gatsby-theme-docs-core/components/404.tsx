import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

const PREFIX = 'Header';
const classes = {
  body: `${PREFIX}-body`,
  grid: `${PREFIX}-grid`,
  box: `${PREFIX}-box`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.body}`]: {
    backgroundColor: '#F5F7F9',
    height: '100vh',
    '& > div': {
      height: '100%',
    },
    '& div[role="group"][tabindex]': {
      height: '100%',
    },
  },
  [`& .${classes.grid}`]: {
    height: '100%',
  },
  [`& .${classes.box}`]: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 3px 8px 0 rgba(116, 129, 141, 0.1)',
  },
}));

const NotFound = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query NotFoundQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <Root>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.grid}
      >
        <Helmet>
          <body className={classes.body} />
        </Helmet>
        <Container maxWidth="sm">
          <Box className={classes.box}>
            <Box py={2} px={4}>
              <Typography variant="h5">{siteMetadata.title}</Typography>
            </Box>
            <Divider />
            <Box p={4}>
              <Typography variant="h6">Page no found</Typography>
              <Typography>
                Sorry, but the page you were looking for could not be found.
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="flex-end" py={2} px={4}>
              <Button href="/" variant="contained" color="primary">
                Back to front page
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Root>
  );
};

export default NotFound;
