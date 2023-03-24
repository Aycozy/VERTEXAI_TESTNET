import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { shortenAddress } from "../utils/shortenAddress";


import { NEFERTI } from '../assets';
import { TransactionContext } from "../context/TransactionContext";

const NavBarItem = ({ title, classprops, linkTo}) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    <Link to={linkTo}>{title} </Link>
    </li>
);

const Navbar = () => {

const NavbarItems = [{ title: "HOME", linkTo: "/" }, { title: "CREATE AI NFT", linkTo: "/sellNFT" }, { title: "PROFILE", linkTo: "/PROFILE" }, ]
  const  {connectWallet, currentAccount, address, disconnectWallet} = useContext(TransactionContext);
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5]  flex-initiasl justify-center items-center">
        <img src={NEFERTI} alt="logo" className="w-32 h-[50px] cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-end items-center flex-initial">
        {NavbarItems.map((item, index,) => (          
          <NavBarItem key={item.title + index} title={item.title} linkTo={item.linkTo} />
        ))}
        <div className="flex flex-col">
       <li>
        {!currentAccount ?( <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWallet}>{!currentAccount? "connect" : "connected"}</button>):(
        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={disconnectWallet}>{!currentAccount? "connect" : "connected"}</button>
        )}
        </li>
       <div className='text-white text-bold text-right mr-10 text-sm'>
          {address !== "0x" ? "Connected to": 'Please connect metaMask to view NFTs'} {address !== "0x" ? shortenAddress(address):""}
        </div>
        </div>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {NavbarItems.map(
              (item, index) => <NavBarItem key={item.title + index} title={item.title} linkTo={item.linkTo} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
