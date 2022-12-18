import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

//Thirdweb
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
// import { ethers } from 'ethers'
// import { ThirdwebSDK } from '@thirdweb-dev/sdk'


//Sanity
import { client } from '../../lib/sanityClient'

//Components
import Header from '../../components/Header.jsx'
import NFTCard from '../../components/NFTCard.jsx'

//Icons 
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import { VscGlobe } from 'react-icons/vsc'
import { FaDiscord } from 'react-icons/fa'
import ethIcon from '../../public/eth-diamond-purple.webp'


const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2 cursor-pointer`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

/** 1. nftModule **/
/**
  1. Get NFT module using the Third web sdk, with the wallet provider and alchemy api 
    1a. If there is no provider return nothing
    1b. Until it gets a provider, create a new instance of third web SDK, Third web SDK takes 
      in wallet signer and an optional network API key.

      i. Get the signer of the provider (e.g Metamask signer)
      ii. API key from alchemy API for rinkeby network

    1c. Return the nfts module, which contains all the nfts minted on thirdwebSDK website
      i. The getNFTModule() function takes in the nft collection address of the NFT module (Get it from thirdweb website)

    1d. Takes in the provider as dependency
**/

/** 2. useEffect to retrieve nfts **/
/** 
  2. After getting NFT module, use it to retrieve all the nfts
    2a. If there is no nftModule return nothing
    2b. Until it gets a nftModule, run anonymous async function (IIFE)

      i. Get all the nfts from nftModule
      ii. Set the nfts to the variable

    2c. IIFE, immediately run this anonymous function 
    2d. Takes in the nftModule as dependency
**/

/** 3. marketPlaceModule**/
/** 
  3.Get market place module using the Third web sdk, with the wallet provider and alchemy api 
    3a. If there is no provider return nothing
    3b. Until it gets a provider, create a new instance of third web SDK, Third web SDK takes 
      in wallet signer and an optional network API key.

      i. Get the signer of the provider (e.g Metamask signer)
      ii. API key from alchemy API for rinkeby network

    3c. Return the market place module, which contains all the listed nfts on thirdwebSDK website
      i. The getMarketplaceModule() function takes in the address of the market place module (Get it from thirdweb website)

    3d. Takes in the provider as dependency
**/

/** 4. useEffect to retrieve market place listed nfts **/
/**
  4. After getting market place module, use it to retrieve all the listed nfts
    4a. If there is no marketPlaceModule return nothing
    4b. Until it gets a marketPlaceModule, run anonymous async function (IIFE)

      i. Get all the listed nfts from marketPlaceModule
      ii. Set the nfts to the variable

    4c. IIFE, immediately run this anonymous function 
    4d. Takes in the marketPlaceModule as dependency
**/

function Collection() {
  const router = useRouter() //Next.js router
  const { provider } = useWeb3() //Wallet provider (eg. Metamask)
  // const rpcUrl = 'https://eth-rinkeby.alchemyapi.io/v2/8WA2tslRLPEhqA2_CQNi5Z4PprgZltw8'
  // const provider = ethers.getDefaultProvider(rpcUrl)
  const { collectionId } = router.query //Get Collection id from router, this collectionid is set from Header.jsx
  const [collection, setCollection] = useState({}) //NFT Collection (All NFTs)
  const [nfts, setNfts] = useState([]) //NFTs (NFT itself)
  const [listings, setListings] = useState([]) //NFT Listings ()

  const nftModule = useMemo(() => {//1.
    if (!provider) return //1a.

    const sdk = new ThirdwebSDK( //1b.
      provider.getSigner() //1b i.
      // provider
      // 'https://eth-rinkeby.alchemyapi.io/v2/8WA2tslRLPEhqA2_CQNi5Z4PprgZltw8' //1b ii.
    )

    return sdk.getNFTModule(collectionId) //1c. //1ci.
  }, [provider]) //1d.

  useEffect(() => { //2.
    if (!nftModule) return //2a.
    
    ;(async () => { //2b.     
      const nfts = await nftModule.getAll() //2bi.
      setNfts(nfts) //2bii.
    })() //2c.
  }, [nftModule]) //2d.

  const marketPlaceModule = useMemo(() => { //3.
    if (!provider) return //3a.

    const sdk = new ThirdwebSDK( //3b.
      provider.getSigner() //3bi.
      // provider
      // 'https://eth-rinkeby.alchemyapi.io/v2/8WA2tslRLPEhqA2_CQNi5Z4PprgZltw8' //3bii.
    )

    return sdk.getMarketplaceModule( //3c. //3ci.
      '0xbA384a67BA2b45C80387d59333DB2452f79e5B95'
    )
  }, [provider]) //3d.

  useEffect(() => { //4.
    if (!marketPlaceModule) return //4a.

    ;(async () => { //4b.
      const listedNfts = await marketPlaceModule.getAllListings() //4bi.
      setListings(listedNfts) //4bii.
    })() //4c.
  }, [marketPlaceModule]) //4d.

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`
    

    const collectionData = await sanityClient.fetch(query) //Wait for sanity client to fetch the data by using the query
    setCollection(collectionData[0]) //Set the collection of the data retrieve 
  }

  useEffect(() => { //UseEffect to run the query to fetch data, and set collection  
    fetchCollectionData()
  }, [collectionId])

  const openUrl = (url) => window.open(url,'popUpWindow') //For opening new tab for different BAYC websites

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : 'https://via.placeholder.com/200'
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://via.placeholder.com/200'
            }
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon} onClick={() => openUrl('https://boredapeyachtclub.com/#/')}>
                  <VscGlobe />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon} onClick={() => openUrl('https://discord.com/invite/3P5K3dzgdB')}>
                  <FaDiscord />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon} onClick={() => openUrl('https://twitter.com/BoredApeYC')}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon} onClick={() => openUrl('https://www.instagram.com/boredapeyachtclub/?hl=en')}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={style.midRow}>
          <div className={style.title}>
            {collection?.title}
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by {' '}
            <span className="text-[#2081e2]"> {collection?.creator}</span>
          </div>
        </div>
        
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>

            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
              </div>
              <div className={style.statName}>owners</div>
            </div>

            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img 
                  src='/eth-diamond-purple.webp' 
                  alt="eth" 
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>

            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img 
                  src="/eth-diamond-purple.webp" 
                  alt="eth" 
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>

        <div className={style.midRow}>
          <div className={style.description}>
            {collection?.description}
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {nfts.map((nftItems, id) => (
            <NFTCard
              key={id}
              nftItem={nftItems}
              title={collection?.title}
              listings={listings}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
