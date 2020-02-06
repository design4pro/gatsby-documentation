import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default makeStyles(({ mixins }: Theme) => ({
  toolbarOffset: mixins.toolbar
}));
