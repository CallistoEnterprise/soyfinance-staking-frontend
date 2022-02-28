import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, Button } from '@soy-libs/uikit2'
import { Link } from 'react-router-dom'
import CircleLoader from 'components/Loader/CircleLoader'
import Settings from './Settings'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <Heading as="h2" mb="8px">
            {title}
          </Heading>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" />}
            <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex>
          <Settings />
          <Transactions />
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export const BidderHeader = ({ title, handleClick, loading, claimAmount = 0, noConfig = false, totalLockedSoy = 0 }) => {

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        <Flex flexDirection="column">
          <Heading as="h2" mb="8px">
            {title}
          </Heading>
          <Text color="textSubtle" fontSize="14px">
            {`Total Bidded Soy Amount : ${totalLockedSoy} SOY`}
          </Text>
          <Text color="textSubtle" fontSize="14px">
            {claimAmount === 0 ? 'There is no amount to be claimed.' : `${claimAmount.toFixed(6)} SOY may be claimed.`}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Button
          onClick={handleClick}
          disabled={loading || claimAmount <= 0}
        >
          {
            loading ?
            <CircleLoader />:
            'Claim'
          }
        </Button>
      </Flex>
    </AppHeaderContainer>
  )
}
export default AppHeader
