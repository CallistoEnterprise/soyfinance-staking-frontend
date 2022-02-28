import { ChainId, Currency, currencyEquals, JSBI, Price, WETH } from '@soy-libs/sdk2'
import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { BUSDT, SOY } from '../config/constants/tokens'
import { PairState, usePairs } from './usePairs'
import { wrappedCurrency } from '../utils/wrappedCurrency'

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WETH[chainId], wrapped) ? undefined : currency,
        chainId ? WETH[chainId] : undefined,
      ],
      [wrapped?.equals(BUSDT) ? undefined : wrapped, chainId === ChainId.MAINNET ? BUSDT : undefined],
      [chainId ? WETH[chainId] : undefined, chainId === ChainId.MAINNET ? BUSDT : undefined],
    ],
    [chainId, currency, wrapped],
  )
  const [[ethPairState, ethPair], [busdPairState, busdPair], [busdEthPairState, busdEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WETH[chainId])) {
      if (busdPair) {
        const price = busdPair.priceOf(WETH[chainId])
        return new Price(currency, BUSDT, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle usdc
    if (wrapped.equals(BUSDT)) {
      return new Price(BUSDT, BUSDT, '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WETH[chainId])
    const ethPairETHBUSDValue: JSBI =
      ethPairETHAmount && busdEthPair ? busdEthPair.priceOf(WETH[chainId]).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the usdc pair
    if (
      busdPairState === PairState.EXISTS &&
      busdPair &&
      busdPair.reserveOf(BUSDT).greaterThan(ethPairETHBUSDValue)
    ) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, BUSDT, price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && busdEthPairState === PairState.EXISTS && busdEthPair) {
      if (busdEthPair.reserveOf(BUSDT).greaterThan('0') && ethPair.reserveOf(WETH[chainId]).greaterThan('0')) {
        const ethBusdPrice = busdEthPair.priceOf(BUSDT)
        const currencyEthPrice = ethPair.priceOf(WETH[chainId])
        const busdPrice = ethBusdPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, BUSDT, busdPrice.denominator, busdPrice.numerator)
      }
    }
    return undefined
  }, [chainId, currency, ethPair, ethPairState, busdEthPair, busdEthPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): Price | undefined => {
  const { chainId } = useActiveWeb3React()
  const currentChaindId = chainId || ChainId.MAINNET
  const cakeBusdPrice = useBUSDPrice(SOY[currentChaindId])
  return cakeBusdPrice
}
