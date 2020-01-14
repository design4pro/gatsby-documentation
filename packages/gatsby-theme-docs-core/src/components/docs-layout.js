import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Viewport from './viewport';

export const DocsLayout = ({ children }) => {
    return (
        <Fragment>
            <Viewport />
            {children}
        </Fragment>
    );
};

DocsLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default DocsLayout;
