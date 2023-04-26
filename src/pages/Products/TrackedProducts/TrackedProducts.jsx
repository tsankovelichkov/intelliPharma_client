import "./TrackedProducts.scss"
import React, { useEffect, useState } from 'react';

import dataGridColumnsGenerator from "../../../functions/dataGridColumnsGenerator";
import DataGridTable from "../../../general-components/DataGridTable/DataGridTable";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Checkbox, IconButton } from "@mui/material";
import { useFetch } from "../../../general-custom-hooks/useFetch";
import { Divider, Select, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import requests from "../../../services/requests";
import { useActivateNotification } from "../../../contexts/notificationsContext";
import trackedProductsColumns from "./functions/trackedProductsColumns";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { ExportButton } from "./excel-export/ExportExcelButton";

const { Text } = Typography;

const TrackedProducts = () => {

    let [updatedData, setUpdatedData] = useState()
    let [productId, setProductId] = useState()
    let [track, setTrack] = useState()

    let navigate = useNavigate()

    let { data, loading, error } = useFetch('http://localhost:5000/tracked-products/EPHARMA')


    useEffect(() => {
        if (track === false || track === true) {
             requests.put(`http://localhost:5000/all-products/${productId}/update`, {
                  track
             })
                  .then(res => JSON.parse(res))
                  .then(res => {
                       if (res.updated) {
                            activateNotification('SUCCESS', `Successfully updated!`)
                            if(!updatedData) {
                                setUpdatedData(data.filter( x => x._id !== productId))
                            }else {
                                setUpdatedData(updatedData.filter( x => x._id !== productId))
                            }
                            setTrack(undefined)
                       }
                  })
        }
   }, [track])


    let additionalColumns = trackedProductsColumns()

    let activateNotification = useActivateNotification()

    let columns = dataGridColumnsGenerator([
        { field: "productId", header: "Product ID", size: 100 },
        {
            field: "track", header: "Track", function: (params) => {
                return <><Checkbox defaultChecked={params.value} onChange={(e) => setTrack(e.target.checked)} /></>
            }, size: 100
        },
        { field: "image", header: "Image", size: 150 },
        { field: 'title', header: "Title", type: "bold", size: 350 },
        {
            field: 'regularPrice', header: "Regular Price", function: (params) => {
                if (params.value) {
                    return <div className="allProducts-regularPrice">{params.value}</div>
                }
            }, size: 180
        },
        {
            field: 'discountPrice', header: "Discount Price", function: (params) => {
                        if (params.value !== 0) {
                            return <div className="allProducts-discountPrice ">{params.value}</div>
                        }else {
                            return <div className="allProducts-discountPrice ">0.00</div>
                        }
            }, size: 180
        },
        { field: 'manufacturer', header: "Manufacturer", type: "bold", size: 200 },
        ...additionalColumns
    ], 'width', true)

    function CustomToolbar(props) {
        return (
            <GridToolbarContainer>
                <ExportButton />
            </GridToolbarContainer>
        );
    }

    return (
        <div className='allMatchedProducts-page-container'>
            <DataGridTable
                columns={columns}
                outsourceData={updatedData ? updatedData : data}
                rowHeight={100}
                components={{
                    Toolbar: CustomToolbar,
                }}
                loading={loading}
                onRowClick={(e) => setProductId(e.id)}
            />
        </div>
    )
}

export default TrackedProducts