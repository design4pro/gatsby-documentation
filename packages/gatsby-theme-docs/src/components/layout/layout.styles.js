import { createStyles, makeStyles, styled } from '@material-ui/styles';

export const useStyles = makeStyles(theme =>
    createStyles({
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

export const FlexWrapper = styled('div')({
    display: 'flex'
});

export const Main = styled('main')({
    flexGrow: 1,
    outline: 'none',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch'
});
