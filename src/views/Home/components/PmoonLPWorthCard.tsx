import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@soy-libs/uikit2'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
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

const PmoonLPWorthCard = () => {
  const { t } = useTranslation()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {t('SOY LP Worth')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('SOY-CLO')}</Text>
          <CardValue fontSize="14px" decimals={0} value={0} stringVal='0.0' prefix='$'/>
        </Row>
        <Row>
          <Text fontSize="14px">{t('SOY-BUSDT')}</Text>
          <CardValue fontSize="14px" decimals={0} value={0} stringVal='0.0' prefix='$'/>
        </Row>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default PmoonLPWorthCard
