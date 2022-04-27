import { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#eee',
    backgroundColor: '#2f2f2f',
  },
  styles: [
    {
      types: ['number', 'unit'],
      style: {
        color: '#fd9170', // 4
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
        color: '#c792ea', // 5
      },
    },
    {
      types: ['attr-name', 'builtin', 'class'],
      style: {
        color: '#ffcb6b', // 6
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
        color: '#a5e844', // 7
      },
    },
    {
      types: ['cdata', 'char', 'inserted', 'property'],
      style: {
        color: '#80cbc4', // 8
      },
    },
    {
      types: ['class-name', 'hexcode', 'regex'],
      style: {
        color: '#f2ff00', // 9
      },
    },
    {
      types: ['comment', 'doctype', 'prolog'],
      style: {
        color: '#616161', // 10
      },
    },
    {
      types: ['deleted'],
      style: {
        color: '#ff6666', // 11
      },
    },
    {
      types: ['operator', 'punctuation'],
      style: {
        color: '#89ddff', // 12
      },
    },
  ],
};

export default theme;
