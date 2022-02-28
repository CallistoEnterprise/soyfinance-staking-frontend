import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getBalanceAmount } from 'utils/formatBalance'
import { getDailyIdoContract } from 'utils/contractHelpers'

const useGetPublicData = () => {
    const [publicData, setPublicData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const contract = getDailyIdoContract()
            const curRoundId = await contract.currentRoundId()
            const collected = await contract.getCollectedUSD()
            const maxIteration = await contract.maxExtendRounds()
            const defaultDuration = await contract.roundDuration()
            const auctionRound = await contract.auctionRound(curRoundId)
            const intCurRoundId = parseInt(curRoundId.toString())
            const calls = []
            for (let i = 1 ; i < intCurRoundId ; i++) {
                calls.push(contract.auctionRound(i))
            }
            const data = await Promise.all(calls).then(values => {
                return values
            })

            const soyPrices = data.map((item) => {
                const soyToSell = getBalanceAmount(new BigNumber(item.soyToSell.toString())).toNumber()
                const usdCollected = getBalanceAmount(new BigNumber(item.usdCollected.toString())).toNumber()
                const prevSoyUsdPrice = soyToSell === 0 ? 0 : usdCollected / soyToSell
                return prevSoyUsdPrice
            })
            const minPricePercentage = await contract.minPricePercentage()
            const maxPricePercentage = await contract.maxPricePercentage()
            const lastRoundSoyPrice = await contract.lastRoundSoyPrice()
            // const totalSoyToSell = await contract.totalSoyToSell()
            const minPrice = minPricePercentage * getBalanceAmount(new BigNumber(lastRoundSoyPrice.toString())).toNumber()/100
            const maxPrice = maxPricePercentage * getBalanceAmount(new BigNumber(lastRoundSoyPrice.toString())).toNumber()/100
            const soyToSell = getBalanceAmount(new BigNumber(auctionRound.soyToSell.toString())).toNumber()
            const usdCollected = getBalanceAmount(new BigNumber(auctionRound.usdCollected.toString())).toNumber()
            
            const start = parseFloat(auctionRound.start.toString())
            const end = parseFloat(auctionRound.end.toString())
            const averagePrice = soyToSell === 0 ? 0 : usdCollected / soyToSell
            
            const curDuration = parseFloat(defaultDuration.toString()) === 0 ? 0 : (end - start) / parseFloat(defaultDuration.toString());
            const iteration = `${curDuration.toFixed(0)}/${maxIteration}`

            const returnData = {
                currentRound: curRoundId.toNumber(),
                soyToSell,
                currentCollectedUSD: getBalanceAmount(new BigNumber(collected.currentRoundUSD.toString())).toNumber(),
                totalUSD: getBalanceAmount(new BigNumber(collected.totalUSD.toString())).toNumber(),
                soyAvgPrice: averagePrice,
                startTime: start,
                endTime: end,
                minPrice,
                maxPrice,
                prevSoyUsdPrice: soyPrices,
                iteration
            }
            setPublicData(returnData)
        }
        getData()
    }, [])

    return publicData
}

export default useGetPublicData
