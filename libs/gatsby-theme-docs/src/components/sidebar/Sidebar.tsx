import React from 'react';
import SidebarTree from './SidebarTree';
import useStyles from './styles';

export const Sidebar = props => {
  const classes = useStyles();

  const {
    pageContext: { versionEdges }
  } = props;

  return (
    <div className={classes.root}>
      <SidebarTree edges={versionEdges} />
    </div>
  );
};

export default Sidebar;
