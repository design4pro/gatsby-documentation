import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import Helmet from 'react-helmet';
import { useTheme } from '../../hooks/use-theme';
import { graphql, useStaticQuery } from 'gatsby';

const useStyles = makeStyles(theme => {
    return createStyles({
        body: {
            backgroundColor: '#F5F7F9',
            height: '100vh',
            '& > div': {
                height: '100%'
            },
            '& div[role="group"][tabindex]': {
                height: '100%'
            }
        },
        root: {
            height: '100%'
        },
        box: {
            backgroundColor: '#FFFFFF',
            boxShadow: '0 3px 8px 0 rgba(116, 129, 141, 0.1)',
            borderRadius: theme.shape.borderRadius
        }
    });
});

const NotFound = ({ data }) => {
    const {
        site: { siteMetadata }
    } = useStaticQuery(
        graphql`
            query notFoundQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );

    const [theme] = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Helmet>
                <body className={classes.body} />
            </Helmet>
            <Container maxWidth="sm">
                <Box className={classes.box}>
                    <Box py={2} px={4}>
                        <Typography variant="h5">
                            {siteMetadata.title}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box p={4}>
                        <Typography variant="h6">Page no found</Typography>
                        <Typography>
                            Sorry, but the page you were looking for could not
                            be found.
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
    );
};

export default NotFound;
