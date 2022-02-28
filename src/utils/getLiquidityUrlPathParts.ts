// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import { getWmaticAddress } from './addressHelpers'

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const wMATICAddressString = getWmaticAddress()
  const quoteTokenAddressString: string = quoteTokenAddress ? quoteTokenAddress[chainId] : null
  const tokenAddressString: string = tokenAddress ? tokenAddress[chainId] : null
  const firstPart =
    !quoteTokenAddressString || quoteTokenAddressString === wMATICAddressString ? 'CLO' : quoteTokenAddressString
  const secondPart = !tokenAddressString || tokenAddressString === wMATICAddressString ? 'CLO' : tokenAddressString
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
