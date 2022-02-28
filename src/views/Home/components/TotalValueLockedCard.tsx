import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@soy-libs/uikit2'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  background-color: rgba(0,0,0,.9);
  margin-bottom: 30px;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const tvl = data ? data.tvl.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {t('Total Value Locked (TVL)')}
        </Heading>
        {data ? (
          <>
            <Heading size="xl" color="primary">{`$${tvl}`}</Heading>
            <Text color="textSubtle">{t('Across all LPs and Syrup Pools')}</Text>
          </>
        ) : (
          <>
            <Heading size="xl" color="primary">{`$${0}`}</Heading>
            <Text color="textSubtle">{t('Across all LPs and Syrup Pools')}</Text>
            {/* <Skeleton height={66} /> */}
          </>
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
