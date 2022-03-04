import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from "styled-components";
import { ResetCSS } from '@soy-libs/uikit2'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
// import { useFetchProfile } from 'state/profile/hooks'
// import { Assets } from 'assets/images';
import { DatePickerPortal } from 'components/DatePicker'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import history from './routerHistory'
import RouteChangeTracker from './RouteChangeTracker'
// Views included in the main bundle
import Pools from './views/Pools'
// import Swap from './views/Swap'
// import IDO from './views/IDO'
// import {
//   RedirectDuplicateTokenIds,
//   RedirectOldAddLiquidityPathStructure,
//   RedirectToAddLiquidity,
// } from './views/AddLiquidity/redirects'
// import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/group-soy.svg'), url('/images/left-soy.svg'), url('/images/right-soy.svg');
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// const Farms = lazy(() => import('./views/Farms'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
// const Liquidity = lazy(() => import('./views/Pool'))
// const PoolFinder = lazy(() => import('./views/PoolFinder'))
// const Info = lazy(() => import('./views/Info'))

// const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
// const IDOWeek = lazy(() => import('./views/IDOWeek'))
// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  // useFetchProfile()
  usePollCoreFarmData()

  return (
      <Router history={history}>
        <ResetCSS />
        <GlobalStyle />
        <RouteChangeTracker />
        <Wrapper>
          <Menu>
            <BodyWrapper>
              <SuspenseWithChunkError fallback={<PageLoader />}>
                <Switch>
                  <Route path="/" exact>
                    <Pools />
                  </Route>
                  {/* <Route path="/" exact>
                    <Home />
                  </Route> */}
                  {/* <Route exact path="/farms/auction">
                    <FarmAuction />
                  </Route> */}
                  {/* <Route path="/pools">
                    <Pools />
                  </Route> */}
                  {/* <Route path="/nft">
                    <Collectibles />
                  </Route> */}

                  {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
                  {/* <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} /> */}
                  {/* <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/liquidity" component={Liquidity} />
                  <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact path="/create" component={AddLiquidity} />
                  <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} /> */}
                  {/* <Route path="/info">
                    <Info />
                  </Route>
                  <Route path="/farms">
                    <Farms />
                  </Route> */}
                  {/* <Route exact strict path="/pools" component={Pools} /> */}
                  {/* <Route exact strict path="/ido" component={IDO} />
                  <Route exact strict path="/ido-week" component={IDOWeek} /> */}
                  {/* Redirect */}
                  {/* <Route path="/home">
                    <Redirect to="/swap" />
                  </Route> */}
                  {/* <Route path="/pool">
                    <Redirect to="/liquidity" />
                  </Route> */}
                  <Route path="/staking">
                    <Redirect to="/pools" />
                  </Route>
                  {/* <Route path="/psyrup">
                    <Redirect to="/pools" />
                  </Route> */}
                  {/* <Route path="/nft">
                    <Redirect to="/nft" />
                  </Route> */}

                  {/* 404 */}
                  {/* <Route component={NotFound} /> */}
                  <Route component={RedirectPathToSwapOnly} />
                </Switch>
              </SuspenseWithChunkError>
            </BodyWrapper>
          </Menu>
        </Wrapper>
        <EasterEgg iterations={2} />
        <ToastListener />
        <DatePickerPortal />
      </Router>
  )
}

export default React.memo(App)
