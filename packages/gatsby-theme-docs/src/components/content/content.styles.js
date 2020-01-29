import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: 1200
    },
    mainContent: {
        flexGrow: 1,
        width: 0,
        maxWidth: 750
    },
    aside: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        width: 224,
        marginLeft: 'auto',
        paddingRight: 0,
        position: 'sticky',
        top: 0,
        // top: headerheight,
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    asideHeading: {
        color: theme.palette.text.secondary,
        paddingRight: '1rem',
        '& > *': {
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }
    }
}));
