import { default as AppBarUi } from '@mui/material/AppBar';
import { default as ContainerUi } from '@mui/material/Container';
import { default as DrawerUi } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

export const AppBar = styled(AppBarUi)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Drawer = styled(DrawerUi)(({ theme }) => ({
  width: theme.drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.drawerWidth,
  },
}));

export const Container = styled(ContainerUi)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

export const FlexWrapper = styled('div')({
  display: 'flex',
});

export const Main = styled('main')({
  flexGrow: 1,
  outline: 'none',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
});
