import { ChainId } from '@soy-libs/sdk2'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://clo-geth.0xinfra.com/',
  [ChainId.CLOTESTNET]: 'https://testnet-rpc.callisto.network',
}

export default NETWORK_URLS
