import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
// import masterchefABI from 'config/abi/masterchef.json'
import localFarmABI from 'config/abi/localFarm.json'
import {multicall3} from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { FarmConfig } from 'config/constants/types'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
  // const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    const localFarmAddress = getAddress(farm.localFarmAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, localFarmAddress] }
  })

  const rawLpAllowances = await multicall3(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall3(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  // const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    const localFarmAddress = getAddress(farm.localFarmAddresses)
    return {
      address: localFarmAddress,
      name: 'userInfo',
      params: [account],
    }
  })

  const rawStakedBalances = await multicall3(localFarmABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
  // const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    const localFarmAddress = getAddress(farm.localFarmAddresses)
    return {
      address: localFarmAddress,
      name: 'pendingReward',
      params: [account],
    }
  })

  const rawEarnings = await multicall3(localFarmABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}