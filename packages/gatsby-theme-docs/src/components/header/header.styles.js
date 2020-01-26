import { darken } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Link } from 'components/ui/link';

export const Title = styled('div')(({ theme }) => ({
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
}));

export const TitleLink = styled(Link)(({ theme }) => ({
    textDecoration: `none`,
    color: theme.palette.text.primary
}));

export const ToolbarInner = styled('div')(({ theme }) => ({
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
}));

export const ToolbarLinks = styled('div')({
    height: `100%`,
    display: `flex`,
    overflowX: `overlay`,
    overflowY: `hidden`
});

export const LinkDiv = styled('div')({
    height: `100%`,
    display: `flex`,
    alignItems: `center`,
    whiteSpace: `nowrap`,
    borderTop: `3px solid transparent`,
    borderBottom: `3px solid transparent`
});

export const LinkTag = styled(Link)(({ theme }) => ({
    textDecoration: `none`,
    color: theme.palette.primary.main,
    fontWeight: '500',
    '&:hover': {
        color: darken(theme.palette.primary.main, theme.palette.tonalOffset)
    }
}));
