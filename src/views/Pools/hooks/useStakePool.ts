import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stakeFarm } from 'utils/calls'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import { useMasterchef, useStakingTokenContract } from 'hooks/useContract'
import web3 from 'utils/web3'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (stakingTkContract, to, amount, decimals = 18, periods=6) => {
  const _data = web3.eth.abi.encodeParameter('uint256', periods)
  const bigAmount = new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString()
  const tx = await stakingTkContract.transfer(to, bigAmount, _data)
  const receipt = await tx.wait()
  return receipt.status
}

const sousStakeBnb = async (sousChefContract, amount) => {
  const tx = await sousChefContract.deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), options)
  const receipt = await tx.wait()
  return receipt.status
}

const useStakePool = (sousId: number, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const stakingTkContract = useStakingTokenContract(sousId)

  const handleStake = useCallback(
    async (to: string, amount: string, decimals: number, periods: number) => {
      if (sousId === 0) {
        await stakeFarm(masterChefContract, 0, amount)
      } else if (isUsingBnb) {
        await sousStakeBnb(stakingTkContract, amount)
      } else {
        await sousStake(stakingTkContract, to, amount, decimals, periods)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, stakingTkContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStakePool
