import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllProducts from './AllProducts/AllProducts'
import ProductInfoCard from './ProductInfoCard/ProductInfoCard'
import TrackedProducts from './TrackedProducts/TrackedProducts'

const Products = () => {
  return (
    <div className='products-main-wrapper'>
      <Routes>
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-products/:id" element={<ProductInfoCard />} />

        <Route path="/tracked-products" element={<TrackedProducts />} />
      </Routes>
    </div>
  )
}

export default Products