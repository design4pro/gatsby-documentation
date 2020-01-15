import React from 'react';
import { node } from 'prop-types';
import CoreDocsWrapper from '@design4pro/gatsby-theme-docs-core/src/components/docs-wrapper';
import { StoreProvider } from 'state';

export const DocsWrapper = props => {
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
