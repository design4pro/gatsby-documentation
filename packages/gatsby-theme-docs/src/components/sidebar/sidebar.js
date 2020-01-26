import React from 'react';
import SidebarTree from './sidebar-tree';
import { SideBarDiv } from './sidebar.styles';

export const Sidebar = props => {
    console.log({ props });

    const {
        pageContext: { versionEdges }
    } = props;

    return (
        <SideBarDiv>
            <SidebarTree edges={versionEdges} />
        </SideBarDiv>
    );
};

export default Sidebar;
