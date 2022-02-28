import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@soy-libs/uikit2'

export interface EarnedProps {
  earnings: number
  pid: number
}

interface EarnedPropsWithLoading extends EarnedProps {
  userDataReady: boolean
}

const Amount = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => (earned ? theme.colors.text : theme.colors.textDisabled)};
  display: flex;
  align-items: center;
`

const Earned: React.FunctionComponent<EarnedPropsWithLoading> = ({ earnings, userDataReady }) => {
  const displayEarning = parseInt((earnings * 1000).toString()) / 1000
  if (userDataReady) {
    // return <Amount earned={earnings}>{earnings.toLocaleString()}</Amount>
    return <Amount earned={earnings}>{displayEarning}</Amount>
  }
  return (
    <Amount earned={0}>
      <Skeleton width={60} />
    </Amount>
  )
}

export default Earned
