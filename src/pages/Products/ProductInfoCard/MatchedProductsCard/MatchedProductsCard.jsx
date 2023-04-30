import "./MatchedProductsCard.scss"
import React from 'react'

import { useParams } from "react-router-dom";

import { Card } from "antd"
import dataGridColumnsGenerator from "../../../../functions/dataGridColumnsGenerator";
import DataGridTable from "../../../../general-components/DataGridTable/DataGridTable";
import { useFetch } from "../../../../general-custom-hooks/useFetch";
import TrackCheckbox from "../../../../general-components/TrackCheckbox/TrackCheckbox";

const MatchedProductsCard = () => {

     let params = useParams()
     let mainProductId = params.id

     const { data, loading, error } = useFetch(`http://localhost:5000/all-products/EPHARMA/matched-products/${mainProductId}`)

     let columns = dataGridColumnsGenerator([
          { field: "productId", header: "Product ID", size: 0.4 },
          { field: "image", header: "Image", size: 0.6 },
          { field: 'title', header: "Title", type: "bold", size: 1.4 },
          {
               field: 'regularPrice', header: "Regular Price", function: (params) => {
                    return <div className="allProducts-regularPrice">{params.value}</div>
               }, size: 0.6
          },
          {
               field: 'discountPrice', header: "Discount Price", function: (params) => {
                    if (params.value) {
                         return <div className="allProducts-discountPrice">{params.value}</div>
                    }
               }, size: 0.6
          },
          { field: 'manufacturer', header: "Manufacturer", type: "bold", size: 0.7 },
          { field: 'retailCompany', header: "Retail Company", type: "bold", size: 0.7 },
          {
               field: "track", header: "Track", function: (params) => {
                    return <>
                         <TrackCheckbox
                              defaultValue={params.value}
                              url={`http://localhost:5000/all-products/EPHARMA/matched-products/${mainProductId}/update`}
                              requestData={{
                                   id: params.id,
                                   retailCompany: params.row.retailCompany
                              }}
                         />
                    </>
               }, size: 0.4
          },
     ], "flex", true)

     return (
          <Card type="inner" title="Matched Products" className="priceHistoryCard-main-wrapper">
               <DataGridTable
                    columns={columns}
                    outsourceData={data}
                    rowHeight={100}
               />
          </Card>
     )
}

export default MatchedProductsCard