import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllProducts from './AllProducts/AllProducts'
import ProductInfoCard from './ProductInfoCard/ProductInfoCard'

const Products = () => {
  return (
    <div className='products-main-wrapper'>
      <Routes>
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-products/:id" element={<ProductInfoCard />} />
      </Routes>
    </div>
  )
}

export default Products