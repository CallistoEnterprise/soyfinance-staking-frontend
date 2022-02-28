import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@soy-libs/uikit2'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
// import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'

export interface AprProps {
  value: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  cakePrice: BigNumber
  originalValue: number
  hideButton?: boolean
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  cakePrice,
  originalValue,
  hideButton = false,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  // const oneThousandDollarsWorthOfToken = 1000 / cakePrice.toNumber()

  // const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
  //   numberOfDays: 1,
  //   farmApr: value,
  //   tokenPrice: cakePrice,
  //   roundingDecimals: 2,
  //   compoundFrequency: 1,
  //   performanceFee: 0,
  // })

  // const customAPR = (365 * getRoi({ amountEarned: tokenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfToken })).toFixed(2,)
  
  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>{value}%</AprWrapper>
          {!hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              cakePrice={cakePrice}
              apr={originalValue}
              displayApr={value}
              addLiquidityUrl={addLiquidityUrl}
            />
          )}
        </>
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr
