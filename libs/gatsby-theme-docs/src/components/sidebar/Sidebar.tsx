import React from 'react';
import SidebarTree from './SidebarTree';
import { classes, Root } from './styles';

export const Sidebar = (props) => {
  const {
    pageContext: { versionEdges },
  } = props;

  return (
    <Root className={classes.root}>
      <SidebarTree edges={versionEdges} />
    </Root>
  );
};

export default Sidebar;
