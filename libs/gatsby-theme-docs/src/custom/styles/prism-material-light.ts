import { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#90a4ae',
    backgroundColor: '#fafafa',
  },
  styles: [
    {
      types: ['number', 'unit'],
      style: {
        color: '#f76d47', // 4
      },
    },
    {
      types: [
        'atrule',
        'boolean',
        'constant',
        'entity',
        'function',
        'id',
        'important',
        'keyword',
        'selector',
        'symbol',
        'tag',
        'url',
        'variable',
      ],
      style: {
        color: '#7c4dff', // 5
      },
    },
    {
      types: ['attr-name', 'builtin', 'class'],
      style: {
        color: '#39adb5', // 6
      },
    },
    {
      types: [
        'attr-value',
        'attribute',
        'pseudo-class',
        'pseudo-element',
        'string',
      ],
      style: {
        color: '#f6a434', // 7
      },
    },
    {
      types: ['cdata', 'char', 'inserted', 'property'],
      style: {
        color: '#39adb5', // 8
      },
    },
    {
      types: ['class-name', 'hexcode', 'regex'],
      style: {
        color: '#6182b8', // 9
      },
    },
    {
      types: ['comment', 'doctype', 'prolog'],
      style: {
        color: '#aabfc9', // 10
      },
    },
    {
      types: ['deleted'],
      style: {
        color: '#e53935', // 11
      },
    },
    {
      types: ['operator', 'punctuation'],
      style: {
        color: '#39adb5', // 12
      },
    },
  ],
};

export default theme;
