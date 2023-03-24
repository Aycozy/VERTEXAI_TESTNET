import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


import { Navbar, Profile, NFTPage, Footer} from './components';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter className='bg-black'>
  <header className='gradient-bg-welcome'>
<Navbar/>
    </header>
    <main className="pt-4 w-full bg-[#f9fafe]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nftPage" element={<NFTPage />}/>        
        <Route path="/sellNFT" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </main>
    <Footer/>   
  </BrowserRouter>
);

export default App;
