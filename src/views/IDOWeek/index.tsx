import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CurrencyAmount } from '@soy-libs/sdk2'
import { Button, Box, Card } from '@soy-libs/uikit2'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { BidderHeader } from 'components/App/AppHeader'
import { getAddress } from 'utils/addressHelpers'
import { getDecimalAmount } from 'utils/formatBalance'
import tokens from 'config/constants/tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import useToast from 'hooks/useToast'
// import { usePriceCakeBusd } from 'state/farms/hooks'
import Counter from './components/CounterSection'
import { AutoColumn } from '../../components/Layout/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanelForIdo'
// import { AutoRow } from '../../components/Layout/Row'
import { Wrapper } from './components/styleds'
import { AppHeader, AppBody } from '../../components/App'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import {
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import CircleLoader from '../../components/Loader/CircleLoader'
import IDOPage from '../IDOPage'
import StatusSection from './components/StatusSection'
import BidderStatus from './components/BidderStatus'
import useGetPublicData from './hooks/useGetPublicData'
import useStakeBet from './hooks/useStakeBet'
import useGetUserDetail from './hooks/useGetUserDetail'
import useGetAllowance from './hooks/useGetAllowance'
import useApprove from './hooks/useApprove'
import useClaim from './hooks/useClaim'

const CustomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;

  }
`
const SpacerH = styled.div`
  width: 50px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const SpacerV = styled.div`
  height: 50px;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`
const BidderWrapper = styled(Card)`
  border-radius: 24px;
  max-width: 436px;
  width: 100%;
  height: fit-content;
  z-index: 0;
`

