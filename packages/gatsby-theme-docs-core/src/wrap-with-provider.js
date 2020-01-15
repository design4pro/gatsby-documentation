import React from 'react';

import DocsWrapper from './components/docs-wrapper';

export default ({ element, props }) => (
    <DocsWrapper {...props}>{element}</DocsWrapper>
);
