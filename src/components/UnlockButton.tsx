import React from 'react'
import { Button, useWalletModal } from '@soy-libs/uikit2'
import { useTranslation } from 'contexts/Localization'
import useAuth from 'hooks/useAuth'

const UnlockButton = (props) => {
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t('Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
