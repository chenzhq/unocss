# unocss-preset-minipx

## Instructions
Fork from `@unocss/preset-mini`, change default unit to px.

### Changes From `@unocss/preset-mini`

1. theme: `fontSize`, `textIndent`, `textStrokeWidth`
2. theme: `spacing`, `borderRadius`
3. theme: `baseSize`, `(max-)widht/height`
4. border rule: `border-radius`
5. flex rule: `flex-basis`
6. grid rule: `grid-auto`, `grid-gap`
7. positon rule: `inset`, `postion(top, right, bottom, left)`
9. size rule: `width`, `height`, `inline-size`, `block-size`
10. transform rule: `transform-translate-(xyz)`
11. rule typography: `text-size(font-size)`, `leading(line-height)`, `tracking(letter-spacing)`, `word-spacing`, `indext(text-indent)`
12. spacing rule: `padding`, `margin`

The minimal preset for [UnoCSS](https://github.com/unocss/unocss).

## Installation

```bash
npm i -D @zhemu/unocss-preset-minipx
```

```ts
import presetMiniPx from '@zhemu/unocss-preset-minipx'

Unocss({
  presets: [
    presetMiniPx(),
  ],
})
```

## License

MIT License
