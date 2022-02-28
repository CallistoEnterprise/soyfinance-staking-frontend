import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
// import { usePriceBnbBusd } from 'state/farms/hooks'
import { getWeeklyIdoContractWithAccount } from 'utils/contractHelpers'

const useGetUserDetail = () => {
    const [userData, setUserData] = useState({
        statistics: [],
        soyLocked: 0,
        soyToClaim: 0,
        hasBidder: false
    })
    const { account, library } = useWeb3React()
    // const cloUsdPrice = usePriceBnbBusd()

    useEffect(() => {
        const getData = async () => {
            const contract = getWeeklyIdoContractWithAccount(library, account)
            const res = await contract.getUserDetail(account)
            const { lockedDate, lockedSoy, soyPrice} = res
            const soyLocked = parseFloat(res.soyLocked.toString()) / 1000000000000000000
            const soyToClaim = parseFloat(res.soyToClaim.toString()) / 1000000000000000000
            let hasBidder = false
            const ret = lockedSoy.map((item, index) => {
                if (parseInt(lockedDate[index].toString()) !== 0 && !hasBidder){
                    hasBidder = true;
                }
                return {
                    id: `Round ${index+1}`,
                    cloAmount: (parseFloat(soyPrice[index].toString()) / 1000000000000000000),
                    soyAmount: parseFloat(item.toString()) / 1000000000000000000,
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
        if(account)
            getData()
    }, [account, library])

    return userData
}

export default useGetUserDetail
