import { InferProps, shape, string } from 'prop-types';
import React from 'react';
import useStyles from './styles';

export const ContentHeader = (
  props: InferProps<typeof ContentHeader.propTypes>
) => {
  const {
    fields: { title, description }
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>{title}</h1>
      {description && <h3>{description}</h3>}
    </div>
  );
};

ContentHeader.propTypes = {
  fields: shape({
    title: string.isRequired,
    description: string
  })
};

export default ContentHeader;
