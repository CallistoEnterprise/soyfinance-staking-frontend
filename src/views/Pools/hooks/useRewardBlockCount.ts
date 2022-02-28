import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import souschefABI from 'config/abi/sousChef.json'
import { getSousChefAddress, getMaticStakingAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import { ONE_YEAR_TIMESTAMP } from 'config'

const useRewardBlockCount = (): BigNumber => {
  const [rewardBlockCount, setRewardBlockCount] = useState(new BigNumber(0))
  // useEffect(() => {
  //   const startGettingCount = async () => {
  //     const currentTime = Math.floor(Date.now()/1000)
  //     const beforeOneYear = currentTime - ONE_YEAR_TIMESTAMP
  //     const [count] = await multicall(souschefABI, [
  //       {
  //         address: getSousChefAddress(),
  //         name: 'getRewardBlockCount',
  //         params: [beforeOneYear, currentTime],
  //       },
  //     ])
  //     setRewardBlockCount(new BigNumber(count))
  //   }
  //   startGettingCount()
  // }, [rewardBlockCount])

  return rewardBlockCount
}
export const useRewardBlockCountForMaticStaking = (): BigNumber => {
  const [rewardBlockCount, setRewardBlockCount] = useState(new BigNumber(0))
  // useEffect(() => {
  //   const startGettingCount = async () => {
  //     const currentTime = Math.floor(Date.now()/1000)
  //     const beforeOneYear = currentTime - ONE_YEAR_TIMESTAMP
  //     const [count] = await multicall(souschefABI, [
  //       {
  //         address: getMaticStakingAddress(),
  //         name: 'getRewardBlockCount',
  //         params: [beforeOneYear, currentTime],
  //       },
  //     ])
  //     setRewardBlockCount(new BigNumber(count))
  //   }
  //   startGettingCount()
  // }, [rewardBlockCount])

  return rewardBlockCount
}

export default useRewardBlockCount
