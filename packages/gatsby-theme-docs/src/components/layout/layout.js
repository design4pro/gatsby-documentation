import Content from 'components/content';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import CollapseOnScroll from 'components/ui/collapse-on-scroll';
import { ToolbarOffset } from 'components/ui/global';
import HideOnScroll from 'components/ui/hide-on-scroll';
import { node } from 'prop-types';
import React from 'react';
import { AppBar, Container, Drawer, FlexWrapper } from './layout.styles';

export const Layout = props => {
    const {
        children,
        location: { hash }
    } = props;

    return (
        <FlexWrapper>
            <HideOnScroll threshold={1} disableHysteresis={true}>
                <AppBar position="fixed" elevation={2} square>
                    <Header />
                </AppBar>
            </HideOnScroll>
            <Drawer variant="permanent">
                <CollapseOnScroll threshold={1} disableHysteresis={true}>
                    <ToolbarOffset />
                </CollapseOnScroll>

                <Sidebar {...props} />
            </Drawer>
            <Container fixed>
                <Content hash={hash} {...props}>
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
