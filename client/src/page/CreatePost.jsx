import React, { useContext, } from 'react';
import { useNavigate } from 'react-router-dom';
import {MernImage, SellNFT } from '../components';
import { TransactionContext } from "../context/TransactionContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const  {fileURL, local, base, handleLocal} = useContext(TransactionContext);

    

  
  return (
    <section className='flex flex-row pl-10 pb-10 mb-5 ml-20 gap-14'> 
    <div className={local ? '': 'hidden'}>
      <MernImage  />
      </div>
{fileURL?(<SellNFT/>) : (<div></div>)
}
<div className={base? 'hidden' : ''}>
  <SellNFT/>
  <div className='pt-14 ml-14'>
        <h1>Would prefer to use an AI generated image, click below</h1>
        <button  className="mt-3 text-white bg-[#b31657] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleLocal}>Use AI image</button>
      </div>
   </div>
    </section>
  );
};

export default CreatePost;

