import { InferProps, node } from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

export const Viewport = ({
  children
}: InferProps<typeof Viewport.propTypes>) => {
  return (
    <Helmet>
      {/* To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your <head> element. */}
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      {children}
    </Helmet>
  );
};

Viewport.propTypes = {
  children: node
};

export default Viewport;
