import { useEffect, useState } from 'react'

import { useTokenContract } from 'hooks/useContract'
import { getDailyIdoAddress } from 'utils/addressHelpers'

function useGetAllowance(address?: string, owner?: string) {
  const [allowance, setAllowance] = useState(false)
  const contract = useTokenContract(address, false)
  const spender = getDailyIdoAddress()

  useEffect(() => {
    const get = async () => {
      const res = await contract.allowance(owner, spender, {value:0});
      setAllowance(res.gt(0))
    }
    if (owner)
      get()
  }, [contract, owner, spender])
  return allowance
}

export default useGetAllowance
