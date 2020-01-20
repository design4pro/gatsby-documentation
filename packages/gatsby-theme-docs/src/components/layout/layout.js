import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Content from 'components/content';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import CollapseOnScroll from 'components/ui/collapse-on-scroll';
import HideOnScroll from 'components/ui/hide-on-scroll';
import { useTheme } from 'hooks/use-theme';
import { node } from 'prop-types';
import React, { useRef } from 'react';
import { useStyles, FlexWrapper } from './layout.styles';

export const Layout = props => {
    const { children } = props;
    const [theme] = useTheme();
    const classes = useStyles(theme);
    const mainRef = useRef(null);

    return (
        <FlexWrapper ref={mainRef} className={classes.root}>
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

                <Content mainRef={mainRef} {...props}>
                    {children}
                </Content>
            </Container>
        </FlexWrapper>
    );
};

Layout.propTypes = {
    children: node
};

export default Layout;
