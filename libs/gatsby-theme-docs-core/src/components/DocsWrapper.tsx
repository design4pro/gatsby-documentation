import { InferProps, node } from 'prop-types';
import React, { Fragment } from 'react';
import { DocsLayout } from './DocsLayout';
import Viewport from './Viewport';

export const DocsWrapper = ({
  children
}: InferProps<typeof DocsWrapper.propTypes>) => {
  return (
    <Fragment>
      <Viewport />
      <DocsLayout>{children}</DocsLayout>
    </Fragment>
  );
};

DocsWrapper.propTypes = {
  children: node
};

export default DocsWrapper;
