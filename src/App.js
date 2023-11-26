import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroceryItem from './components/GroceryItem';
import PriceTable from './components/PriceTable';
import GoToCart from './components/GoToCart';
import Orders from './components/Orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroceryItem/>} />
        <Route path="/price" element={<PriceTable/>} />
        <Route path="/cart" element={<GoToCart/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
