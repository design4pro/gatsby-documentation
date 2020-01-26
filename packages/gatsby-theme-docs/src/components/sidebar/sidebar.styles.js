import { styled } from '@material-ui/core';

export const SideBarDiv = styled('div')(({ theme }) => ({
    display: 'block',
    flexGrow: '1',
    overflowX: 'hidden',
    overflowY: 'overlay',
    '-webkit-overflow-scrolling': 'touch'
}));
