import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { bool, node, number } from 'prop-types';
import React from 'react';

export const HideOnScroll = props => {
    const { children, revert, disableHysteresis, threshold } = props;

    const trigger = useScrollTrigger({
        disableHysteresis,
        threshold
    });

    return (
        <Slide appear={false} direction="down" in={revert ? trigger : !trigger}>
            {children}
        </Slide>
    );
};

HideOnScroll.propTypes = {
    children: node,
    revert: bool,
    disableHysteresis: bool,
    threshold: number
};

export default HideOnScroll;
