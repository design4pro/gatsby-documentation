import React from 'react';

import DocsLayout from './components/docs-layout';

export default ({ element, props }) => {
    return <DocsLayout {...props}>{element}</DocsLayout>;
};
