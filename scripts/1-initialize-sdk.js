import { ThirdwebSDK } from "@3rdweb/sdk"
import  ethers  from "ethers"
import dotenv from "dotenv"
dotenv.config()

//Some quick checks to make sure that our .env is working
if( !process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
    console.log("Private Key not found!")
}

if( !process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == ""){
    console.log("Alcehmy Api Url not found!!!!")
}

if( !process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == ""){
    console.log("Wallet Address not found man!!")
}

//Initializing thirdweb wit our private key and the RPC Url
const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
    )
);

//We are basically fetching or retriving the project here that we made using thirdweb's web app
(async () => {
    try {
        const apps = await sdk.getApps();
        console.log("Your app address is:", apps[0].address)
    }catch(err){
        console.error("Failed to get apps from the sdk", err)
        process.exit()
    }
})()

//We are exporting the initialized thirdweb SDK so that we can use it other script
export default sdk;