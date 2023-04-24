import "./MatchedProductsCard.scss"
import React, { useEffect, useState } from 'react'

import { Checkbox, IconButton } from "@mui/material";
import { Divider, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Card } from "antd"
import dataGridColumnsGenerator from "../../../../functions/dataGridColumnsGenerator";
import DataGridTable from "../../../../general-components/DataGridTable/DataGridTable";
import { useFetch } from "../../../../general-custom-hooks/useFetch";
import requests from "../../../../services/requests";
import { useActivateNotification } from "../../../../contexts/notificationsContext";

const MatchedProductsCard = () => {

     let [matchedProductId,setMatchedProductId] = useState()
     let [track,setTrack] = useState()

     let params = useParams()
     let activateNotification = useActivateNotification()

     const { data, loading, error } = useFetch(`http://localhost:5000/all-products/EPHARMA/matched-products/${params.id}`)

     console.log(data)

     useEffect(() => {
          if (track === false || track === true) {
               requests.put(`http://localhost:5000/all-products/EPHARMA/matched-products/${params.id}/update`, {
                    id:matchedProductId,
                    track
               })
                    .then(res => JSON.parse(res))
                    .then(res => {
                         if (res.updated) {
                              activateNotification('SUCCESS', `Successfully updated!`)
                              setTrack(undefined)
                         } else {
                              activateNotification('SUCCESS', `Successfully updated!`)
                              setTrack(undefined)
                         }
                    }).catch(err => {
                         activateNotification('SUCCESS', `Technical problem. Please try again later!`)
                         setTrack(undefined)
                    })
          }
     }, [track])

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
                    return <><Checkbox defaultChecked={params.value} onChange={(e) => setTrack(e.target.checked)} /></>
               }, size: 0.4
          },
     ], "flex", true)

     return (
          <Card type="inner" title="Matched Products" className="priceHistoryCard-main-wrapper">
               <DataGridTable
                    columns={columns}
                    outsourceData={data}
                    rowHeight={100}
                    onRowClick={(e) => setMatchedProductId(e.id)}
               />
          </Card>
     )
}

export default MatchedProductsCard