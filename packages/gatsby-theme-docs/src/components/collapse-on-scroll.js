import Collapse from '@material-ui/core/Collapse';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React from 'react';

export const CollapseOnScroll = props => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return <Collapse in={!trigger}>{children}</Collapse>;
};

export default CollapseOnScroll;
