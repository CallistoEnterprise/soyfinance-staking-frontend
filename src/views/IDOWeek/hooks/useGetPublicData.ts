import { useEffect, useState } from 'react'
import { getWeeklyIdoContract } from 'utils/contractHelpers'

const useGetPublicData = () => {
    const [publicData, setPublicData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const contract = getWeeklyIdoContract()
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
                const soyToSell = parseFloat(item.soyToSell.toString()) / 1000000000000000000
                const usdCollected = parseFloat(item.usdCollected.toString()) / 1000000000000000000
                const prevSoyUsdPrice = soyToSell === 0 ? 0 : usdCollected / soyToSell
                return prevSoyUsdPrice
            })
            const minPricePercentage = await contract.minPricePercentage()
            const maxPricePercentage = await contract.maxPricePercentage()
            const lastRoundSoyPrice = await contract.lastRoundSoyPrice()
            // const totalSoyToSell = await contract.totalSoyToSell()
            const minPrice = minPricePercentage * parseFloat(lastRoundSoyPrice.toString()) / 100000000000000000000
            const maxPrice = maxPricePercentage * parseFloat(lastRoundSoyPrice.toString()) / 100000000000000000000
            const soyToSell = parseFloat(auctionRound.soyToSell.toString()) / 1000000000000000000
            const usdCollected = parseFloat(auctionRound.usdCollected.toString()) / 1000000000000000000
            const start = parseFloat(auctionRound.start.toString())
            const end = parseFloat(auctionRound.end.toString())
            const averagePrice = soyToSell === 0 ? 0 : usdCollected / soyToSell
            
            const curDuration = parseFloat(defaultDuration.toString()) === 0 ? 0 : (end - start) / parseFloat(defaultDuration.toString());
            const iteration = `${curDuration.toFixed(0)}/${maxIteration}`

            const returnData = {
                currentRound: curRoundId.toNumber(),
                soyToSell,
                currentCollectedUSD: parseFloat(collected.currentRoundUSD.toString()) / 1000000000000000000,
                totalUSD: parseFloat(collected.totalUSD.toString()) / 1000000000000000000,
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
