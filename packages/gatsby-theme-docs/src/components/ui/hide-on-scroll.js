import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React from 'react';

export const HideOnScroll = props => {
    const { children } = props;

    const trigger = useScrollTrigger();

    return (
        <Slide direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

export default HideOnScroll;
