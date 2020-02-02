import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme: Theme) => ({
  searchInputWrapper: {
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
      '& i': {
        flex: '0 0 auto',
        color: '#242A31',
        order: -1,
        margin: 0,
        display: 'flex',
        padding: 0,
        alignItems: 'center',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        paddingLeft: 8
      }
    }
  },
  list: {
    width: 385
  }
}));
