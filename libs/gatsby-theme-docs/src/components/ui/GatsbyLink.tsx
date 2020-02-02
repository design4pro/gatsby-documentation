import { Link as GatsbyLink } from 'gatsby';
import React, { forwardRef } from 'react';

const ALink = ({ to, children, innerRef, ...other }) => (
  <a href={to} ref={innerRef} {...other}>
    {children}
  </a>
);

const Link = forwardRef(
  ({ to, activeClassName, partiallyActive, ...other }, ref) => {
    const internal = /^\/(?!\/)/.test(to);

    // Use Gatsby Link for internal links, and <a> for others
    if (internal) {
      const file = /\.[0-9a-z]+$/i.test(to);

      if (file) {
        return <ALink href={to} innerRef={ref} {...other} />;
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

    return <ALink href={to} innerRef={ref} {...other} />;
  }
);

Link.displayName = `Link`;

export default Link;
