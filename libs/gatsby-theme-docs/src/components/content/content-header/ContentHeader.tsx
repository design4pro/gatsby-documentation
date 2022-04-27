import { InferProps, shape, string } from 'prop-types';
import React from 'react';
import { classes, Root } from './styles';

export const ContentHeader = (
  props: InferProps<typeof ContentHeader.propTypes>
) => {
  const {
    fields: { title, description },
  } = props;

  return (
    <Root className={classes.root}>
      <h1 className={classes.heading}>{title}</h1>
      {description && <h3>{description}</h3>}
    </Root>
  );
};

ContentHeader.propTypes = {
  fields: shape({
    title: string.isRequired,
    description: string,
  }),
};

export default ContentHeader;
