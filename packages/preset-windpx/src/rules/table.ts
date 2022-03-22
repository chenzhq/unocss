import type { Rule } from '@unocss/core'
import type { Theme } from '@zhmu/unocss-preset-minipx'
import { handler as h } from '@zhmu/unocss-preset-minipx/utils'

export const tables: Rule<Theme>[] = [
  // displays
  ['inline-table', { display: 'inline-table' }],
  ['table', { display: 'table' }],
  ['table-caption', { display: 'table-caption' }],
  ['table-cell', { display: 'table-cell' }],
  ['table-column', { display: 'table-column' }],
  ['table-column-group', { display: 'table-column-group' }],
  ['table-footer-group', { display: 'table-footer-group' }],
  ['table-header-group', { display: 'table-header-group' }],
  ['table-row', { display: 'table-row' }],
  ['table-row-group', { display: 'table-row-group' }],

  // layouts
  ['border-collapse', { 'border-collapse': 'collapse' }],
  ['border-separate', { 'border-collapse': 'separate' }],
  [/^border-spacing-(.+)$/, ([, d], { theme }) => ({ 'border-spacing': theme.spacing?.[d] ?? h.bracket.cssvar.auto.fraction.px4(d) })],
  ['caption-top', { 'caption-side': 'top' }],
  ['caption-bottom', { 'caption-side': 'bottom' }],
  ['table-auto', { 'table-layout': 'auto' }],
  ['table-fixed', { 'table-layout': 'fixed' }],
  ['table-empty-cells-visible', { 'empty-cells': 'show' }],
  ['table-empty-cells-hidden', { 'empty-cells': 'hide' }],
]
