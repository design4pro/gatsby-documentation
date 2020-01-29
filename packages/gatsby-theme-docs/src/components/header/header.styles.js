import { darken } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
    title: {
        width: theme.drawerWidth - theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: theme.drawerWidth - theme.spacing(3)
        },
        position: `relative`,
        '&:after': {
            top: '50%',
            right: 0,
            height: '40px',
            content: `" "`,
            position: `absolute`,
            transform: 'translateY(-50%)',
            borderLeft: `1px solid ${theme.palette.divider}`
        }
    },
    titleLink: {
        textDecoration: `none`,
        color: theme.palette.text.primary
    },
    toolbarInner: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        }
    },
    toolbarLinks: {
        height: `100%`,
        display: `flex`,
        overflowX: `overlay`,
        overflowY: `hidden`
    },
    linkDiv: {
        height: `100%`,
        display: `flex`,
        alignItems: `center`,
        whiteSpace: `nowrap`,
        borderTop: `3px solid transparent`,
        borderBottom: `3px solid transparent`
    },
    link: {
        textDecoration: `none`,
        color: theme.palette.primary.main,
        fontWeight: '500',
        '&:hover': {
            color: darken(theme.palette.primary.main, theme.palette.tonalOffset)
        }
    }
}));
