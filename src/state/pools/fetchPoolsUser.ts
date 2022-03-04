import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getMasterchefContract } from 'utils/contractHelpers'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'

// Pool 0, SOY / SOY is a different kind of contract (master chef)
// CLO pools use the native CLO token (wrapping ? unwrapping is done at the contract level)
const nonCloPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'CLO')
const bnbPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'CLO')
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0)
const masterChefContract = getMasterchefContract()

export const fetchPoolsAllowance = async (account) => {
  const calls = nonCloPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  // const allowances = await multicall(erc20ABI, calls)

  // return nonCloPools.reduce(
  //   (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
  //   {},
  // )
  return nonCloPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(0).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non CLO pools
  const calls = nonCloPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  // const tokenBalancesRaw = await multicall(erc20ABI, calls)
  // const tokenBalances = nonCloPools.reduce(
  //   (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
  //   {},
  // )
  
  const tokenBalances = nonCloPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(0).toJSON() }),
    {},
  )

  // CLO pools
  const bnbBalance = await simpleRpcProvider.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance.toString()).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  // const userInfo = await multicall(sousChefABI, calls)
  // const stakedBalances = nonMasterPools.reduce(
  //   (acc, pool, index) => ({
  //     ...acc,
  //     [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
  //   }),
  //   {},
  // )
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber('0x00').toJSON(),
    }),
    {},
  )

  // SOY / SOY pool
  // const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)

  // return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
  return { ...stakedBalances, 0: new BigNumber(0).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  // const res = await multicall(sousChefABI, calls)
  // const pendingRewards = nonMasterPools.reduce(
  //   (acc, pool, index) => ({
  //     ...acc,
  //     [pool.sousId]: new BigNumber(res[index]).toJSON(),
  //   }),f
  //   {},
  // )
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(0).toJSON(),
    }),
    {},
  )
  // SOY / SOY pool
  // const pendingReward = await masterChefContract.pendingPmoon('0', account)

  // return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
  
  return { ...pendingRewards, 0: new BigNumber('0').toJSON() }
}
