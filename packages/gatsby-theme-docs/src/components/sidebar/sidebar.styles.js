import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
    root: {
        display: 'block',
        flexGrow: '1',
        paddingLeft: '24px',
        marginTop: '32px',
        overflowX: 'hidden',
        overflowY: 'overlay',
        '-webkit-overflow-scrolling': 'touch',
        '& .item': {
            '& a': {
                color: 'inherit',
                border: '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                padding: '7px 24px 7px 16px',
                position: 'relative',
                alignItems: 'center',
                borderRight: '0',
                marginBottom: '24px',
                textDecoration: 'none',
                fontWeight: '500',
                '&:hover': {
                    backgroundColor: theme.palette.action.background
                }
            }
        }
    }
}));
