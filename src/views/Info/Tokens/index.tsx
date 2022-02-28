import React, { useMemo, useEffect } from 'react'
// import { Text, Heading, Card } from '@soy-libs/uikit2'
import { Heading } from '@soy-libs/uikit2'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import { useAllTokenData } from 'state/info/hooks' // useTokenDatas
// import { useWatchlistTokens } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import TopTokenMovers from 'views/Info/components/TopTokenMovers'
import { renameTokens } from 'views/Info/utils/tokenInfoRename'

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr;
  margin: 8px 0;
  align-items: center;
`
const TokensOverview: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const allTokens = useAllTokenData()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => renameTokens(token.data))
      .filter((token) => token)
  }, [allTokens])

  // const [savedTokens] = useWatchlistTokens()
  // const watchListTokens = useTokenDatas(savedTokens)

  return (
    <Page>
      {/* <Heading scale="lg" mb="16px">
        {t('Your Watchlist')}
      </Heading> */}
      {/* {savedTokens.length > 0 ? (
        <TokenTable tokenDatas={watchListTokens} />
      ) : ( */}
        {/* <Card>
          <Text py="16px" px="24px">
            {t('Saved tokens will appear here')}
          </Text>
        </Card> */}
      {/* )} */}
      <ResponsiveGrid>
        <TopTokenMovers />
      </ResponsiveGrid>
      <Heading scale="lg" mt="40px" mb="16px" id="info-tokens-title">
        {t('All Tokens')}
      </Heading>
      <TokenTable tokenDatas={formattedTokens} />
    </Page>
  )
}

export default TokensOverview
