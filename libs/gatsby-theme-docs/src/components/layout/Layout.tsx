import { InferProps, node } from 'prop-types';
import React from 'react';
import Content from '../content';
import Header from '../header';
import Sidebar from '../sidebar';
import CollapseOnScroll from '../ui/CollapseOnScroll';
import HideOnScroll from '../ui/HideOnScroll';
import { AppBar, Container, Drawer, FlexWrapper } from './styles';
import { ToolbarOffset } from '../ui/global.styles';

export const Layout = (props: InferProps<typeof Layout.propTypes>) => {
  const {
    children,
    location: { hash },
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
          <ToolbarOffset></ToolbarOffset>
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
  children: node,
};

export default Layout;
