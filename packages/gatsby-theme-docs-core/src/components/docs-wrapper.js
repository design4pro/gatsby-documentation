import React, { Fragment } from 'react';
import { node } from 'prop-types';
import Viewport from './viewport';

export const DocsWrapper = ({ children }) => {
    return (
        <Fragment>
            <Viewport />
            {children}
        </Fragment>
    );
};

DocsWrapper.propTypes = {
    children: node
};

export default DocsWrapper;
