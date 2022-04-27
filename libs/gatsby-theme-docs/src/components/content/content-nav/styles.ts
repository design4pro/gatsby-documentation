import { styled } from '@mui/material/styles';

const PREFIX = 'ContentNav';
export const classes = {
  root: `${PREFIX}-root`,
  rootOne: `${PREFIX}-rootOne`,
  card: `${PREFIX}-card`,
  cardPrevious: `${PREFIX}-cardPrevious`,
  cardNext: `${PREFIX}-cardNext`,
  cardContent: `${PREFIX}-cardContent`,
  cardLink: `${PREFIX}-cardLink`,
  cardContentBodyPrevious: `${PREFIX}-cardContentBodyPrevious`,
  cardContentBodyNext: `${PREFIX}-cardContentBodyNext`,
  cardContentBodyTitle: `${PREFIX}-cardContentBodyTitle`,
};

export const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: 'auto',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateAreas: '"previous next"',
    gridTemplateColumns: '1fr 1fr',
    margin: 0,
    padding: 0,
    gridColumnGap: 24,
  },
  [`& .${classes.rootOne}`]: {
    gridTemplateColumns: '1fr',
  },
  [`& .${classes.card}`]: {
    color: theme.palette.text.tertiary,
    display: 'flex',
    position: 'relative',
    alignSelf: 'stretch',
    boxShadow: 'rgba(116, 129, 141, 0.1) 0px 3px 8px 0px',
    alignItems: 'center',
    justifySelf: 'stretch',
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.border.primary,
    borderImage: 'initial',
    margin: 0,
    padding: 0,
    borderRadius: 3,
    textDecoration: 'none',
    pageBreakInside: 'avoid',
    transition: 'border 250ms ease 0s',
    '&:hover': {
      color: theme.palette.text.quaternary,
      borderColor: theme.palette.border.primaryHover,
    },
  },
  [`& .${classes.cardPrevious}`]: {
    gridArea: 'previous / previous / previous / previous',
  },
  [`& .${classes.cardNext}`]: {
    gridArea: 'next / next / next / next',
  },
  [`& .${classes.cardContent}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  [`& .${classes.cardLink}`]: {
    display: 'flex',
    flex: 1,
  },
  [`& .${classes.cardContentBodyPrevious}`]: {
    paddingLeft: 16,
    textAlign: 'right',
  },
  [`& .${classes.cardContentBodyNext}`]: {
    paddingRight: 16,
  },
  [`& .${classes.cardContentBodyTitle}`]: {
    fontWeight: 500,
  },
}));
