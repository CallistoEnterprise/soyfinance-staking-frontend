import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'soyfinance',
  description:
    'The most popular AMM on Polygon by user count! Earn SOY through yield farming, then stake it in PSyrup Pools to earn more tokens!',
  image: 'http://localhost:3000/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('soyfinance')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('soyfinance')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('soyfinance')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('soyfinance')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('soyfinance')}`,
      }
    case '/info':
      return {
        title: `${t('Info')} | ${t('soyfinance')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('soyfinance')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('soyfinance')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('soyfinance')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('soyfinance')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('soyfinance')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('soyfinance')}`,
      }
    default:
      return null
  }
}
