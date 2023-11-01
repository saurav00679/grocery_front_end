import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroceryItem from './components/GroceryItem';
import PriceTable from './components/PriceTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroceryItem/>} />
        <Route path="/price" element={<PriceTable/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
