import { useCallback } from 'react'
import { getDailyIdoContractWithAccount } from 'utils/contractHelpers'
import { useWeb3React } from '@web3-react/core'

const useClaim = () => {
  const { account, library } = useWeb3React()
  const contract = getDailyIdoContractWithAccount(library, account)
  const handleClaim = useCallback(
    async () => {
      try {
        const tx = await contract.claim({value: 0})
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

  return { onClaim: handleClaim }
}

export default useClaim
