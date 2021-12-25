import sdk from "./1-initialize-sdk.js"
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule("0x3767dA90E2A1a9B9202BFe781D1503be537f0993")

const configNft = async () => {
    try {
        await bundleDrop.createBatch([
            {
                name:"Michael Scott Unleashed",
                description:"This NFT will give you access to TheOfficeDAO",
                image: readFileSync("scripts/assets/token.png")
            }
        ])
        console.log("Successfully created a new NFT in the drop")
    } catch(err) {
        console.error("Failed to create the new NFT", error);
    }
}

configNft();