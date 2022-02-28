import { useCallback } from 'react'
import { getDailyIdoContractWithAccount } from 'utils/contractHelpers'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

const useStakeBet = () => {
  const { account, library } = useWeb3React()
  const contract = getDailyIdoContractWithAccount(library, account)
  const handleStake = useCallback(
    async (token: string, amount: BigNumber) => {
      try {
        let tx = null
        if (token === '0x0000000000000000000000000000000000000001'){
          tx = await contract.makeBet(token, amount.toString(), {value: amount.toString()})
        } else{
          tx = await contract.makeBet(token, amount.toString(), {value: 0})
        }
        if (tx) {
          const receipt = await tx.wait()
          return receipt.status
        }
        return false
      } catch(err) {
        return false
      }
    },
    [contract],
  )

  return { onStakeBet: handleStake }
}

export default useStakeBet
