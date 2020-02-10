import { makeStyles, Theme } from '@material-ui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    width: 'auto',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateAreas: '"previous next"',
    gridTemplateColumns: '1fr 1fr',
    margin: 0,
    padding: 0,
    gridColumnGap: 24
  },
  rootOne: {
    gridTemplateColumns: '1fr'
  },
  card: {
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
      borderColor: theme.palette.border.primaryHover
    }
  },
  cardPrevious: {
    gridArea: 'previous / previous / previous / previous'
  },
  cardNext: {
    gridArea: 'next / next / next / next'
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardLink: {
    display: 'flex',
    flex: 1
  },
  cardContentBodyPrevious: {
    paddingLeft: 16,
    textAlign: 'right'
  },
  cardContentBodyNext: {
    paddingRight: 16
  },
  cardContentBodyTitle: {
    fontWeight: 500
  }
}));
