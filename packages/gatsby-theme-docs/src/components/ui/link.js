import React from 'react';
import MuiLink from '@material-ui/core/Link';
import GastsbyLink from './gatsby-link';

export const Link = props => <MuiLink component={GastsbyLink} {...props} />;

export default Link;
