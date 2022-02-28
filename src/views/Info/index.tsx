import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { PoolUpdater, ProtocolUpdater, TokenUpdater } from 'state/info/updaters'
import InfoNav from './components/InfoNav'
import Overview from './Overview'
import Pools from './Pools'
import PoolPage from './Pools/PoolPage'
import Tokens from './Tokens'
import RedirectInvalidToken from './Tokens/redirects'

const Container = styled.div`
  width: 100%;
  @media screen and (max-width: 768px) {
    width: calc(100% - 2px);
  }
`

const Info: React.FC = () => {
  return (
    <Container>
      <ProtocolUpdater />
      <PoolUpdater />
      <TokenUpdater />
      <InfoNav />
      <Route path="/info" exact>
        <Overview />
      </Route>
      <Route path="/info/pools" exact>
        <Pools />
      </Route>
      <Route path="/info/tokens" exact>
        <Tokens />
      </Route>
      <Route exact path={['/info/tokens/:address', '/info/token/:address']} component={RedirectInvalidToken} />
      <Route exact path={['/info/pools/:address', '/info/pool/:address', '/info/pair/:address']} component={PoolPage} />
    </Container>
  )
}

export default Info
