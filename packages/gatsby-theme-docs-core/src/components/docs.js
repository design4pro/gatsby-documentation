import React from 'react';

export const Docs = ({ children }) => {
    return (
        <Fragment>
            <Viewport />
            {children}
        </Fragment>
    );
};

Docs.propTypes = {
    children: node
};

export default Docs;
