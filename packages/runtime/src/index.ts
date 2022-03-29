import type { UnoGenerator, UserConfig, UserConfigDefaults } from '@unocss/core'
import { createGenerator } from '@unocss/core'
import { autoPrefixer } from './utils'

export interface RuntimeOptions {
  /**
   * Default config of UnoCSS
   */
  defaults?: UserConfigDefaults
  /**
   * Enable css property auto prefixer
   * @default false
   */
  autoPrefix?: boolean
  /**
   * Callback to modify config
   */
  configResolved?: (config: UserConfig, defaults: UserConfigDefaults) => void
  /**
   * Callback when the runtime is ready. Returning false will prevent default extraction
   */
  ready?: (runtime: RuntimeContext) => false | any
}

export type RuntimeInspectorCallback = (element: Element) => boolean

export interface RuntimeContext {
  /**
   * The UnoCSS instance.
   *
   * @type {UnoGenerator}
   */
  uno: UnoGenerator

  /**
   * Run extractor on specified tokens
   *
   * @returns {Promise<void>}
   */
  extract: (tokens: string | string[]) => Promise<void>

  /**
   * Rerun extractor on the whole <body>, regardless of paused status or inspection limitation.
   *
   * @returns {Promise<void>}
   */
  extractAll: () => Promise<void>

  /**
   * Set/unset inspection callback to allow/ignore element to be extracted.
   *
   * @param {RuntimeInspectorCallback} [callback] - Callback to determine whether the element will be extracted.
   *
   * @returns {void}
   */
  inspect: (callback?: RuntimeInspectorCallback) => void

  /**
   * Pause/resume/toggle the runtime.
   *
   * @param {boolean} [state] - False or True respectively pause or resume the runtime. Undefined parameter toggles the pause/resume state.
   *
   * @returns {void}
   */
  toggleObserver: (state?: boolean) => void

  /**
   * The UnoCSS version.
   *
   * @type {string}
   */
  version: string
}

declare global {
  interface Window {
    __unocss?: UserConfig & { runtime?: RuntimeOptions }
    __unocss_runtime?: RuntimeContext
  }
}

export default function init(inlineConfig: RuntimeOptions = {}) {
  if (typeof window == 'undefined') {
    console.warn('@unocss/runtime been used in non-browser environment, skipped.')
    return
  }

  const config = window.__unocss || {}
  const runtime = config?.runtime
  const defaultConfig = Object.assign(inlineConfig.defaults || {}, runtime)
  if (runtime?.autoPrefix) {
    let postprocess = defaultConfig.postprocess
    if (!postprocess)
      postprocess = []
    if (!Array.isArray(postprocess))
      postprocess = [postprocess]
    postprocess.unshift(autoPrefixer(document.createElement('div').style))
    defaultConfig.postprocess = postprocess
  }

  runtime?.configResolved?.(config, defaultConfig)

  let styleElement: HTMLStyleElement | undefined
  let paused = true
  let inspector: RuntimeInspectorCallback | undefined

  const uno = createGenerator(config, defaultConfig)
  let tokens = new Set<string>()

  let _timer: number | undefined
  let _resolvers: Function[] = []
  const scheduleUpdate = () => new Promise((resolve) => {
    _resolvers.push(resolve)
    if (_timer != null)
      clearTimeout(_timer)
    _timer = setTimeout(() => updateStyle().then(() => {
      const resolvers = _resolvers
      _resolvers = []
      resolvers.forEach(r => r())
    }), 0) as any
  })

  function removeCloak(node: Node = document.body) {
    if (node.nodeType !== 1)
      return
    const el = node as Element
    if (el.hasAttribute('un-cloak'))
      el.removeAttribute('un-cloak')
    el.querySelectorAll('[un-cloak]').forEach((n) => {
      n.removeAttribute('un-cloak')
    })
  }

  async function updateStyle() {
    const result = await uno.generate(tokens)
    if (!styleElement) {
      styleElement = document.createElement('style')
      document.documentElement.prepend(styleElement)
    }
    styleElement.innerHTML = result.css
    tokens = result.matched
  }

  async function extract(str: string) {
    const tokenSize = tokens.size
    await uno.applyExtractors(str, undefined, tokens)
    if (tokenSize !== tokens.size)
      await scheduleUpdate()
  }

  async function extractAll() {
    const html = document.body && document.body.outerHTML
    if (html) {
      await extract(html)
      removeCloak()
    }
  }

  const mutationObserver = new MutationObserver((mutations) => {
    if (paused)
      return
    mutations.forEach(async(mutation) => {
      if (mutation.target.nodeType !== 1)
        return
      const target = mutation.target as Element
      if (target === styleElement)
        return
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(async(node) => {
          if (node.nodeType !== 1)
            return
          const el = node as Element
          if (inspector && !inspector(el))
            return
          await extract(el.outerHTML)
          removeCloak(el)
        })
      }
      else {
        if (inspector && !inspector(target))
          return
        if (mutation.attributeName !== 'un-cloak') {
          const attrs = Array.from(target.attributes)
            .map(i => i.value ? `${i.name}="${i.value}"` : i.name)
            .join(' ')
          const tag = `<${target.tagName.toLowerCase()} ${attrs}>`
          await extract(tag)
        }
        if (target.hasAttribute('un-cloak'))
          target.removeAttribute('un-cloak')
      }
    })
  })

  let observing = false
  function observe() {
    if (observing)
      return
    const target = document.documentElement || document.body
    if (!target)
      return
    mutationObserver.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
    })
    observing = true
  }

  function execute() {
    extractAll()
    observe()
  }

  function ready() {
    if (document.readyState === 'loading')
      window.addEventListener('DOMContentLoaded', execute)
    else
      execute()
  }

  const unoCssRuntime = window.__unocss_runtime = window.__unocss_runtime = {
    version: uno.version,
    uno,
    async extract(userTokens) {
      if (typeof userTokens !== 'string') {
        userTokens.forEach(t => tokens.add(t))
        userTokens = ''
      }
      await extract(userTokens)
    },
    extractAll,
    inspect(callback) {
      inspector = callback
    },
    toggleObserver(set) {
      if (set === undefined)
        paused = !paused
      else
        paused = !!set
      if (!observing && !paused)
        ready()
    },
  }

  if (runtime?.ready?.(unoCssRuntime) !== false) {
    paused = false
    ready()
  }
}
