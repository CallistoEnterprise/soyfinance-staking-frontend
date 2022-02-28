import React from 'react'
import { Menu as UikitMenu } from '@soy-libs/uikit2'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
// import useGetPriceData from 'hooks/useGetPriceData'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import { addSoyToMetamask } from 'utils/wallet'
import config from './config'
import UserMenu from './UserMenu'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const soyPriceUsd = usePriceCakeBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  // const priceData = useGetPriceData()
  // const cloPriceUsd = priceData? Number(priceData.callisto.usd) : undefined

  return (
    <UikitMenu
      userMenu={<UserMenu />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage?.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={soyPriceUsd.toNumber()}
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      addSoyToMetamask={addSoyToMetamask}
      {...props}
    />
  )
}

export default Menu
