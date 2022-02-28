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
    pathname.includes('/ido-week')
  ) {
    return 1
  }
  return 0
}

const NavForIDO = () => {
  const location = useLocation()
  const { t } = useTranslation()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={getActiveIndex(location.pathname)} >
        <ButtonMenuItem id="swap-nav-link" to="/ido" as={Link}>
          {t('Daily')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/ido-week" as={Link}>
          {t('Weekly')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default NavForIDO
