import type { Variant, VariantContext, VariantFunction } from '@unocss/core'
import type { Theme } from '../theme'
import { variantParentMatcher } from '../utils'

export const variantPrint: Variant = variantParentMatcher('print', '@media print')

export const variantCustomMedia: VariantFunction = (matcher, { theme }: VariantContext<Theme>) => {
  const match = matcher.match(/^media-([_\d\w]+)[:-]/)
  if (match) {
    const media = theme.media?.[match[1]] ?? `(--${match[1]})`
    return {
      matcher: matcher.slice(match[0].length),
      parent: `@media ${media}`,
    }
  }
}
