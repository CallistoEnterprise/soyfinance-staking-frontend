import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { DEFAULT_GAS_LIMIT } from 'config'
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { useSousChef } from 'hooks/useContract'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousUnstake = async (sousChefContract) => {
  const tx = await sousChefContract.withdraw_stake(options)
  const receipt = await tx.wait()
  return receipt.status
}

const sousEmergencyUnstake = async (sousChefContract) => {
  const tx = await sousChefContract.emergencyWithdraw()
  const receipt = await tx.wait()
  return receipt.status
}

const useUnstakePool = (sousId, enableEmergencyWithdraw = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleUnstake = useCallback(
    async () => {
      if (enableEmergencyWithdraw) {
        await sousEmergencyUnstake(sousChefContract)
      } else {
        await sousUnstake(sousChefContract)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, enableEmergencyWithdraw, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
