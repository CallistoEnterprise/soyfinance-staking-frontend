import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    stakingToken: tokens.soy,
    earningToken: tokens.soy,
    contractAddress: {
      820: '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65',
      20729: '0x162C1De37339C61cd52aEC6CB29a0E502a5815AE',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '5',
    sortOrder: 1,
    isFinished: false,
  },
  // {
  //   sousId: 1,
  //   stakingToken: tokens.clo,
  //   earningToken: tokens.soy,
  //   contractAddress: {
  //     820: '0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a',
  //     20729: '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65',
  //   },
  //   poolCategory: PoolCategory.CLO,
  //   harvest: true,
  //   sortOrder: 999,
  //   tokenPerBlock: '5',
  // },
]

export default pools
