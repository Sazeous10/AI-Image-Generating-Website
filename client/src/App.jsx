import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { favicon } from './assets';
import { Home, CreatePost } from './pages';
const App = () => {
  return (
    <BrowserRouter>
      <header className='z-10 w-full flex justify-between items-center bg-white sm:px-8 px-4 border-b border-b-[#e6ebf4] fixed'>
        <Link to="/">
          <div className='flex p-2 rounded-md gap-2'>
          <img src={favicon} className='h-10'/>
            <h1 className='font-bold p-2'>Imagify AI</h1>
          </div>
        </Link>
        <Link to="/create-post"
        className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md shadow-xl hover:scale-105 hover:shadow-lg'>
          Generate
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)'>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/create-post" element={< CreatePost />} />
        </Routes>  
      </main>
    </BrowserRouter>
  )
}

export default App
