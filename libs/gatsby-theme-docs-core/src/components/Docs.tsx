import { InferProps, node } from 'prop-types';
import React, { Fragment } from 'react';
import Viewport from './Viewport';

export const Docs = ({ children }: InferProps<typeof Docs.propTypes>) => {
  return (
    <Fragment>
      <Viewport />
      {children}
    </Fragment>
  );
};

Docs.propTypes = {
  children: node
};

export default Docs;
