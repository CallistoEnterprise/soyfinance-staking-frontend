import React from 'react'
import { TokenPairImage, ImageProps } from '@soy-libs/uikit2'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'

const CakeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `https://app.soy.finance/images/coins/${getAddress(tokens.soy.address)}.png`

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="https://app.soy.finance/images/coins/autorenew.svg" {...props} />
}

export default CakeVaultTokenPairImage
