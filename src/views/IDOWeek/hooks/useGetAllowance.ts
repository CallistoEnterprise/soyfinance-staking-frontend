import { useEffect, useState } from 'react'

import { useTokenContract } from 'hooks/useContract'
import { getWeeklyIdoAddress } from 'utils/addressHelpers'

function useGetAllowance(address?: string, owner?: string) {
  // const token = useMemo(() => new Token(ChainId.MAINNET, address, 18, 'token', 'token'), [address])
  const [allowance, setAllowance] = useState(false)
  const contract = useTokenContract(address, false)
  const spender = getWeeklyIdoAddress()

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
