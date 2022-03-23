import type { Variant } from '@unocss/core'
import { variantMatcher } from '@zhmu/unocss-preset-mini/utils'

export const variantCombinators: Variant[] = [
  variantMatcher('svg', input => `${input} svg`),
]
