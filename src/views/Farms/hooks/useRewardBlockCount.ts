import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import masterchefABI from 'config/abi/masterchef.json'
import { getMasterChefAddress } from 'utils/addressHelpers'
import {multicall3} from 'utils/multicall'
import { ONE_YEAR_TIMESTAMP } from 'config'

const useRewardBlockCount = (): BigNumber => {
  const [rewardBlockCount, setRewardBlockCount] = useState(new BigNumber(100))
  // useEffect(() => {
  //   const startGettingCount = async () => {
  //     const currentTime = Math.floor(Date.now()/1000)
  //     const beforeOneYear = currentTime - ONE_YEAR_TIMESTAMP
  //     const [count] = await multicall3(masterchefABI, [
  //       {
  //         address: getMasterChefAddress(),
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
