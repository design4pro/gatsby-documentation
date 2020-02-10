import { makeStyles, Theme } from '@material-ui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    marginBottom: 24
  },
  heading: {
    '&:not(:last-child)': {
      marginBottom: 8
    }
  }
}));
