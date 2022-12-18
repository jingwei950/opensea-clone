import Header from '../components/Header'
import Hero from '../components/Hero'
import { useWeb3 } from '@3rdweb/hooks' //Install web3 hook (yarn add @3rdweb/hooks)
// import { useAddress , useMetamask, useWalletConnect,
//   useCoinbaseWallet, } from '@thirdweb-dev/react'
import { useEffect } from 'react';
import { client } from '../lib/sanityClient' //Install sanity client (yarn add @sanity/client)
import WalletButton from '../components/WalletButton'
import toast, {Toaster} from 'react-hot-toast'

const style = {
  wrapper: `w-full h-full overflow-x-hidden`,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

function Home() {
  const {address, connectWallet} = useWeb3(); //Web 3 hook, allow us to access wallet address and connectWallet
  // const address = useAddress()
  // const metamask = useMetamask()
  // const walletConnect = useWalletConnect()
  // const coinBase = useCoinbaseWallet()
  
  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
    {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    }
    )
  }

  useEffect(() => {
    if(!address) return; //If the address is not available from the web3 hook, return
    //Else if there's address create client with type, id, username and wallet address
    (async() => {
      const userDoc ={
        _type: 'users', //Type must be "_type"
        _id: address,   //Id must be "_id"
        userName: 'Unnamed',  //Assign the username field as 'Unnamed'
        walletAddress: address //Assign the walletAddress field in sanity with the metamask address user signe in with
      }

      //Function to create only if user does not exist, and pass in the userDoc to create user in Sanity 
      const result = await client.createIfNotExists(userDoc);
      welcomeUser(result.userName);
    })()
    
  }, [address])
  
  return (
    <div className={style.wrapper}>
      <Toaster position="bottom-left" reverse={false} />
      {address? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          {/* <button 
            className={style.button}
            onClick={() => connectWallet('injected')}
          >
            Connect Wallet
          </button> */}
          {/* <WalletButton title={'Metamask'} onClick={() => metamask()} />
          <WalletButton title={'Wallet Connect'} onClick={() => walletConnect()} />
          <WalletButton title={'Coinbase wallet'} onClick={() => coinBase()} /> */}

          <WalletButton title={'Metamask'} onClick={() => connectWallet('injected')} />
          <WalletButton title={'Wallet Connect'} onClick={() => connectWallet('walletconnect')} />
          <WalletButton title={'Coinbase wallet'} onClick={() => connectWallet('walletlink')} />

          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app
          </div>
        </div>
      )}
    
    </div>
  )
}

export default Home
