import React, { useContext, useState, useEffect } from "react";
import {NFTTile} from './'
import {stock, mars, park} from '../assets/'


import { TransactionContext } from "../context/TransactionContext";



export default function Marketplace() {

    const  { data, currentIndex } = useContext(TransactionContext);
   

    const images = [
        { id: 1, src: stock },
        { id: 2, src: mars },
        { id: 3, src: park },
        
      ];
    


return (
    <div className="w-full gradient-bg-welcome mt-1">
        <div className="w-full flex flex-col place-items-center justify-items-end relative">
          <img src={images[currentIndex].src} alt='headerpic' className='w-full h-[500px]'/>
          <div className="pl-14 -mr-20 pt-10 mt-20 absolute">
        <h1 className="font-extrabold text-[#0f070d] font-serif text-[32px]"> UNLEASH YOUR CREATIVITY<br/>WITH AI GENERATED <br/> NFT's </h1>
        <a href="/sellNFT" className="font-bold mt-10 w-35 bg-[#261c63] bg-opacity-75 text-white rounded p-2 shadow-lg absolute">
                    Get started
                </a>
                </div>
        </div>
        <div className="flex flex-col place-items-center mt-10">
            <div className="md:text-xl font-bold font-serif text-white">
                AI Colletions
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((item, index) => {
                    return <NFTTile data={item} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}