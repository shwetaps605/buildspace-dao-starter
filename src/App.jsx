import { useEffect, useMemo, useState } from "react"
import { useWeb3 } from "@3rdweb/hooks"
import { ThirdwebSDK } from "@3rdweb/sdk"

//We instantiate the sdk on Rinkeby
const sdk = new ThirdwebSDK("rinkeby")

//Referencing to our ERC-1155 contract
const bundleDropModule = sdk.getBundleDropModule("0x3767dA90E2A1a9B9202BFe781D1503be537f0993")
console.log("This is BUNDLEDROPMODULE",bundleDropModule);

const App = () => {

  //thirdweb gives us the following hooks
  const {connectWallet, address, error, provider } = useWeb3()
  console.log("👋 Address:",address)

  //Signer is required to sign transactions on the blockchain
  //Without it we can only read data and not write
  //const signer = provider ? provider.getSigner : undefined

  //State variable for us to know if the user has out NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
  //isClaiming lets us easily keep a loading state while the NFT is minting
  const [isClaiming, setIsClaiming] = useState(false)

  // useEffect(() => {
  //   //We pass the signer to our SDK which enables us to interact with our deployed contract
  //   sdk.setProviderOrSigner(signer)
  // },[signer])

  useEffect(()=>{
    //if they don't have a wallet connected, exit!
    if(!address) {
      return
    }

    return bundleDropModule
    .balanceOf(address, "0") //checks if the User has out NFT --> Does this user own a token with id 0 where 0 is the tokenId of our membership?
    .then(balance => {
      //if balance is greater than 0, means they have our NFT
      if(balance.gt(0)){
        setHasClaimedNFT(true)
        console.log("This user has a membership NFT");
      } else {
        setHasClaimedNFT(false)
        console.log("This user doesn't have a membership NFT yet");
      }
    })
    .catch(error => {
      setHasClaimedNFT(false)
      console.log("Failed to get NFT balance");
    })
    
  }, [address])
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

  

//   const mintNft = () => {
//    setIsClaiming(true)
//    //Call bundleDropModule.claim("0",1) to mint nft to user's wallet 
//    bundleDropModule
//    .claim("0",1)
//    .catch(err => {
//      console.error("Failed to claim membership NFT :(",err)
//      setIsClaiming(false)
//    })
//    .finally(()=>{
//      setIsClaiming(false)
//      setHasClaimedNFT(true)
//      console.log(`Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
//    })
//  }
  //This is the case where we have the user's address which means they have connected their wallet to our site
  // return (
  //   <div className="mint-nft">
  //     <h1>Mint your free DAO Membership NFT</h1>
  //     <button disabled={isClaiming} onClick={()=>mintNft()}>
  //       {isClaiming ? "Minting..." : "Mint your NFT (freeee)"}
  //     </button>
  //   </div>
  // )
  
}

export default App;
