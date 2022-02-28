import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
// import { useMasterchef } from 'hooks/useContract'
import farms from 'config/constants/farms'
import { getLocalFarmContractWithAccount } from 'utils/contractHelpers'
import { useWeb3React } from '@web3-react/core'

const useUnstakeFarms = (pid: number) => {
  const { account, library } = useWeb3React()
  // const masterChefContract = useMasterchef()
  const currentFarm = farms.find((farm) => farm.pid === pid)
  const { localFarmAddresses } = currentFarm
  const localFarmContract = getLocalFarmContractWithAccount(localFarmAddresses, library, account)

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeFarm(localFarmContract, amount)
    },
    [localFarmContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
