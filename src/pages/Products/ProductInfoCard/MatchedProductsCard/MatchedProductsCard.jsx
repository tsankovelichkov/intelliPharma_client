import "./MatchedProductsCard.scss"
import React, { useState } from 'react'

import { Checkbox, IconButton } from "@mui/material";
import { Divider, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Card } from "antd"
import dataGridColumnsGenerator from "../../../../functions/dataGridColumnsGenerator";
import DataGridTable from "../../../../general-components/DataGridTable/DataGridTable";
import { useFetch } from "../../../../general-custom-hooks/useFetch";

const MatchedProductsCard = () => {

    let [productId,setProductId] = useState()

    let params = useParams()

    const { data, loading, error } = useFetch(`http://localhost:5000/all-products/EPHARMA/matched-products/${params.id}`)


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
          { field: 'retailCompany', header: "Retail Company",type:"bold", size: 0.7 },
          { field: "track", header: "Track", custom: <><Checkbox /></>, size: 0.4 },
     ], "flex", true)

    return (
        <Card type="inner" title="Matched Products" className="priceHistoryCard-main-wrapper">
            <DataGridTable
                columns={columns}
                outsourceData={data}
                rowHeight={100}
                onRowClick={(e) => setProductId(e.id)}
            />
        </Card>
    )
}

export default MatchedProductsCard