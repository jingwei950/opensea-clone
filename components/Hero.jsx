import React from 'react'
import Link from 'next/link'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const style = {
    wrapper: `relative`,
    container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
    contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/3`,
    title: `relative text-white text-[46px] font-semibold`,
    description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
    cardContainer: `rounded-[3rem]`,
    infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    name: ``,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

function Hero() {
  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <div className={style.contentWrapper}>
                <div className={style.copyContainer}>
                    <div className={style.title}>
                        Discover, collect, and sell extraordinary NFTs
                    </div>
                    <div className={style.description}>
                        OpenSea is the world&apos;s first and largest NFT marketplace
                    </div>
                    <div className={style.ctaContainer}>
                        <Link href="/collections/0x14d2f26e53A0c1cfA3cc9dc22b0d7f6A8eFdb0F3"> 
                            <button className={style.accentedButton} >Explore</button>
                        </Link>
                        <button className={style.button}>Create</button>
                    </div>
                </div>
                <div className={style.cardContainer}>
                    <img 
                        className='rounded-t-lg' 
                        src="https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=s400" 
                        alt="" 
                    />
                    <div className={style.infoContainer}>
                        <img 
                            className='h-[2.25rem] rounded-full' 
                            src="https://lh3.googleusercontent.com/zdl4N8uNHWXIViwvE0Pxs6Fk-JPl9tJYu44yr_ECdGOoXv6DhHPgGOrQn9Td_GYKt8HoXyY4UX279mpiKfvedzz5rGRca-KYV6B0Jw=s80" 
                            alt=""
                        />
                        <div className={style.author}>
                            <div className={style.name}>Jolly</div>
                            <a className='text-[#1868b7]' href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/47882286388812425489297765321044516098401142799463715854337943822816973422593">
                                abahassan
                            </a>
                        </div>
                        <div className={style.infoIcon}>
                            <AiOutlineInfoCircle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero