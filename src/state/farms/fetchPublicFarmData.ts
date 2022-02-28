import BigNumber from 'bignumber.js'
import masterchefABI from 'config/abi/masterchef.json'
import localFarmABI from 'config/abi/localFarm.json'
import erc20 from 'config/abi/erc20.json'
import { getAddress, getLocalFarmAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import {multicall3} from 'utils/multicall'
import { Farm, SerializedBigNumber } from '../types'

type PublicFarmData = {
  tokenAmountMc: SerializedBigNumber
  quoteTokenAmountMc: SerializedBigNumber
  tokenAmountTotal: SerializedBigNumber
  quoteTokenAmountTotal: SerializedBigNumber
  lpTotalInQuoteToken: SerializedBigNumber
  lpTotalSupply: SerializedBigNumber
  tokenPriceVsQuote: SerializedBigNumber
  poolWeight: SerializedBigNumber
  multiplier: string
  realmulti?: BigNumber
}
// const manualMulti = [40, 47, 13, 25, 5, 10, 5, 10, 3]

const fetchFarm = async (farm: Farm): Promise<PublicFarmData> => {
  const { lpAddresses, token, quoteToken, localFarmAddresses } = farm
  const lpAddress = getAddress(lpAddresses)

  const calls = [
    // Balance of token in the LP contract
    {
      address: getAddress(token.address),
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: getAddress(quoteToken.address),
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [getLocalFarmAddress(localFarmAddresses)],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: getAddress(token.address),
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: getAddress(quoteToken.address),
      name: 'decimals',
    },
  ]

  const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] = await multicall3(erc20, calls)

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))
  // Only make masterchef calls if farm has pid
  const [allocPoint] = await multicall3(localFarmABI, [
      {
        address: getLocalFarmAddress(localFarmAddresses),
        name: 'getAllocationX1000',
        params: []
      }
    ])
  
  const [totalAllocPoint]= await multicall3(masterchefABI, [
    {
      address: getMasterChefAddress(),
      name: 'totalMultipliers'
    }
  ])
  const [mulitiplierOfFarm]= await multicall3(masterchefABI, [
    {
      address: getMasterChefAddress(),
      name: 'localFarms',
      params: [farm.pid]
    }
  ])

  const bigAlloc = new BigNumber(allocPoint[0].toString())
  const poolWeight = totalAllocPoint[0] ? bigAlloc.div(new BigNumber(1000)) : BIG_ZERO
  // const multi = new BigNumber(manualMulti[farm.pid])
  // const real = allocPoint.div(100).toString()

  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    multiplier: `${mulitiplierOfFarm[1].toString()}X`,
  }
}

export default fetchFarm
