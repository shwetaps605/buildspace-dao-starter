import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import {readFileSync } from "fs";

const app = sdk.getAppModule("0xdF31D514dAeb937694601e2089C4528cC2Cdb6D6")

const deployBundleDrop = async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            //The NFT collection's name
            name: "TheOfficeDAO Membership",
            // A description for the collcation
            description: "A DAO for the fans of TheOffice",
            //The image for the collection that will show in OpenSea
            image:readFileSync("scripts/assets/token.png"),
            //The address passed is the address of the person who will recieve the proceeds from sales of the NFTs in the module
            //To charge people, give your wallet address if not give AddressZero 0x00
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log("Successfully deployed bundleDrop module, address", bundleDropModule.address)
        console.log("BundleDrop metadata:", await bundleDropModule.getMetadata())

    }
    catch(err){
        console.error("Failed to deploy the bundleDrop module",err)
    }
}

deployBundleDrop();