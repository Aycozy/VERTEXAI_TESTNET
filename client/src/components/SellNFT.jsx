import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TransactionContext } from "../context/TransactionContext";


export default function SellNFT () {
    const  {OnChangeFile, formParams, updateFormParams, listNFT, message, fileURL } = useContext(TransactionContext);
  
    const location = useNavigate();

  
 
  
    return (
        <div className="ml-14 mb-16 pb-24">
        <div className="flex flex-col place-items-center mt-5" id="nftForm">
            <form className=" text-black shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold  text-black mb-8 text-2xl">Upload your NFT to the marketplace</h3>
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block  text-black text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block  text-black text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
               {fileURL ?( <div></div>) : (
                <div>
                    <label className="block  text-black text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                </div> )}
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={listNFT} className="font-bold mt-10 w-full bg-[#6469ff]  text-white rounded p-2 shadow-lg">
                    List NFT
                </button>
            </form>
        </div>
        </div>
    )
}