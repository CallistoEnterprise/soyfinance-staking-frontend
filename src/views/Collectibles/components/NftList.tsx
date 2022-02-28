import React from 'react'
import orderBy from 'lodash/orderBy'
import { useWeb3React } from '@web3-react/core'
import { Text } from '@soy-libs/uikit2'
import nfts from 'config/constants/nfts'
import { useAppDispatch } from 'state'
import { fetchWalletNfts } from 'state/collectibles'
import { useGetCollectibles } from 'state/collectibles/hooks'
import Dots from 'components/Loader/Dots'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import EasterNftCard from './NftCard/EasterNftCard'

/**
 * A map of bunnyIds to special campaigns (NFT distribution)
 * Each NftCard is responsible for checking it's own claim status
 *
 */
const nftComponents = {
  'easter-storm': EasterNftCard,
  'easter-flipper': EasterNftCard,
  'easter-caker': EasterNftCard,
}

const NftList = () => {
  const { tokenIds } = useGetCollectibles()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleRefresh = () => {
    dispatch(fetchWalletNfts(account))
  }

  return (
    <NftGrid>
      <Text fontSize="30px">
        <Dots>Comming Soon</Dots>
      </Text>
      {/* {orderBy(nfts, 'sortOrder').map((nft) => {
        const Card = nftComponents[nft.identifier] || NftCard

        return (
          <div key={nft.name}>
            <Card nft={nft} tokenIds={tokenIds[nft.identifier]} refresh={handleRefresh} />
          </div>
        )
      })} */}
    </NftGrid>
  )
}

export default NftList
