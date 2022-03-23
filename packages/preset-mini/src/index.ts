import type { Postprocessor, Preset, PresetOptions } from '@unocss/core'
import { rules } from './rules'
import type { Theme, ThemeAnimation } from './theme'
import { theme } from './theme'
import { variants } from './variants'
import { autocomplete } from './autocomplete'

export { theme, colors } from './theme'
export { parseColor } from './utils'
export { autocomplete } from './autocomplete'

export type { ThemeAnimation, Theme }

export interface PresetMiniOptions extends PresetOptions {
  /**
   * @default 'class'
   */
  dark?: 'class' | 'media'
  /**
   * @default false
   */
  attributifyPseudo?: Boolean
  /**
   * @default 'un-'
   */
  variablePrefix?: string
}

export const presetMini = (options: PresetMiniOptions = {}): Preset<Theme> => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false

  if (!theme.unit) theme.unit = { default: 'px4' }

  return {
    name: '@unocss/preset-mini',
    theme,
    rules,
    variants: variants(options),
    options,
    autocomplete,
    postprocess: options.variablePrefix && options.variablePrefix !== 'un-'
      ? VarPrefixPostprocessor(options.variablePrefix)
      : undefined,
  }
}

export default presetMini

function VarPrefixPostprocessor(prefix: string): Postprocessor {
  return (obj) => {
    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--un-/, `--${prefix}`)
      if (typeof i[1] === 'string')
        i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`)
    })
  }
}
