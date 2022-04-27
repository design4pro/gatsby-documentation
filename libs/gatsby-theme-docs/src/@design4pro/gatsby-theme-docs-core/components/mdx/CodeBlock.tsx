import { alpha, styled } from '@mui/material/styles';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { useState } from 'react';
import prismDark from '../../../../custom/styles/prism-material-dark';
import prismLight from '../../../../custom/styles/prism-material-light';
import { useTheme } from '../../../../hooks/use-theme';
import { getBrowserTheme } from '../../../../utils/browser-theme';

const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const Button = styled('button')(({ theme }) => ({
  border: 'none',
  boxShadow: 'none',
  textDecoration: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '8px',
  padding: '8px 12px',
  background: alpha(theme.palette.grey[300], 0.22),
  borderRadius: '8px',
  cursor: 'pointer',
  color: theme.palette.grey[500],
  fontSize: '14px',
  fontFamily: 'sans-serif',
  lineHeight: '1',
  '&:hover': {
    background: alpha(theme.palette.grey[300], 1),
    color: theme.palette.grey[600],
  },
}));

export const CodeBlock = ({ codeString, language, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);

  // We keep the theme in app state
  let [themeType] = useTheme();

  if (themeType === 'auto') {
    themeType = getBrowserTheme();
  }

  const prismTheme = themeType === 'dark' ? prismDark : prismLight;

  console.log(prismTheme);

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: '2rem',
            position: 'relative',
          }}
        >
          <Button
            onClick={() => {
              copyToClipboard(codeString);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 3000);
            }}
          >
            {isCopied ? '🎉 Copied!' : 'Copy'}
          </Button>

          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} style={style}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
