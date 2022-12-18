import { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import Router from 'next/router'

const style = {
  wrapper: `bg-[#303339] flex-auto max-w-[15rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
}

function NFTCard({nftItem, title, listings}) {

  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)

  useEffect(() => {

    //Loop through the 18 NFT, 1 by 1
    for(const listing of listings) {  
      
      //Check listed asset ID and nft ID matches, if match set the price and listed 
      if(listing.asset.id === nftItem.id){ 
        setIsListed(true)
        setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
        break
      }
      
    }

  }, [listings, nftItem])

  return (
    <div 
      className={style.wrapper}
      onClick={() => {
        Router.push({
          pathname: `/nfts/${nftItem.id}`,
          query: {isListed: isListed}
        })
      }}
    >
      <div className={style.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className="h-full w-full" />
      </div>

      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.assetName}>{nftItem.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img 
                  src="https://ethereum.org/static/a183661dd70e0e5c70689a0ec95ef0ba/6ed5f/eth-diamond-purple.webp" 
                  alt="eth"
                  className={style.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>

        <div className={style.likes}>
          <span className={style.likeIcon}>
            <BiHeart />
          </span> {' '}
          {nftItem.likes ? nftItem.likes : '0'}
        </div>
      </div>
    </div>
    
  )
}

export default NFTCard