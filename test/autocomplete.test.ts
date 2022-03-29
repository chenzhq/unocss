import { createGenerator } from '@unocss/core'
import presetUno from '@unocss/preset-uno'
import { describe, expect, it } from 'vitest'
import { createAutocomplete, parseAutocomplete } from '@unocss/autocomplete'
import presetAttributify from '@unocss/preset-attributify'

const uno = createGenerator({
  presets: [
    presetAttributify(),
    presetUno(),
  ],
})

const ac = createAutocomplete(uno)

async function enumerateSuggestions(inputs: string[]) {
  return Object.fromEntries(await Promise.all(inputs.map(async input => [
    input,
    (await ac.suggest(input)).slice(0, 10).join(' '),
  ])))
}

const fixture = `
<div bg="blue-500">
  <div border="~ b-
</div>
`

describe('autocomplete', () => {
  it('should resolve autocomplete config', () => {
    expect(ac.templates.length).toBeGreaterThan(0)

    ac.templates.forEach((i) => {
      if (typeof i === 'string')
        parseAutocomplete(i, uno.config.theme)
    })
  })

  it('should work', async() => {
    expect((await ac.suggest('m-1'))[0])
      .toMatchInlineSnapshot('"m-1"')

    expect((await ac.suggest('invalid'))[0])
      .not.toBe('invalid')
  })

  it('should provide autocomplete', async() => {
    expect(
      await enumerateSuggestions([
        // sort this list in alphabetical order
        'border-r',
        'border',
        'fle',
        'font-',
        'leading-',
        'm-',
        'mx-',
        'text-r',
        'text-red-',
        'bg-',
        'bg-r',
        'v-',
        'align-',
        'outline-',
        'outline-offset-',
        'w-',
        'max-w-',
        'z-',
        'shadow-',
        'fill-',
        'origin-',
        'transition-',
        'font-',
        'keyframes-',
      ]),
    ).toMatchInlineSnapshot(`
      {
        "align-": "align-base align-baseline align-bottom align-btm align-mid align-middle align-sub align-super align-text-bottom align-text-top",
        "bg-": "bg-amber bg-auto bg-black bg-blend-color bg-blend-color-burn bg-blend-color-dodge bg-blend-darken bg-blend-difference bg-blend-exclusion bg-blend-hard-light",
        "bg-r": "bg-red bg-repeat bg-repeat-round bg-repeat-space bg-repeat-x bg-repeat-y bg-rose",
        "border": "border border-collapse border-dashed border-dotted border-double border-hidden border-none border-separate border-solid",
        "border-r": "border-r border-rd border-red border-rose border-rounded",
        "fill-": "fill-amber fill-black fill-blue fill-bluegray fill-blueGray fill-coolgray fill-coolGray fill-current fill-cyan fill-dark",
        "fle": "flex flex-1 flex-auto flex-col flex-col-reverse flex-initial flex-inline flex-none flex-nowrap flex-row",
        "font-": "font-100 font-200 font-300 font-400 font-500 font-600 font-700 font-800 font-900 font-black",
        "keyframes-": "keyframes-back-in-down keyframes-back-in-left keyframes-back-in-right keyframes-back-in-up keyframes-back-out-down keyframes-back-out-left keyframes-back-out-right keyframes-back-out-up keyframes-bounce keyframes-bounce-alt",
        "leading-": "leading-loose leading-none leading-normal leading-relaxed leading-snug leading-tight",
        "m-": "m-0 m-1 m-2 m-3 m-4 m-5 m-6 m-8 m-10 m-12",
        "max-w-": "max-w-2xl max-w-3xl max-w-4xl max-w-5xl max-w-6xl max-w-7xl max-w-auto max-w-lg max-w-md max-w-none",
        "mx-": "mx-0 mx-1 mx-2 mx-3 mx-4 mx-5 mx-6 mx-8 mx-10 mx-12",
        "origin-": "origin-b origin-bc origin-bl origin-bottom origin-bottom-center origin-bottom-left origin-bottom-right origin-br origin-c origin-cb",
        "outline-": "outline-amber outline-auto outline-black outline-blue outline-bluegray outline-blueGray outline-coolgray outline-coolGray outline-current outline-cyan",
        "outline-offset-": "outline-offset-0 outline-offset-1 outline-offset-2 outline-offset-3 outline-offset-4 outline-offset-5 outline-offset-6 outline-offset-8 outline-offset-10 outline-offset-12",
        "shadow-": "shadow-2xl shadow-amber shadow-black shadow-blue shadow-bluegray shadow-blueGray shadow-coolgray shadow-coolGray shadow-current shadow-cyan",
        "text-r": "text-red text-right text-rose",
        "text-red-": "text-red-1 text-red-2 text-red-3 text-red-4 text-red-5 text-red-6 text-red-7 text-red-8 text-red-9 text-red-50",
        "transition-": "transition-all transition-colors transition-none transition-opacity transition-shadow transition-transform",
        "v-": "v-base v-baseline v-bottom v-btm v-mid v-middle v-sub v-super v-text-bottom v-text-top",
        "w-": "w-2xl w-3xl w-4xl w-5xl w-6xl w-7xl w-auto w-lg w-md w-none",
        "z-": "z-0 z-1 z-2 z-3 z-4 z-5 z-6 z-8 z-10 z-12",
      }
    `)
  })

  it('should provide skip DEFAULT', async() => {
    expect((await ac.suggest('text-red-')))
      .toMatchInlineSnapshot(`
        [
          "text-red-1",
          "text-red-2",
          "text-red-3",
          "text-red-4",
          "text-red-5",
          "text-red-6",
          "text-red-7",
          "text-red-8",
          "text-red-9",
          "text-red-50",
          "text-red-100",
          "text-red-200",
          "text-red-300",
          "text-red-400",
          "text-red-500",
          "text-red-600",
          "text-red-700",
          "text-red-800",
          "text-red-900",
        ]
      `)
  })

  it('should provide variants', async() => {
    expect(await ac.suggest('lt-'))
      .toMatchInlineSnapshot(`
        [
          "lt-2xl:",
          "lt-lg:",
          "lt-md:",
          "lt-sm:",
          "lt-xl:",
        ]
      `)
  })

  it('should accept variants', async() => {
    expect(await ac.suggest('dark:md:m-'))
      .toMatchInlineSnapshot(`
        [
          "dark:md:m-0",
          "dark:md:m-1",
          "dark:md:m-2",
          "dark:md:m-3",
          "dark:md:m-4",
          "dark:md:m-5",
          "dark:md:m-6",
          "dark:md:m-8",
          "dark:md:m-10",
          "dark:md:m-12",
          "dark:md:m-24",
          "dark:md:m-36",
        ]
      `)
  })

  it('should skip single-pass variants', async() => {
    expect(await ac.suggest('dark:dar')).not.toContain('dark:')
    expect(await ac.suggest('active:fir')).toContain('active:first:')
  })

  it('should support extractors', async() => {
    const res = await ac.suggestInFile(fixture, 40)

    expect(res.suggestions.every(i => i[0].startsWith('border-'))).toBeTruthy()
    expect(res.suggestions.some(i => i[1].startsWith('border-'))).toBeFalsy()

    const replacement = res.resolveReplacement(res.suggestions[0][0])
    expect(replacement).toMatchInlineSnapshot(`
      {
        "end": 40,
        "replacement": "b-0",
        "start": 38,
      }
    `)

    expect(fixture.slice(0, replacement.start) + replacement.replacement + fixture.slice(replacement.end))
      .toMatchInlineSnapshot(`
      "
      <div bg=\\"blue-500\\">
        <div border=\\"~ b-0
      </div>
      "
    `)
  })
})
