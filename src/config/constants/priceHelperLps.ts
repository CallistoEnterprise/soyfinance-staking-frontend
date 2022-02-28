import tokens from './tokens'
import { FarmConfig } from './types'

const priceHelperLps: FarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'BUSDT-CLO LP',
    lpAddresses: {
      820: '0xbf6c50889d3a620eb42C0F188b65aDe90De958c4',
      20729: '0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a',
    },
    token: tokens.busdt,
    quoteToken: tokens.clo,
  },
]

export default priceHelperLps
