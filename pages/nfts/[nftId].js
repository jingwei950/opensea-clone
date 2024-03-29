import React, { useEffect, useState, useMemo } from 'react'
import Header from '../../components/Header'
import {useRouter} from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

function Nft() {
  const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  const nftModule = useMemo(() => { 
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // 'https://eth-rinkeby.alchemyapi.io/v2/8WA2tslRLPEhqA2_CQNi5Z4PprgZltw8'
    )

    return sdk.getNFTModule('0x14d2f26e53A0c1cfA3cc9dc22b0d7f6A8eFdb0F3')

  },[provider])

  useEffect( () => {
    if (!nftModule) return 
    
    ;(async () => {    
      const nfts = await nftModule.getAll()

      const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

      setSelectedNft(selectedNftItem)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if(!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // 'https://eth-rinkeby.alchemyapi.io/v2/8WA2tslRLPEhqA2_CQNi5Z4PprgZltw8'
    )

    return sdk.getMarketplaceModule(
      '0xbA384a67BA2b45C80387d59333DB2452f79e5B95'
    )

  }, [provider])

  useEffect(() => {
    if(!marketPlaceModule) return

    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
      console.log(marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  return (
    <div>
        <Header />
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.topContent}>
              <div className={style.nftImgContainer}>
                <NFTImage selectedNft={selectedNft}/>
              </div>
              <div className={style.detailsContainer}>
                <GeneralDetails selectedNft={selectedNft}/>
                <Purchase 
                  isListed={router.query.isListed}
                  selectedNft={selectedNft}
                  listings={listings}
                  marketPlaceModule={marketPlaceModule}
                />
              </div>
            </div>
            <ItemActivity />
          </div>
        </div>
        
    </div>
  )
}

export default Nft