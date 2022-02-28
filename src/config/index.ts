import { ChainId } from '@soy-libs/sdk2'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const CALLISTO_BLOCK_TIME = 2.2

export const BASE_CALLISTO_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://explorer.callisto.network',
  [ChainId.CLOTESTNET]: 'https://testnet-explorer.callisto.network',
}

// SOY_PER_BLOCK details
// 40 SOY is minted per block
// 20 SOY per block is sent to Burn pool (A farm just for burning SOY)
// 10 SOY per block goes to SOY pool
// 9 SOY per block goes to Yield farms and lottery
// SOY_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// SOY/Block in src/views/Home/components/CakeDataRow.tsx = 19 (40 - Amount sent to burn pool)
export const SOY_PER_BLOCK = new BigNumber(5)
export const BLOCKS_PER_YEAR = new BigNumber((60 / CALLISTO_BLOCK_TIME) * 60 * 24 * 365)
export const SOY_PER_YEAR = SOY_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'https://app.soy.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_URL}/pool`
export const BASE_CALLISTO_SCAN_URL = BASE_CALLISTO_SCAN_URLS[ChainId.MAINNET]
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 3000000
export const DEFAULT_GAS_PRICE = 5
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const ONE_YEAR_TIMESTAMP = 365 * 24 * 60 * 60
export const REWARD_TOKENS_PER_YEAR = new BigNumber(50000000)

// SOY/CLO ->30
// CLO/CLOE ->20
// CLO/ETH->20
// CLO/BNB->20
// SOY/ETH->10
// SOY/BNB->10
// CLO/ETC->20
// SOY/ETC->10
// CLO/USDT->20
// CLO/BUSDT->10
// SOY/USDT->5
// SOY/BUSDT->10


