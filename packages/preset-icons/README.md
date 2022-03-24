# @unocss/preset-icons

Use **any** icons with **Pure CSS** for [UnoCSS](https://github.com/unocss/unocss).

<blockquote>
<p>💡 Recommend reading - <br><a href="https://antfu.me/posts/icons-in-pure-css"><strong>Icons in Pure CSS</strong></a><br></p>
</blockquote>

Follow the following conventions to use the icons

- `<prefix><collection>-<icon>`
- `<prefix><collection>:<icon>`

For examples:

```html
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-ph-anchor-simple-thin" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-400" />
<!-- A large Vue logo -->
<div class="i-logos-vue text-3xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji of laugh, turns to tear on hovering -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

<img src="https://user-images.githubusercontent.com/11247099/136709053-31b4db79-eddc-4dc6-aa2d-388086332630.gif" height="100"><br><sup>This is powered by pure CSS</sup>

## Install

```bash
npm i -D @unocss/preset-icons @iconify-json/[the-collection-you-want]
```

We use [Iconify](https://iconify.design) as our data source of icons. You need to install the corresponding iconset in `devDependencies` by following the `@iconify-json/*` pattern. For example, `@iconify-json/mdi` for [Material Design Icons](https://materialdesignicons.com/), `@iconify-json/tabler` for [Tabler](https://tabler-icons.io/). You can refer to [Icônes](https://icones.js.org/) or [Iconify](https://icon-sets.iconify.design/) for all the collections available.

```ts
import presetIcons from '@unocss/preset-icons'

Unocss({
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
})
```

> 💡 You can also use this preset alone as a complement to your existing UI frameworks to have pure CSS icons!

If you prefer to install the all the icon sets available on Iconify at once (~130MB):

```bash
npm i -D @iconify/json
```

## Configuration

Refer to the [type definition](https://github.com/unocss/unocss/blob/main/packages/preset-icons/src/types.ts#L4) for all configurations avaliable.

### Extra Properties

You can provide the extra CSS properties to control the default behavior of the icons. The following is an example of make icons inlined by default:

```ts
presetIcons({
  extraProperties: {
    'display': 'inline-block',
    'vertical-align': 'middle',
    // ...
  },
})
```

## Modes Overriding

By default, this preset will choose the rendering modes automatically for each icon based on the icons' characteristics. You can read more in this [blog post](https://antfu.me/posts/icons-in-pure-css). In some cases, you may want to explicitly set the rendering modes for each icon.

- `?bg` for `background-img` - renders the icon as a background image
- `?mask` for `mask` - renders the icon as a mask image

for example, `vscode-icons:file-type-light-db`, an icon with colors that will be rendered as a background image. Use `vscode-icons:file-type-light-db?bg` to render it as a mask image and bypass it's colors.

## Configuring collections and icons resolvers

You can provide collections via `@iconify-json/[the-collection-you-want]`, `@iconify/json` or using your custom ones using `collections` option on your `UnoCSS` configuration.

### Browser

To load `iconify` collections you should use `@iconify-json/[the-collection-you-want]` and not `@iconify/json` since the `json` file is huge.
You will need to provide the `iconify` collections using `dynamic imports`, for example, on playground you have these collections:
```ts
presetIcons({
  collections: {
    carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
    mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default as any),
    logos: () => import('@iconify-json/logos/icons.json').then(i => i.default as any),
    twemoji: () => import('@iconify-json/twemoji/icons.json').then(i => i.default as any),
    ri: () => import('@iconify-json/ri/icons.json').then(i => i.default as any),
    tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default as any),
    uim: () => import('@iconify-json/uim/icons.json').then(i => i.default as any)
  }
})
```

You can also provide your own custom collections using [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L12) or [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L61), for example using `InlineCollection`:
```ts
UnoCss({
  presets: [
    presetIcons({
      collections: {
        custom: {
          circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
          /* ... */
        },
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
        /* ... */
      }
    })
  ]
})
```

and then, you can use it on your html: `<span class="i-custom:circle"></span>`

### Node.js

In `Node.js` the preset will search for the installed iconify dataset automatically and so you don't need to register the `iconify` collections.

You can also provide your own custom collections using also [CustomIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L12) or [InlineCollection](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/types.ts#L61).

Additionally, you can also use [FileSystemIconLoader](https://github.com/iconify/iconify/blob/master/packages/utils/src/loader/loaders.ts#L9) to load your custom icons from your file system. You will need to install `@iconify/utils` package as `dev dependency`.
```ts
// vite.config.ts
import { promises as fs } from 'fs'
// loader helpers
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

UnoCss({
  presets: [  
    presetIcons({
      collections: {
        // key as the collection name
        'my-icons': {
          'account': '<svg><!-- ... --></svg>',
          // load your custom icon lazily
          'settings': () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
          /* ... */
        },
        'my-other-icons': async (iconName) => {
          // your custom loader here. Do whatever you want.
          // for example, fetch from a remote server: 
          return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
        },
        // a helper to load icons from the file system
        // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
        // you can also provide a transform callback to change each icon (optional)
        'my-yet-other-icons': FileSystemIconLoader(
          './assets/icons',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    })
  ]
})
```

## Icon Customizations

You can customize all icons using `customizations` configuration option. 

Available customizations functions:
- `transform`: transform raw `svg`, will be only applied when using `custom` icon collection (`iconify` collections excluded).
- `customize`: change default icon customizations values.
- `iconCustomizer`: change default icon customizations values.

For each loaded icon, the customizations will be applied in this order:
- apply `transform` to raw `svg`, if provided and using custom icon collection
- apply `customize` with default customizations, if provided
- apply `iconCustomizer` with `customize` customizations, if provided

### Global Custom Icon Transformation

When loading your custom icons, you can transform them, for example adding `fill` attribute with `currentColor`:
```ts
UnoCss({
  presets: [
    presetIcons({
      customizations: {
        transform(svg) {
          return svg.replace(/^<svg /, '<svg fill="currentColor" ')  
        }
      }
    })
  ]
})
```

### Global Icon Customization

When loading any icon you can customize common properties to all of them, for example configuring the same size:
```ts
UnoCss({
  presets: [
    presetIcons({
      customizations: {
        customize(props) {
          props.width = '2em'
          props.height = '2em'
          return props
        }
      }
    })
  ]
})
```

### Icon/Collection Customization

You can customize each icon using `iconCustomizer` configuration option.

The `iconCustomizer` will take precedence over configuration.

The `iconCustomizer` will be applied to any collection, that is, for each icon from `custom` loader, `inlined` on `custom collections` or from `@iconify`.

For example, you can configure `iconCustomizer` to change all icons for a collection or individual icons on a collection:
```ts
UnoCss({
  presets: [
    presetIcons({
      customizations: {
        iconCustomizer(collection, icon, props) {
          // customize all icons in this collection  
          if (collection === 'my-other-icons') {
            props.width = '4em'
            props.height = '4em'
          }
          // customize this icon in this collection
          if (collection === 'my-icons' && icon === 'account') {
            props.width = '6em'
            props.height = '6em'
          }
          // customize this @iconify icon in this collection  
          if (collection === 'mdi' && icon === 'account') {
            props.width = '2em'
            props.height = '2em'
          }
        }
      }
    })
  ]
})    
```

## Credits

This preset is inspired from [this issue](https://github.com/antfu/unplugin-icons/issues/88) created by [@husayt](https://github.com/husayt). Based on the work of [this PR](https://github.com/antfu/unplugin-icons/pull/90) by [@userquin](https://github.com/userquin).

## License

MIT License © 2021-PRESENT [Anthony Fu](https://github.com/antfu)
