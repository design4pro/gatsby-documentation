import { navigate } from 'gatsby';
import { InferProps, string } from 'prop-types';
import React, { createContext, useContext } from 'react';

export const CustomLinkContext = createContext({});

export const CustomLink = (props: InferProps<typeof CustomLink.propTypes>) => {
  const { pathPrefix, siteUrl } = useContext(CustomLinkContext);

  const linkProps = { ...props };

  if (props.href) {
    if (props.href.startsWith('/')) {
      linkProps.onClick = function handleClick(event) {
        const href = event.target.getAttribute('href');

        if (href.startsWith('/')) {
          event.preventDefault();
          navigate(href.replace(pathPrefix, ''));
        }
      };
    } else if (!props.href.startsWith('#') && !props.href.startsWith(siteUrl)) {
      linkProps.target = '_blank';
      linkProps.rel = 'noopener noreferrer';
    }
  }

  return <a {...linkProps}>{linkProps.children}</a>;
};

CustomLink.propTypes = {
  href: string
};

export default CustomLink;
