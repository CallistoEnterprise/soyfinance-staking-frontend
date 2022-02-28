import React from 'react'
import { Card, CardBody, Heading, Text } from '@soy-libs/uikit2'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getPmoonAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0,0,0,.9);
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const marketCap = 0
  const burnedBalance = getBalanceNumber(useBurnedBalance(getPmoonAddress()))
  const mintedBalance = 0
  const lockRewards = 0
  const circulatingSupply = 0
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const txAmt = 0
  
  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {t('SOY Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Market Cap')}</Text>
          <CardValue fontSize="14px" decimals={0} value={marketCap} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Minted')}</Text>
          <CardValue fontSize="14px" decimals={0} value={mintedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Locked Rewards')}</Text>
          <CardValue fontSize="14px" decimals={0} value={lockRewards} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Circulating Supply')}</Text>
          <CardValue fontSize="14px" decimals={0} value={circulatingSupply} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Max Tx Amount')}</Text>
          <CardValue fontSize="14px" decimals={0} value={txAmt} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New SOY/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={10} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Sell Tax')}</Text>
          <CardValue fontSize="14px" decimals={0} value={3.0} suffix='%' />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Buy Tax')}</Text>
          <CardValue fontSize="14px" decimals={0} value={0} suffix='%' />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
