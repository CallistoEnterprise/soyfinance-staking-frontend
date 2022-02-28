import React, { useCallback, useState } from 'react'
import { Currency } from '@soy-libs/sdk2'
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBackButton,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
  Heading,
} from '@soy-libs/uikit2'
import styled from 'styled-components'
import usePrevious from 'hooks/usePreviousValue'
import { useTranslation } from 'contexts/Localization'
import CurrencySearchIdo from './CurrencySearchIdo'
import { CurrencyModalView } from './types'

const StyledModalContainer = styled(ModalContainer)`
  max-width: 420px;
  width: 100%;
`

const StyledModalBody = styled(ModalBody)`
  padding: 24px;
`

interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
}

export default function CurrencySearchModalForIdo({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss()
      onCurrencySelect(currency)
    },
    [onDismiss, onCurrencySelect],
  )

  // for token import view
  const prevView = usePrevious(modalView)

  // used for import token flow
  // const [importToken, setImportToken] = useState<Token | undefined>()

  const { t } = useTranslation()

  const config = {
    [CurrencyModalView.search]: { title: t('Select a Token'), onBack: undefined },
    [CurrencyModalView.manage]: { title: t('Manage'), onBack: () => setModalView(CurrencyModalView.search) },
    [CurrencyModalView.importToken]: {
      title: t('Import Tokens'),
      onBack: () =>
        setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search),
    },
    [CurrencyModalView.importList]: { title: t('Import List'), onBack: () => setModalView(CurrencyModalView.search) },
  }

  return (
    <StyledModalContainer minWidth="320px">
      <ModalHeader>
        <ModalTitle>
          {config[modalView].onBack && <ModalBackButton onBack={config[modalView].onBack} />}
          <Heading>{config[modalView].title}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <StyledModalBody>
        {modalView === CurrencyModalView.search && (
          <CurrencySearchIdo
            onCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            showImportView={() => setModalView(CurrencyModalView.importToken)}
            // setImportToken={()}
          />)}
      </StyledModalBody>
    </StyledModalContainer>
  )
}
