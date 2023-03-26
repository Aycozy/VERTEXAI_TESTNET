import React, { useEffect, useState, } from "react";
import { ethers } from "ethers";
import { useLocation, useParams } from 'react-router-dom';
import {Data} from '../utils/marketPlace'
import {uploadJSONToIPFS, uploadFileToIPFS} from '../utils/pinata.js'
import MarketplaceJSON  from "../Marketplace.json";
import axios from "axios";


export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);

  return transactionsContract;
};


export const TransactionsProvider = ({ children }) => {
  const [formParams, updateFormParams] = useState({ Name: "", description: "", price : ""});
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState('');
  const [currentAccount, setCurrentAccount] = useState("");
  const [data, updateData] = useState(Data);
  const [dataFetched, updateFetched] = useState(false);
  const [address, currAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  const [profData, updateProfData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, updateNft] = useState([]);
  const [local, setLocal] = useState(true);
  const [base, setBase] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

let photo;


  const params = useParams();
  const tokenId = params.tokenId;
console.log("token id",tokenId);

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

       
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const disconnectWallet = async () => {
    try {
      if ( window.ethereum !== 'undefined' && window.ethereum.isConnected()) 
        window.disconnect()
      }
      catch (error) {
        console.log(error);
      }
      }



  const  getAddress = async ()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    
    currAddress(addr);
  }



  const OnChangeFile = async (e)=>  {
    var file = e.target.files[0];
    //check for file extension
    try {
        //upload the file to IPFS
        const response = await uploadFileToIPFS(file);
        if(response.success === true) {
            console.log("Uploaded image to Pinata: ", response.pinataURL)
            setFileURL(response.pinataURL);
        }
    }
    catch(e) {
        console.log("Error during file upload", e);
    }
}

//This function uploads the metadata to IPFS
const uploadMetadataToIPFS =  async ()=> {
    const {name, description, price} = formParams;
    //Make sure that none of the fields are empty
    if( !name || !description || !price || !fileURL)
        return;

    const nftJSON = {
        name, description, price, image: fileURL
    }

    try {
        //upload the metadata JSON to IPFS
        const response = await uploadJSONToIPFS(nftJSON);
        if(response.success === true){
            console.log("Uploaded JSON to Pinata: ", response)
            return response.pinataURL;
        }
    }
    catch(e) {
        console.log("error uploading JSON metadata:", e)
    }
}

const listNFT = async (e)=>  {
    e.preventDefault();

    //Upload data to IPFS
    try {
        const metadataURL = await uploadMetadataToIPFS();

        updateMessage("Please wait.. listing NFT (upto 5 mins)")

        //Pull the deployed contract instance
        let contract = createEthereumContract();

        //massage the params to be sent to the create NFT request
        const price = ethers.utils.parseUnits(formParams.price, 'ether')
        let listingPrice = await contract.getListPrice()
        listingPrice = listingPrice.toString()

        //actually create the NFT
        let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
        await transaction.wait()

        alert("Successfully listed your NFT!");
        updateMessage("");
        updateFormParams({ name: '', description: '', price: ''});
        window.location.replace("/")
    }
    catch(e) {
        alert( "Upload error"+e )
    } 
}   

    const getAllNFTs = async () => {
  
    //Pull the deployed contract instance
    let contract = createEthereumContract();
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
    
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
       
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
       
    }))
    
    updateFetched(true);
    updateData(items);
}


  const getNFTData = async()=> {
      
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    
    let contract = createEthereumContract();

    //create an NFT Token
    let transaction = await contract.getMyNFTs()

    
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        sumPrice += Number(price);
        return item;
    }))
    updateProfData(items);
    updateTotalPrice(sumPrice.toPrecision(3));
}

const buyNFT = async(tokenId)=> {
 
  try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
      const salePrice = ethers.utils.parseUnits(data.price, 'ether')
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {value:salePrice});
      await transaction.wait();

      alert('You successfully bought the NFT!');
      updateMessage("");
  }
  catch(e) {
      alert("Upload Error"+e)
  }
}


const tokenData = async (tokenId) =>{
  let contract = createEthereumContract();
     const tokenURI = await contract.tokenURI(tokenId);
     const listedToken = await contract.getListedTokenForId(tokenId);
     let meta = await axios.get(tokenURI);
    
     meta = meta.data;
     console.log("meta", listedToken);
 
     let item = {
         price: meta.price,
         tokenId: tokenId,
         seller: listedToken.seller,
         owner: listedToken.owner,
         image: meta.image,
         name: meta.name,
         description: meta.description,
     }
     updateNft(item);
    }
   
   // tokenData(tokenId); 
  
useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentIndex((currentIndex + 1) % 3);
   
  }, 5000); // Change the interval time as needed (in milliseconds)
  return () => clearInterval(intervalId);

}, [currentIndex]);

useEffect(() => {
  checkIfWalletIsConnect();
  getAddress();
  getAllNFTs();
  getNFTData();  
}, []);

const sendTO = async(pic) => {
  const response = await fetch(pic);
  const blob = await response.blob();
   const file = new File([blob], "file.jpeg", { type: "image/jpeg" });
  photo = file;
  console.log("pico", photo);
  AiFile();
}




const AiFile = async (e)=>  {
  var file = photo;
  //check for file extension
  try {
      //upload the file to IPFS
      updateMessage("Please wait.. minting (upto 5 mins)")
      const response = await uploadFileToIPFS(file);
      if(response.success === true) {
          console.log("Uploaded image to Pinata: ", response.pinataURL)
          setFileURL(response.pinataURL);
      }
      updateMessage("");
  }
  catch(e) {
      console.log("Error during file upload", e);
  }
}

const handleLocal = () => {
   setLocal(!local);
   setBase(!base);
}

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        formParams,
        updateFormParams,
        OnChangeFile,
        listNFT,
        getAllNFTs,
        dataFetched,
        data,
        message,
        profData,
        totalPrice,
        address,
        buyNFT,
        nftData,
        sendTO,
        disconnectWallet,
        fileURL,
        local,
        handleLocal,
        base,
        currentIndex
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
