import type { CSSEntries, Rule, RuleContext } from '@unocss/core'
import type { Theme } from '@zhmu/unocss-preset-minipx'
import { colorResolver, directionMap, handler as h } from '@zhmu/unocss-preset-minipx/utils'

export const divides: Rule[] = [
  // divides
  [/^divide-?([xy])$/, handlerDivide],
  [/^divide-?([xy])-?(-?.+)$/, handlerDivide],
  [/^divide-?([xy])-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],
  [/^divide-(block|inline)$/, handlerDivide],
  [/^divide-(block|inline)-(-?.+)$/, handlerDivide],
  [/^divide-(block|inline)-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],

  // color & opacity
  [/^divide-(.+)$/, colorResolver('border-color', 'divide')],
  [/^divide-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-divide-opacity': h.bracket.percent(opacity) })],

  // styles
  ['divide-solid', { 'border-style': 'solid' }],
  ['divide-dashed', { 'border-style': 'dashed' }],
  ['divide-dotted', { 'border-style': 'dotted' }],
  ['divide-double', { 'border-style': 'double' }],
  ['divide-none', { 'border-style': 'none' }],
]

function handlerDivide([, d, s]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  const v = theme.lineWidth?.[s || 'DEFAULT'] ?? h.bracket.cssvar.px(s || '1')
  if (v != null) {
    const results = directionMap[d].map((item): [string, string] => {
      const key = `border${item}-width`
      const value = item.endsWith('right') || item.endsWith('bottom')
        ? `calc(${v} * var(--un-divide-${d}-reverse))`
        : `calc(${v} * calc(1 - var(--un-divide-${d}-reverse)))`
      return [key, value]
    })

    if (results) {
      return [
        [`--un-divide-${d}-reverse`, 0],
        ...results,
      ]
    }
  }
}
