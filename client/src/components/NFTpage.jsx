import React, { useContext,  } from "react";


import { TransactionContext } from "../context/TransactionContext";

export default function NFTPage () {

    const  {nftData, buyNFT, message, currAddress,} = useContext(TransactionContext);

  
    



    return(
            <div className="flex ml-20 mt-20">
            <img src={nftData.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {nftData.name}
                    </div>
                    <div>
                        Description: {nftData.description}
                    </div>
                    <div>
                        Price: <span className="">{nftData.price + " ETH"}</span>
                    </div>
                    <div>
                        Owner: <span className="text-sm">{nftData.owner}</span>
                    </div>
                    <div>
                        Seller: <span className="text-sm">{nftData.seller}</span>
                    </div>
                    <div>
                    { currAddress == nftData.owner || currAddress == nftData.seller ?
                        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                        : <div className="text-emerald-700">You are the owner of this NFT</div>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
                
            </div>
    )
}