import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@soy-libs/uikit2'
import { useTranslation } from 'contexts/Localization'

const StyledNav = styled.nav`
  margin-bottom: 40px;

  .d-none {
    @media screen and (max-width: 560px) {
      display: none;
    }
  }
`

const getActiveIndex = (pathname: string): number => {
  if (
    pathname.includes('/pool') ||
    pathname.includes('/create') ||
    pathname.includes('/add') ||
    pathname.includes('/remove') ||
    pathname.includes('/find') ||
    pathname.includes('/liquidity')
  ) {
    return 1
  }
  return 0
}

const Nav = () => {
  const location = useLocation()
  const { t } = useTranslation()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={getActiveIndex(location.pathname)} >
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {t('Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {t('Liquidity')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-bridge" href="https://callistobridge.netlify.app/" as="a" target="_blank">
          {t('Bridge')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-choam" className="d-none" href="https://choamtoken.com/publicsale" as="a" target="_blank">
          {t('CHOAM Sale')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
