// import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
// import masterchefABI from 'config/abi/masterchef.json'
// import { getMasterChefAddress } from 'utils/addressHelpers'
// import multicall from 'utils/multicall'
// import { ONE_YEAR_TIMESTAMP } from 'config'

const useRewardBlockCount = (): BigNumber => {
  // const [rewardBlockCount, setRewardBlockCount] = useState(new BigNumber(0))
  // useEffect(() => {
  //   const startGettingCount = async () => {
  //     const currentTime = Math.floor(Date.now()/1000)
  //     const beforeOneYear = currentTime - ONE_YEAR_TIMESTAMP
  //     const [count] = await multicall(masterchefABI, [
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

  return new BigNumber(0)
}

export default useRewardBlockCount
