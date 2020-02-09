import { makeStyles, Theme } from '@material-ui/styles';

export default makeStyles((theme: Theme) => ({
  inputWrapper: {
    ...theme.mixins.toolbar,
    margin: 0,
    display: 'flex',
    padding: 0,
    position: 'relative',
    width: 224,
    alignItems: 'center',
    '&:before': {
      top: '50%',
      left: 0,
      height: 40,
      content: '" "',
      position: 'absolute',
      transform: 'translateY(-50%)',
      borderLeft: `1px solid ${theme.palette.divider}`
    }
  },
  inputContainer: {
    paddingLeft: 14,
    paddingRight: 16,
    width: '100%',
    '& label': {
      width: '100%',
      border: 'none',
      margin: 0,
      display: 'flex',
      outline: 'none',
      padding: 0,
      fontSize: 16,
      background: '#FFFFFF',
      boxSizing: 'border-box',
      fontWeight: 400,
      lineHeight: 1.625,
      borderRadius: 3,
      backgroundColor: 'white',
      '& input': {
        font: 'inherit',
        color: '#242A31',
        width: '100%',
        border: 'none',
        height: 38,
        margin: 0,
        resize: 'none',
        outline: 'none',
        padding: '0px 8px',
        background: 'transparent',
        boxSizing: 'border-box',
        textAlign: 'left',
        lineHeight: 'inherit',
        borderRadius: 3,
        '&::placeholder': {
          fontWeight: 500,
          color: theme.palette.text.tertiary
        }
      },
      '& button': {
        flex: '0 0 auto',
        color: '#242A31',
        margin: 0,
        padding: 0,
        border: 0,
        display: 'flex',
        alignItems: 'center',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        paddingLeft: 8,
        cursor: 'pointer',
        '&.searchIcon': {
          order: -1
        },
        '&.clearIcon': {
          color: theme.palette.text.tertiary,
          '&:hover': {
            color: theme.palette.text.quaternary
          }
        }
      }
    }
  },
  listDrawer: {
    '& .MuiDrawer-paper': {
      backgroundColor: 'white'
    }
  },
  list: {
    width: 385
  },
  listToolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  resultList: {
    width: '100%',
    paddingTop: 0
  },
  resultLink: {
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none'
    }
  },
  resultListItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.paper
    }
  },
  resultInline: {
    display: 'inline'
  }
}));
