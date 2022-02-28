import { ChainId } from '@soy-libs/sdk2'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getPmoonAddress = () => {
  return getAddress(tokens.soy.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getLocalFarmAddress = (farmAddresses) => {
  return getAddress(farmAddresses)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWmaticAddress = () => {
  return getAddress(tokens.wclo.address)
}
export const getDailyIdoAddress = () => {
  return getAddress(addresses.dailyIdo)
}
export const getWeeklyIdoAddress = () => {
  return getAddress(addresses.weeklyIdo)
}





export const getSousChefAddress = () => {
  return getAddress(addresses.sousChef)
}
export const getMaticStakingAddress = () => {
  return getAddress(addresses.maticStaking)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}
export const getPmoonVaultAddress = () => {
  return getAddress(addresses.pmoonVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
export const getBunnySpecialCakeVaultAddress = () => {
  return getAddress(addresses.bunnySpecialCakeVault)
}
export const getBunnySpecialPredictionAddress = () => {
  return getAddress(addresses.bunnySpecialPrediction)
}
export const getFarmAuctionAddress = () => {
  return getAddress(addresses.farmAuction)
}
