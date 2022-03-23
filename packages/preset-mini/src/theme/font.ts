import type { Theme } from './types'

export const fontFamily = {
  sans: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ].join(','),
  serif: [
    'ui-serif',
    'Georgia',
    'Cambria',
    '"Times New Roman"',
    'Times',
    'serif',
  ].join(','),
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ].join(','),
}

export const fontSize: Theme['fontSize'] = {
  'xs': ['12px', '16px'],
  'sm': ['14px', '20px'],
  'base': ['16px', '24px'],
  'lg': ['18px', '28px'],
  'xl': ['20px', '28px'],
  '2xl': ['24px', '32px'],
  '3xl': ['30px', '36px'],
  '4xl': ['34px', '40px'],
  '5xl': ['48px', '1'],
  '6xl': ['60px', '1'],
  '7xl': ['72px', '1'],
  '8xl': ['96px', '1'],
  '9xl': ['128px', '1'],
}

export const textIndent: Theme['textIndent'] = {
  'DEFAULT': '24px',
  'xs': '8px',
  'sm': '16px',
  'md': '24px',
  'lg': '32px',
  'xl': '40px',
  '2xl': '48px',
  '3xl': '64px',
}

export const textStrokeWidth: Theme['textStrokeWidth'] = {
  DEFAULT: '24px',
  none: '0',
  sm: 'thin',
  md: 'medium',
  lg: 'thick',
}

export const textShadow: Theme['textShadow'] = {
  DEFAULT: ['0 0 1px rgba(0,0,0,0.2)', '0 0 1px rgba(1,0,5,0.1)'],
  none: '0 0 #0000',
  sm: '1px 1px 3px rgba(36,37,47,0.25)',
  md: ['0 1px 2px rgba(30,29,39,0.19)', '1px 2px 4px rgba(54,64,147,0.18)'],
  lg: ['3px 3px 6px rgba(0,0,0,0.26)', '0 0 5px rgba(15,3,86,0.22)'],
  xl: ['1px 1px 3px rgba(0,0,0,0.29)', '2px 4px 7px rgba(73,64,125,0.35)'],
}

export const lineHeight: Theme['lineHeight'] = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}

export const letterSpacing: Theme['letterSpacing'] = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

export const wordSpacing: Theme['wordSpacing'] = letterSpacing
