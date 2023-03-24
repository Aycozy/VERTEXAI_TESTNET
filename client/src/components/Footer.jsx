import React from "react";
import {discord, instagram, telegram, twitter, alchemy } from '../assets';

import NEFERTI  from '../assets/NEFERTI.png';

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
   <div className="w-full flex flex-row items-center justify-center"> 
<div className="w-[700px]">

</div>
    <div className="flex flex-row w-[1000px] mt-5 ">
         <div className="pr-20 w-2/3 pl-10">
    <img src={NEFERTI} alt="logo" className="w-32" />
    </div>
    <div className='flex flex-row  space-x-2 w-1/3 '>
                     <img src ={discord} height={25} width={25}/>
                     <img src ={instagram} height={25} width={25}/>
                     <img src ={telegram} height={25} width={25}/>
                     <img src ={twitter} height={25} width={25}/>
      </div>
    </div>
  </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">Vertexai2022</p>
      <div className="flex text-1xl space-x-1">
       <h3 className="text-white">Powered by</h3>
      <img src={alchemy} width={80} height={35}  />
      </div>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
