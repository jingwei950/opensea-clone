import '../styles/globals.css'
import {ThirdwebWeb3Provider} from '@3rdweb/hooks'
// import  { ThirdwebProvider } from '@thirdweb-dev/react'

/**
 * The chain ID 4 represents the Rinkeby network
 * The `injected` connector is a web3 connection method used by Metamask
 */

const supportedChainIds = [80001] //4 means Polygon(Mumbai) chain (Can Google)
const connectors = {
  injected: {},                     //Metamask connector
  walletconnect: {},                //WalletConnect connector
  walletlink: {                     //Coinbase wallet connector
    appName: "opensea-clone",
    url: "http://localhost:3000/",
    darkMode: false,
  },
}
// const walletConnectors = {
//   [
//     { name: "injected", options: { shimDisconnect: false }},
//     { name: "walletLink", options: { appName: "Example App" }}
//   ]
// }

function MyApp({ Component, pageProps }) {
  return(
    <ThirdwebWeb3Provider 
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
