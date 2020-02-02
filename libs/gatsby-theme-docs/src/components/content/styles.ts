import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme: Theme) => ({
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
  edit: {
    marginTop: 24,
    marginLeft: 0,
    overflow: 'auto',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      borderLeft: `1px solid ${theme.palette.divider}`
    },
    '& a': {
      color: '#242A31',
      cursor: 'pointer',
      margin: 0,
      display: 'flex',
      padding: '4px 16px',
      alignItems: 'center',
      paddingLeft: '1rem',
      verticalAlign: 'middle',
      textDecoration: 'none',
      fontWeight: '500',
      '& > svg': {
        marginRight: 8,
        fontSize: 18,
        color: theme.palette.text.tertiary
      },
      '&:hover': {
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
        textDecoration: 'none',
        '& > svg': {
          color: theme.palette.text.primary
        }
      }
    }
  },
  asideHeading: {
    paddingRight: '1rem',
    '& > *': {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '1.2px',
      color: theme.palette.text.tertiary
    }
  }
}));
