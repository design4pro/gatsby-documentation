import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { bool, InferProps, node, number } from 'prop-types';
import React from 'react';

export const HideOnScroll = (
  props: InferProps<typeof HideOnScroll.propTypes>
) => {
  const { children, revert, disableHysteresis, threshold } = props;

  const trigger = useScrollTrigger({
    disableHysteresis,
    threshold,
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
  threshold: number,
};

export default HideOnScroll;
