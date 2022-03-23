export const baseSize = {
  'xs': '320px',
  'sm': '384px',
  'md': '448px',
  'lg': '512px',
  'xl': '576px',
  '2xl': '672px',
  '3xl': '768px',
  '4xl': '896px',
  '5xl': '1024px',
  '6xl': '1152px',
  '7xl': '1280px',
  'prose': '65ch',
}

export const width = {
  auto: 'auto',
  ...baseSize,
  screen: '100vw',
}

export const maxWidth = {
  none: 'none',
  ...baseSize,
  screen: '100vw',
}

export const height = {
  auto: 'auto',
  ...baseSize,
  screen: '100vh',
}

export const maxHeight = {
  none: 'none',
  ...baseSize,
  screen: '100vh',
}
