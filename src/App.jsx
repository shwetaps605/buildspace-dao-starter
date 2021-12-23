import { useEffect, useMemo, useState } from "react"
import { useWeb3 } from "@3rdweb/hooks"

const App = () => {

  //thirdweb gives us the following hooks
  const {connectWallet, address, error, provider } = useWeb3()
  console.log("👋 Address:",address)

  //This is the case where the user has not connected their wallet to your web app
  //So we let them call connectWallet

  if(!address){
    return(
      <div className="landing">
        <h1>Welcome to <span id='dao'>TheOfficeDAO</span></h1>
        <button onClick={()=> connectWallet("injected")} className="btn-hero">
          Connect Your Wallet
        </button>
      </div>
    )
  }

  //This is the case where we have the user's address which means they have connected their wallet to our site
  return (
    <div className="landing">
      <h1>👀 wallet connected, now what!</h1>
    </div>
  )
  
}

export default App;
