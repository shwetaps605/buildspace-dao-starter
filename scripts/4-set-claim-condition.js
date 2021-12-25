import sdk from './1-initialize-sdk.js'

const bundleDrop = sdk.getBundleDropModule("0x3767dA90E2A1a9B9202BFe781D1503be537f0993")

const setClaimCondition = async () => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory()
        //Specify conditions
        claimConditionFactory.newClaimPhase({
            //startTime is the when users are allowed to start minting NFTs 
            //in this case we set it to current time meaning minting can start immediatedly
            startTime:new Date(),
            //maxQuantity is the max number of membership NFTs that can be minted
            maxQuantity:50_000,
            //maxQuantityPerTransaction specifies how many tokens someone can claim in a single transaction
            // we have set it to one because we only want users minting one NFT at a time
            maxQuantityPerTransaction: 1
        })
        
        //this will actually interact with our deployed contract on-chain and adjust the conditions
        //our membership NFT has a tokenId of 0 since it's the first token in our ERC-1155 contract.
        await bundleDrop.setClaimCondition(0, claimConditionFactory)
        console.log("Successfully set claim condition on bundle drop:",bundleDrop.address)
    } catch(err) {
        console.error("Failed to set claim condition",error);
    }
}

setClaimCondition()