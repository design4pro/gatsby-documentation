import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useTheme } from 'hooks/use-theme';
import PropTypes from 'prop-types';
import React from 'react';
import CollapseOnScroll from './collapse-on-scroll';
import Content from './content';
import Header from './header';
import HideOnScroll from './hide-on-scroll';
import Sidebar from './sidebar';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        drawer: {
            width: theme.drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: theme.drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        toolbar: theme.mixins.toolbar
    })
);

export const Layout = props => {
    const { children } = props;
    const [theme] = useTheme();
    const classes = useStyles(theme);

    return (
        <div className={classes.root}>
            <HideOnScroll {...props}>
                <AppBar
                    position="fixed"
                    elevation={2}
                    square
                    className={classes.appBar}
                >
                    <Header />
                </AppBar>
            </HideOnScroll>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <CollapseOnScroll {...props}>
                    <div className={classes.toolbar} />
                </CollapseOnScroll>

                <Sidebar {...props} />
            </Drawer>
            <Container fixed className={classes.content}>
                <div className={classes.toolbar} />

                <Content {...props}>{children}</Content>
            </Container>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
