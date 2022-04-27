import { CustomLink } from '@design4pro/gatsby-theme-docs-core';
import React from 'react';
import { CodeBlock } from './CodeBlock';

const preToCodeBlock = (preProps) => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props;

    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: match != null ? match[1] : '',
      ...props,
    };
  }
  return undefined;
};

export default {
  a: CustomLink,
  pre: (props) => {
    const preProps = preToCodeBlock(props);

    // if there's a codeString and some props, we passed the test
    if (props) {
      return <CodeBlock {...preProps} />;
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...props} />;
    }
  },
};
