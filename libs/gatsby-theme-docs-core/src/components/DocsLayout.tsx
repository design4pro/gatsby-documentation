import { InferProps, node, object } from 'prop-types';
import React, { Fragment } from 'react';
import Docs from '../templates/Docs';

export const DocsLayout = (props: InferProps<typeof DocsLayout.propTypes>) => {
  const { children, pageContext } = props;

  if (pageContext && pageContext.layout === 'index') {
    return <Docs {...props}>{children}</Docs>;
  }

  return <Fragment {...props}>{children}</Fragment>;
};

DocsLayout.propTypes = {
  children: node,
  pageContext: object
};

export default DocsLayout;
