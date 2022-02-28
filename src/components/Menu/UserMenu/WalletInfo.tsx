import React from 'react'
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Text } from '@soy-libs/uikit2'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getPmoonAddress } from 'utils/addressHelpers'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { getCallistoExpLink } from 'utils'
import { getFullDisplayBalance } from 'utils/formatBalance'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance } = useGetBnbBalance()
  const { balance: cakeBalance } = useTokenBalance(getPmoonAddress())
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowBnbBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('CLO Balance Low')}</Text>
            <Text as="p">{t('You need CLO for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="textSubtle">{t('CLO Balance')}</Text>
        <Text>{getFullDisplayBalance(balance, 18, 6)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="textSubtle">{t('SOY Balance')}</Text>
        <Text>{getFullDisplayBalance(cakeBalance, 18, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="end" mb="24px">
        <LinkExternal href={getCallistoExpLink(account, 'address')}>{t('View on Callisto Explorer')}</LinkExternal>
      </Flex>
      <Button variant="secondary" width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
