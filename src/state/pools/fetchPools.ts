import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import wcloABI from 'config/abi/weth.json'
import {multicall3} from 'utils/multicall'
import { getAddress, getWcloAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'BlockStartStaking',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'LastBlock',
    }
  })

  const starts = await multicall3(sousChefABI, callsStartBlock)
  const ends = await multicall3(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((soyPoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: soyPoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  const nonCloPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'CLO')
  const bnbPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'CLO')

  const callsNonCloPools = nonCloPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'TotalStakingAmount',
      // params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsCloPools = bnbPool.map((poolConfig) => {
    return {
      address: getWcloAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonCloPoolsTotalStaked = await multicall3(sousChefABI, callsNonCloPools)
  const cloPoolsTotalStaked = await multicall3(wcloABI, callsCloPools)

  // return [
  //   ...nonBnbPools.map((p, index) => ({
  //     sousId: p.sousId,
  //     totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
  //   })),
  //   ...bnbPool.map((p, index) => ({
  //     sousId: p.sousId,
  //     totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
  //   })),
  // ]
  return [
    ...nonCloPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonCloPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(cloPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolStakingLimit = async (sousId: number): Promise<BigNumber> => {
  try {
    // const sousContract = getSouschefV2Contract(sousId)
    // const stakingLimit = await sousContract.poolLimitPerUser()
    return new BigNumber(9000000000000000000000000000)
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
): Promise<{ [key: string]: BigNumber }> => {
  const validPools = poolsConfig
    .filter((p) => p.stakingToken.symbol !== 'CLO' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolStakingLimit(validPool.sousId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].sousId]: stakingLimit,
    }
  }, {})
}
