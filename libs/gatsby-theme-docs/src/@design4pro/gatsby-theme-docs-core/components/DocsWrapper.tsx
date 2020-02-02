import CoreDocsWrapper from '@design4pro/gatsby-theme-docs-core/src/components/DocsWrapper';
import { InferProps, node } from 'prop-types';
import React from 'react';
import { StoreProvider } from '../../../state';

export const DocsWrapper = (
  props: InferProps<typeof DocsWrapper.propTypes>
) => {
  const { children } = props;

  return (
    <StoreProvider>
      <CoreDocsWrapper {...props}>{children}</CoreDocsWrapper>
    </StoreProvider>
  );
};

DocsWrapper.propTypes = {
  children: node
};

export default DocsWrapper;
