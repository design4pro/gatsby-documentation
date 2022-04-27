import { styled } from '@mui/material/styles';

const PREFIX = 'SectionNav';
export const classes = {
  listRoot: `${PREFIX}-list`,
  listItemRoot: `${PREFIX}-listItem`,
};

export const List = styled('div')(({ theme }) => ({
  [`&.${classes.listRoot}`]: {
    marginLeft: 0,
    marginBottom: 48,
    overflow: 'auto',
    position: 'relative',
    '&::before': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  },
}));

export const ListItem = styled('div')(({ theme, ...props }) => ({
  [`&.${classes.listItemRoot}`]: {
    marginTop: props.newSection ? `1rem` : 0,
    '& a': {
      display: 'block',
      color: props.active
        ? theme.palette.action.active
        : theme.palette.text.secondary,
      textDecoration: 'none',
      paddingTop: '4px',
      paddingRight: '1rem',
      paddingBottom: '4px',
      paddingLeft: props.depth > 2 ? `${Math.min(2, props.depth)}rem` : '1rem',
      position: 'relative',
      '&:hover': {
        color: theme.palette.action.hover,
      },
      '& > *': {
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '&::before': {
        content: '" "',
        display: props.active ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        borderLeft: '2px solid',
      },
    },
  },
}));
