import React from 'react';
import PropTypes from 'prop-types';
import CoreDocsLayout from '@design4pro/gatsby-theme-docs-core/src/components/docs-layout';
import { StoreProvider } from 'state';

export const DocsLayout = props => {
    const { children } = props;

    return (
        <StoreProvider>
            <CoreDocsLayout {...props}>{children}</CoreDocsLayout>
        </StoreProvider>
    );
};

DocsLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default DocsLayout;
