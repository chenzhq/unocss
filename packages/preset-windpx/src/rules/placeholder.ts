import type { Rule } from '@unocss/core'
import { colorResolver, handler as h } from '@zhmu/unocss-preset-minipx/utils'

export const placeholders: Rule[] = [
  // The prefix `$ ` is intentional. This rule is not to be matched directly from user-generated token.
  // See variants/placeholder.
  [/^\$ placeholder-(.+)$/, colorResolver('color', 'placeholder')],
  [/^\$ placeholder-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-placeholder-opacity': h.bracket.percent(opacity) })],
]
