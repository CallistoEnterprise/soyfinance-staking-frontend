import { Nft, NftSource, NftType } from './types'

export const IPFS_GATEWAY = 'https://cloudflare-ipfs.com'

export const nftSources: NftSource = {
  [NftType.SAFEMOON]: {
    address: {
      820: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
      20729: '0x60935F36e4631F73f0f407e68642144e07aC7f5E',
    },
    identifierKey: 'image',
  },
  [NftType.MIXIE]: {
    address: {
      820: '0xa251b5EAa9E67F2Bc8b33F33e20E91552Bf85566',
      20729: '',
    },
    identifierKey: 'image',
  },
}

/**
 * NOTE: https://cloudflare-ipfs.com does not support video streaming so for the video URLS we need to use
 * https://gateway.pinata.cloud
 */

const Nfts: Nft[] = [
  {
    name: 'Claire',
    description: 'Can Claire the clairvoyant see what’s in the cards for you?',
    images: {
      lg: 'claire-lg.png',
      md: 'claire-md.png',
      sm: 'claire-sm.png',
      ipfs: 'https://cloudflare-ipfs.com/ipfs/QmRa2WbGnqdgUzrYXxZWv549BDxq3heYridJeoWGcebcU8/claire.png',
    },
    sortOrder: 999,
    identifier: 'claire',
    type: NftType.SAFEMOON,
    variationId: 17,
  },
  {
    name: 'Syrup Soak',
    description: 'Ahh... what could be sweeter than a syrupy soak?',
    images: {
      lg: 'soak-lg.png',
      md: 'soak-md.png',
      sm: 'soak-sm.png',
      ipfs: 'https://cloudflare-ipfs.com/ipfs/QmW3zLfdQpw9vWpgcDyR2WM9A34tTWvvYyjKc3JjhtL68z/syrup-soak.png',
    },
    video: {
      webm: 'https://gateway.pinata.cloud/ipfs/QmW3zLfdQpw9vWpgcDyR2WM9A34tTWvvYyjKc3JjhtL68z/syrup-soak.webm',
      mp4: 'https://gateway.pinata.cloud/ipfs/QmW3zLfdQpw9vWpgcDyR2WM9A34tTWvvYyjKc3JjhtL68z/syrup-soak.mp4',
    },
    sortOrder: 999,
    identifier: 'syrup-soak',
    type: NftType.SAFEMOON,
    variationId: 16,
  }
]

export default Nfts
