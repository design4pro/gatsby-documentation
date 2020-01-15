import { node, object } from 'prop-types';
import React, { Fragment } from 'react';
import Docs from '../templates/docs';

export const DocsLayout = props => {
    const { children, pageContext } = props;

    if (pageContext.layout === 'index') {
        return <Docs {...props}>{children}</Docs>;
    }

    return <Fragment {...props}>{children}</Fragment>;
};

DocsLayout.propTypes = {
    children: node,
    pageContext: object
};

export default DocsLayout;
