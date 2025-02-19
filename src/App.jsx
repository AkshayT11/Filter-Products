import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetails';

const App = () => {

  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App
