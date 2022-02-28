import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Trade anything. No registration, no hassle.',
  bodyText: 'Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.soyfinance.finance/',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'CLO', alt: 'CLO token' },
      { src: 'BTC', alt: 'BTC token' },
      { src: 'SOY', alt: 'SOY token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income with crypto.',
  bodyText: 'soyfinance makes it easy to make your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.soyfinance.finance/products/yield-farming',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'pie', alt: 'Pie chart' },
      { src: 'stonks', alt: 'Stocks chart' },
      { src: 'folder', alt: 'Folder with SOY token' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'SOY makes our world go round.',
  bodyText:
    'SOY token is at the heart of the soyfinance ecosystem. Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it!',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0xC9E0c4FB9f9C37d239C703BFB6DfE49C31361bd1',
    text: 'Buy SOY',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.soyfinance.finance/tokenomics/soy',
    text: 'Learn',
    external: true,
  },

  images: {
    path: '/images/home/soy/',
    attributes: [
      { src: 'bottom-right', alt: 'Small 3d polysafemoon' },
      { src: 'top-right', alt: 'Small 3d polysafemoon' },
      { src: 'coin', alt: 'SOY token' },
      { src: 'top-left', alt: 'Small 3d polysafemoon' },
    ],
  },
}
