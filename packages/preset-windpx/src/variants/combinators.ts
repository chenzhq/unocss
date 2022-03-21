import type { Variant } from '@unocss/core'
import { variantMatcher } from '@zhmu/unocss-preset-minipx/utils'

export const variantCombinators: Variant[] = [
  variantMatcher('svg', input => `${input} svg`),
]
