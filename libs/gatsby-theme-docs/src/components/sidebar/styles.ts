import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'block',
    flexGrow: '1',
    paddingLeft: '24px',
    marginTop: '32px',
    overflowX: 'hidden',
    overflowY: 'overlay',
    '-webkit-overflow-scrolling': 'touch',
    '& .item': {
      '& a, & .catalog': {
        color: 'inherit',
        border: '1px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        padding: '6px 24px 5px 16px',
        position: 'relative',
        alignItems: 'center',
        borderRight: '0',
        textDecoration: 'none',
        fontWeight: '500',
        lineHeight: '1.75'
      },
      '& a': {
        '&:hover': {
          backgroundColor: theme.palette.action.background
        },
        '& .label': {
          flex: '1'
        },
        '& .collapser': {
          display: 'block',
          cursor: 'pointer',
          margin: '-5px',
          padding: '4px',
          lineHeight: '1',
          fontSize: '18px',
          color: theme.palette.text.tertiary,
          '&:hover': {
            color: theme.palette.text.quaternary
          }
        }
      },
      '&.active > a': {
        backgroundColor: 'white',
        borderColor: theme.palette.action.background,
        color: `${theme.palette.action.active} !important`,
        '&:hover': {
          backgroundColor: 'white'
        }
      },
      '&.firstLevel': {
        marginBottom: '24px'
      },
      '& .catalog': {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: '12px',
        letterSpacing: '1.2px',
        color: theme.palette.text.tertiary
      },
      '&:not(.catalog) .hasChildren': {
        position: 'relative',
        marginLeft: '16px',
        '&:before': {
          top: '0',
          left: '0',
          width: '1px',
          bottom: '0',
          content: '""',
          position: 'absolute',
          background: theme.palette.action.background
        },
        '& a': {
          color: theme.palette.text.tertiary
        }
      }
    }
  }
}));
