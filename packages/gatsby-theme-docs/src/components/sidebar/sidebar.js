import React from 'react';
import SidebarTree from './sidebar-tree';
import useStyles from './sidebar.styles';

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
