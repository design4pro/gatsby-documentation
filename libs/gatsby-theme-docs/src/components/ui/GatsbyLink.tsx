import { Link as GatsbyLink } from 'gatsby';
import { InferProps, node, string } from 'prop-types';
import React, { forwardRef } from 'react';

const ALink = (props: InferProps<typeof ALink.propTypes>) => {
  const { to, children, innerRef, ...other } = props;
  return (
    <a href={to} ref={innerRef} {...other}>
      {children}
    </a>
  );
};

ALink.propTypes = {
  to: string,
  children: node
};

const Link = forwardRef(
  ({ to, activeClassName, partiallyActive, ...other }, ref) => {
    const internal = /^\/(?!\/)/.test(to);

    // Use Gatsby Link for internal links, and <a> for others
    if (internal) {
      const file = /\.[0-9a-z]+$/i.test(to);

      if (file) {
        return <ALink to={to} innerRef={ref} {...other} />;
      }

      return (
        <GatsbyLink
          to={to}
          activeClassName={activeClassName}
          partiallyActive={partiallyActive}
          innerRef={ref}
          {...other}
        />
      );
    }

    return <ALink to={to} innerRef={ref} {...other} />;
  }
);

Link.displayName = `Link`;

export default Link;
