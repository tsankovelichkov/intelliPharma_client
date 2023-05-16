import "./AllProducts.scss"
import React, { useEffect, useState } from 'react';

import dataGridColumnsGenerator from "../../../functions/dataGridColumnsGenerator";
import DataGridTable from "../../../general-components/DataGridTable/DataGridTable";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { IconButton } from "@mui/material";
import { useFetch } from "../../../general-custom-hooks/useFetch";
import { Select } from "antd";
import { Link } from "react-router-dom";
import TrackCheckbox from "../../../general-components/TrackCheckbox/TrackCheckbox";
import { useAllProductsContext } from "../../../contexts/allProductsContext";

const AllProducts = () => {
     let [productsFilterSelect, setProductsFilterSelect] = useState()
     let [filterData, setFilterData] = useState()
     let [productId, setProductId] = useState()

     let {data,loading} = useAllProductsContext()

     useEffect(() => {
          if (productsFilterSelect === "matched-products") {
               setFilterData(data.filter(x => x.matchedProducts.length > 0))
          } else {
               setFilterData(data)
          }
     }, [productsFilterSelect, data])


     let columns = dataGridColumnsGenerator([
          { field: "productId", header: "Product ID", size: 0.4 },
          //{
           //    field: "track", header: "Track", function: (params) => {
           //         return <TrackCheckbox
           //              defaultValue={params.value ? params.value : false}
           //              url={`http://localhost:5000/all-products/${params.id}/update`}
           //         />
           //    }, size: 0.4
          //},
          //{ field: "image", header: "Image", size: 0.6 },
          { field: 'title', header: "Title", type: "bold", size: 1.4 },
          {
               field: 'regularPrice', header: "Regular Price", function: (params) => {
                    return <div className="allProducts-regularPrice">{params.value}</div>
               }, size: 0.6
          },
          {
               field: 'discountPrice', header: "Discount Price", function: (params) => {
                    if (params.value !== undefined) {
                         if (params.value === 0) {
                             return <div className="allProducts-discountPrice ">0.00</div>
                         } else {
                             return <div className="allProducts-discountPrice ">{params.value}</div>
                         }
                     }
               }, size: 0.6
          },
          { field: 'manufacturer', header: "Manufacturer", type: "bold", size: 0.7 },
          { field: 'retailCompanyLogo', header: "Retail Company", size: 0.7 },
          {
               field: "enter",
               header: "Enter",
               function: (params) => {
                    if (params.row.id) {
                         return (
                              <Link to={`/products/all-products/${params.row.id}`}>
                                   <IconButton>
                                        <ExitToAppIcon className="mui-data-grid-orange-button" />
                                   </IconButton>
                              </Link>
                         )
                    }
               },
               size: 0.4
          }
     ], "flex", true)

     return (
          <div className='allMatchedProducts-page-container'>
               <div className="allProducts-controls-container">
                    <Select
                         defaultValue="All"
                         style={{ width: 240 }}
                         onChange={(select) => setProductsFilterSelect(select)}
                         size="large"
                         options={[
                              { value: 'all', label: 'All' },
                              { value: 'matched-products', label: 'Only Matched Products' },
                         ]}
                    />
               </div>
               <DataGridTable
                    columns={columns}
                    outsourceData={filterData ? filterData : data}
                    rowHeight={100}
                    loading={loading}
                    onRowClick={(e) => setProductId(e.id)}
               />
          </div>
     )
}

export default AllProducts