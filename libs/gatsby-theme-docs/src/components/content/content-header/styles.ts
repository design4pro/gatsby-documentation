import { styled } from '@mui/material/styles';

const PREFIX = 'ContentHeader';
export const classes = {
  root: `${PREFIX}-root`,
  heading: `${PREFIX}-heading`,
};

export const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    marginBottom: 24,
  },
  [`& .${classes.heading}`]: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
}));
