import { styled } from '@mui/material/styles';

const PREFIX = 'HeaderSearch';
export const classes = {
  inputWrapper: `${PREFIX}-inputWrapper`,
  inputContainer: `${PREFIX}-inputContainer`,
  listDrawer: `${PREFIX}-listDrawer`,
  list: `${PREFIX}-list`,
  listToolbar: `${PREFIX}-listToolbar`,
  resultList: `${PREFIX}-resultList`,
  resultLink: `${PREFIX}-resultLink`,
  resultListItem: `${PREFIX}-resultListItem`,
  resultInline: `${PREFIX}-resultInline`,
};

export const Root = styled('div')(({ theme }) => ({
  [`& .${classes.inputWrapper}`]: {
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
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  },
  [`& .${classes.inputContainer}`]: {
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
      boxSizing: 'border-box',
      fontWeight: 400,
      lineHeight: 1.625,
      borderRadius: 3,
      backgroundColor: theme.palette.action.background,
      '& input': {
        font: 'inherit',
        color: theme.palette.action.active,
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
          color: theme.palette.text.tertiary,
        },
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
        backgroundColor: 'transparent',
        '&.searchIcon': {
          order: -1,
        },
        '&.clearIcon': {
          color: theme.palette.text.tertiary,
          '&:hover': {
            color: theme.palette.text.quaternary,
          },
        },
      },
    },
  },
  [`& .${classes.listDrawer}`]: {
    '& .MuiDrawer-paper': {
      backgroundColor: 'white',
    },
  },
  [`& .${classes.list}`]: {
    width: 385,
  },
  [`& .${classes.listToolbar}`]: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [`& .${classes.resultList}`]: {
    width: '100%',
    paddingTop: 0,
  },
  [`& .${classes.resultLink}`]: {
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  [`& .${classes.resultListItem}`]: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  [`& .${classes.resultInline}`]: {
    display: 'inline',
  },
}));
