import Collapse from '@mui/material/Collapse';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { bool, InferProps, node, number } from 'prop-types';
import React from 'react';

export const CollapseOnScroll = (
  props: InferProps<typeof CollapseOnScroll.propTypes>
) => {
  const { children, revert, disableHysteresis, threshold } = props;

  const trigger = useScrollTrigger({
    disableHysteresis,
    threshold,
  });

  return <Collapse in={revert ? trigger : !trigger}>{children}</Collapse>;
};

CollapseOnScroll.propTypes = {
  children: node,
  revert: bool,
  disableHysteresis: bool,
  threshold: number,
};

export default CollapseOnScroll;
