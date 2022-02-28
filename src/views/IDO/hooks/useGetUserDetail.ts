import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { getDailyIdoContractWithAccount } from 'utils/contractHelpers'
import { getBalanceAmount } from 'utils/formatBalance'

const useGetUserDetail = () => {
  const [userData, setUserData] = useState({
    statistics: [],
    soyLocked: 0,
    soyToClaim: 0,
    hasBidder: false
  })
  const { account, library } = useWeb3React()

  useEffect(() => {
    const getData = async () => {
      const contract = getDailyIdoContractWithAccount(library, account)
      const res = await contract.getUserDetail(account)
      const { lockedDate, lockedSoy, soyPrice } = res
      const soyLocked = getBalanceAmount(new BigNumber(res.soyLocked.toString())).toNumber()
      const soyToClaim = getBalanceAmount(new BigNumber(res.soyToClaim.toString())).toNumber()
      let hasBidder = false
      const ret = lockedSoy.map((item, index) => {
        if (parseInt(lockedDate[index].toString()) !== 0 && !hasBidder) {
          hasBidder = true;
        }
        return {
          id: `Round ${index + 1}`,
          cloAmount: getBalanceAmount(new BigNumber(soyPrice[index].toString())).toNumber(),
          soyAmount: getBalanceAmount(new BigNumber(item.toString())).toNumber(),
          unlockDate: parseInt(lockedDate[index].toString()) * 1000,
        }
      })
      setUserData({
        statistics: ret,
        soyLocked,
        soyToClaim,
        hasBidder
      })
    }
    if (account)
      getData()
  }, [account, library])

  return userData
}

export default useGetUserDetail
