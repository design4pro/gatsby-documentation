import { styled } from '@mui/material/styles';

const PREFIX = 'Header';
export const classes = {
  root: `${PREFIX}-root`,
};

export const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'block',
    flexGrow: 1,
    paddingLeft: 24,
    marginTop: 32,
    overflowX: 'hidden',
    overflowY: 'overlay',
    '& .item': {
      '& a, & .catalog': {
        color: 'inherit',
        border: '1px solid transparent',
        cursor: 'pointer',
        display: 'flex',
        padding: '6px 24px 5px 16px',
        position: 'relative',
        alignItems: 'center',
        borderRight: 0,
        textDecoration: 'none',
        fontWeight: 500,
        lineHeight: 1.75,
      },
      '& a': {
        '&:hover': {
          backgroundColor: theme.palette.action.background,
        },
        '& .label': {
          flex: 1,
        },
        '& .collapser': {
          display: 'block',
          cursor: 'pointer',
          margin: -5,
          padding: 4,
          lineHeight: 1,
          fontSize: 18,
          color: theme.palette.text.tertiary,
          '&:hover': {
            color: theme.palette.text.quaternary,
          },
        },
      },
      '&.active > a': {
        backgroundColor: theme.palette.action.background,
        borderColor: theme.palette.action.background,
        color: theme.palette.action.active,
        '&:hover': {
          backgroundColor: theme.palette.action.background,
        },
      },
      '&.firstLevel': {
        marginBottom: 24,
      },
      '& .catalog': {
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: 1.2,
        color: theme.palette.text.tertiary,
      },
      '&:not(.catalog) .hasChildren': {
        position: 'relative',
        marginLeft: 16,
        '&:before': {
          top: 0,
          left: 0,
          width: 1,
          bottom: 0,
          content: '""',
          position: 'absolute',
          background: theme.palette.action.background,
        },
        '& a': {
          color: theme.palette.text.tertiary,
        },
      },
    },
  },
}));
