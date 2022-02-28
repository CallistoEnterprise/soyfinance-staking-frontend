import { useCallback } from 'react'
import { ethers } from 'ethers'
import { getBep20ContractWithAccount } from 'utils/contractHelpers'
import { getDailyIdoAddress } from 'utils/addressHelpers'
import { useWeb3React } from '@web3-react/core'

const useApprove = () => {
  const { account, library } = useWeb3React()
  const idoAddress = getDailyIdoAddress()
  const handleApprove = useCallback(async (tokenAddress: string) => {
    try {
      const contract = getBep20ContractWithAccount(tokenAddress, library, account)
      const tx = await contract.approve(idoAddress, ethers.constants.MaxUint256, {value: 0})
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [idoAddress, library, account])

  return { onApprove: handleApprove }
}

export default useApprove
