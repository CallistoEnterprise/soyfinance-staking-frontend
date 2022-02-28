import { ChainId } from '@soy-libs/sdk2'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x8bA3D23241c7044bE703afAF2A728FdBc16f5F6f',
  [ChainId.CLOTESTNET]: '0xDd2742Ba146A57F1F6e8F47235024ba1bd0cf568',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