export default function IDODaily() {

  const { t } = useTranslation()

  const { account } = useActiveWeb3React()
  const { onStakeBet } = useStakeBet()
  const { onClaim } = useClaim()
  const { toastError, toastSuccess, toastWarning } = useToast()
  // const cakePrice = usePriceCakeBusd()
  const [claimPending, setClaimPending] = useState(false)

  const [txPending, setTxPending] = useState(false)

  const publicData = useGetPublicData()
  const userData = useGetUserDetail()
  const {statistics, hasBidder, soyToClaim} = userData
  const [approveStatus, setApproveStatus] = useState('')

  // get custom setting values for user 
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currencies[Field.INPUT] ?? undefined)

  const {
    wrapType,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // check whether the user has approved the router on the input token
  const [approval] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))


  const tempSymbol = currencies[Field.INPUT]?.name.includes('ERC223') ?
                     `${currencies[Field.INPUT]?.symbol.toLocaleLowerCase()}_erc223`:
                     currencies[Field.INPUT]?.symbol.toLocaleLowerCase()
  const otherToken = tokens[tempSymbol]?? {}
  const allowance = useGetAllowance(otherToken === undefined ? '0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a' : otherToken.address === undefined ? '0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a' : getAddress(otherToken.address), account?? undefined)

  const { onApprove } = useApprove()

  // the callback to execute the swap
  const { error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const balance = selectedCurrencyBalance?.toSignificant(6) ?? '0'

  const handleSubmit = async () => {
    if (
      (parseFloat(formattedAmounts[Field.INPUT]) > parseFloat(balance + 0.005) && currencies[Field.INPUT].symbol === 'CLO') ||
      (parseFloat(formattedAmounts[Field.INPUT]) >= parseFloat(balance) && currencies[Field.INPUT].symbol !== 'CLO')
    ) {
      toastWarning("Warning!", "Insufficient balance.")
      return;
    }
    const inputAmount = getDecimalAmount(new BigNumber(formattedAmounts[Field.INPUT]))
    try {
      setTxPending(true)
      let tokenAddr = '';
      if (currencies[Field.INPUT].symbol === 'CLO') {
        tokenAddr = '0x0000000000000000000000000000000000000001'
      } else {
        // const otherToken = tokens[currencies[Field.INPUT].symbol.toLocaleLowerCase()]
        tokenAddr = getAddress(otherToken.address)
      }

      const res = await onStakeBet(tokenAddr, inputAmount)
      if (res){
        toastSuccess("Success!", "Your bid was successfully placed.")
        setTxPending(false)
      } else {
        toastWarning("Warning!", "Rejected transaction.")
        setTxPending(false)
      }
    } catch(err) {
      setTxPending(false)
      toastError("Error!", "Excution reverted!")
      console.info(err)
    }
  }

  const handleClaim = async () => {
    try {
      setClaimPending(true)
      const res = await onClaim()
      if (res) {
        toastSuccess("Success!", "Your bid was successfully claimed.")
        setClaimPending(false)
      } else {
        toastWarning("Warning!", "Rejected transaction.")
        setClaimPending(false)
      }
    } catch(err) {
      setClaimPending(false)
      toastError("Error!", "Excution reverted!")
      console.info(err)
    }
  }

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    } 
  }, [maxAmountInput, onUserInput])

  return (
    <IDOPage>
      <CustomRow>
        <AppBody>
          <AppHeader title={t('SOY Finance IDO Pool')} subtitle={t('Invest In Your Funds Safety')} noConfig />
          <Wrapper id="swap-page">
            <AutoColumn gap="md">
              <Counter
                item={!publicData ? 0: publicData.endTime}
                curRound = {publicData ? publicData.currentRound : 0}
                soyToSell = {publicData ? publicData.soyToSell : 0}
                iteration = {publicData ? publicData.iteration : 0}
                weekly
              />
              <AutoColumn justify="space-between">
                <StatusSection currentAmount={publicData ? publicData.currentCollectedUSD : 0}/>
              </AutoColumn>
              {/* { publicData && <AutoColumn justify="space-between">
                <AutoRow justify='space-between' style={{ padding: '0 1rem' }}>
                  <Text>Average Price</Text>
                  <Text
                    color={
                      parseFloat(publicData.soyAvgPrice) < parseFloat(cakePrice.toString()) ?
                      'red':
                      'primary'
                    }
                  >1 SOY = {publicData? parseFloat(publicData.soyAvgPrice) !== 0 && parseFloat(publicData.soyAvgPrice) < 0.0001 ? '<0.0001' : parseInt((publicData.soyAvgPrice * 10000).toString()) / 10000 : 0} USD
                  </Text>
                </AutoRow>
                <AutoRow justify='space-between' style={{ padding: '0 1rem' }}>
                  <Text>Minimum Price</Text>
                  <Text>1 SOY = {publicData? parseFloat(publicData.minPrice) !== 0 && parseFloat(publicData.minPrice) < 0.0001 ? '<0.0001' : parseInt((publicData.minPrice * 10000).toString()) / 10000 : 0} USD</Text>
                </AutoRow>
                <AutoRow justify='space-between' style={{ padding: '0 1rem' }}>
                  <Text>Maximum Price</Text>
                  <Text>1 SOY = {publicData? parseFloat(publicData.maxPrice) !== 0 && parseFloat(publicData.maxPrice) < 0.0001 ? '<0.0001' : parseInt((publicData.maxPrice * 10000).toString()) / 10000 : 0} USD</Text>
                </AutoRow>
              </AutoColumn>} */}
              <CurrencyInputPanel
                label={independentField === Field.OUTPUT && !showWrap && trade ? t('') : t('')}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
              />
            </AutoColumn>
            <Box mt="1rem">
              {
                !allowance && otherToken.address !== undefined && !approveStatus.includes(`[${otherToken.symbol}]`) ?
                <Button
                  variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                  onClick={async () => {
                    if (account) {
                      setTxPending(true)
                      try{
                        const res = await onApprove(getAddress(otherToken.address))
                        if (res) {
                          toastSuccess("Success!", "Approved successfully.")
                          setTxPending(false)
                          setApproveStatus(`${approveStatus}[${otherToken.symbol}]`)
                        } else {
                          toastWarning("Warning!", "Rejected transaction.")
                          setTxPending(false)
                        }
                      } catch(err) {
                        toastError("Error!", "Approving failed.")
                        setTxPending(false)
                      }
                    } else {
                      console.error("connect wallet!")
                    }
                  }}
                  id="swap-button"
                  width="100%"
                  disabled
                  // disabled={!account}
                >
                  {
                    txPending?
                    <CircleLoader />:
                    'Approve'
                  }
                </Button>:
                <Button
                  variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                  onClick={() => {
                    if (account) {
                      handleSubmit()
                    } else {
                      console.error("connect wallet!")
                    }
                  }}
                  id="swap-button"
                  width="100%"
                  disabled
                  // disabled={!account || balance === '0' || parseFloat(formattedAmounts[Field.INPUT]) > parseFloat(balance) || parseFloat(formattedAmounts[Field.INPUT]) === 0 || formattedAmounts[Field.INPUT] === ''}
                >
                  {txPending?
                  <CircleLoader />:
                  `IDO is closed`
                  //  account && parseFloat(formattedAmounts[Field.INPUT]) > parseFloat(balance) ?
                  // `Insufficient balance`:
                  // `Submit Your Bid`
                  }
                </Button>}
            </Box>
          </Wrapper>
        </AppBody>
        {account && hasBidder && <SpacerH />}
        {account && hasBidder && <SpacerV />}
        {account && hasBidder && <BidderWrapper>
          <BidderHeader title={t('Bidder Statistics')} handleClick={() => handleClaim()} loading={claimPending} claimAmount={soyToClaim}/>
          <Wrapper id="swap-page">
              <AutoColumn justify="space-between">
                {
                  statistics.map((item, index) => {
                    if (item.unlockDate === 0) return null
                    return (
                      <BidderStatus item={item} key={item.id} prevSoyPrice={publicData ? publicData.prevSoyUsdPrice[index] : 0} />
                    )
                  })
                }
              </AutoColumn>
          </Wrapper>
        </BidderWrapper>}
      </CustomRow>
    </IDOPage>
  )
}
