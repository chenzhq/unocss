# unocss-preset-minipx

## Instructions
Fork from @unocss/preset-mini, change default unit to px.

### Changes From `@unocss/preset-mini`

1. theme: fontSize, textIndent, textStrokeWidth
2. theme: spacing, borderRadius
3. theme: baseSize, (max-)widht/height
4. rule: border-radius
5. rule: flex-basis
6. rule: grid-gap
7. rule: grid-auto
8. rule: inset, postion(top, right, bottom, left)
9. rule: width, height, inline-size, block-size
10. rule: transform-translate
11. rule: text-size(font-size)
12. rule: padding, margin

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
