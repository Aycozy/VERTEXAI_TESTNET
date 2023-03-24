import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import NFTTile from "./NFTTile";
import { TransactionContext } from "../context/TransactionContext";

export default function Profile () {
    const  { profData, address, totalPrice} = useContext(TransactionContext);

    
    

    return (
        <div className="profileClass min-h-full">
            <div className="profileClass">
            <div className="flex text-center flex-col mt-11 md:text-2xl text-black">
                <div className="mb-5">
                    <h2 className="font-bold">Wallet Address</h2>  
                    {address}
                </div>
            </div>
            <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-black">
                    <div>
                        <h2 className="font-bold">No. of NFTs</h2>
                        {profData.length}
                    </div>
                    <div className="ml-20">
                        <h2 className="font-bold">Total Value</h2>
                        {totalPrice} ETH
                    </div>
            </div>
            <div className="flex flex-col text-center items-center mt-11 text-black">
                <h2 className="font-bold">Your NFTs</h2>
                <div className="flex justify-center flex-wrap max-w-screen-xl">
                    {profData.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                    })}
                </div>
                <div className="mt-10 text-xl">
                    {profData.length == 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
        </div>
    )
};