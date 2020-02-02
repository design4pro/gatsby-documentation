import React from 'react';
import DocsWrapper from './components/DocsWrapper';

export default ({ element, props }) => (
  <DocsWrapper {...props}>{element}</DocsWrapper>
);
