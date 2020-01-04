import React from 'react';
import PropTypes from 'prop-types';
import CoreDocsLayout from 'gatsby-theme-documentation-core/src/components/docs-layout';
import { StoreProvider } from '../../state';

export const DocsLayout = ({ children }) => {
    return (
        <StoreProvider>
            <CoreDocsLayout>{children}</CoreDocsLayout>
        </StoreProvider>
    );
};

DocsLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default DocsLayout;
