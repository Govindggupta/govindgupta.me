import localFont from 'next/font/local'

export const cascadiaCode = localFont({
  src: [
    // Light (300)
    {
      path: '../../public/fonts/cascadia-code/CascadiaCode-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/cascadia-code/CascadiaCode-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    // Regular (400)
    {
      path: '../../public/fonts/cascadia-code/CascadiaCode.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/cascadia-code/CascadiaCodeItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    // SemiBold (600)
    {
      path: '../../public/fonts/cascadia-code/CascadiaCode-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/cascadia-code/CascadiaCode-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    // Bold (700)
    {
      path: '../../public/fonts/cascadia-code/CascadiaCode-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/cascadia-code/CascadiaCode-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-cascadia',
  display: 'swap',
})