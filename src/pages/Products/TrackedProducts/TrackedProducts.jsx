import "./TrackedProducts.scss"
import React, { useEffect, useState } from 'react';

import dataGridColumnsGenerator from "../../../functions/dataGridColumnsGenerator";
import DataGridTable from "../../../general-components/DataGridTable/DataGridTable";

import { useFetch } from "../../../general-custom-hooks/useFetch";
import requests from "../../../services/requests";
import { useActivateNotification } from "../../../contexts/notificationsContext";
import trackedProductsColumns from "./functions/trackedProductsColumns";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { ExportButton } from "./excel-export/ExportExcelButton";
import invisibleColumns from "./functions/invisibleColumns";
import TrackCheckbox from "../../../general-components/TrackCheckbox/TrackCheckbox";

const TrackedProducts = () => {

    let [updatedData, setUpdatedData] = useState()
    let [invisibleColumnsObj, setInvisibleColumnsObj] = useState(invisibleColumns())

    let { data, loading, error } = useFetch('http://localhost:5000/tracked-products/EPHARMA')


    function updateTrackedData(id) {
        if (!updatedData) {
            setUpdatedData(data.filter(x => x._id !== id))
        } else {
            setUpdatedData(updatedData.filter(x => x._id !== id))
        }
    }    

    let additionalColumns = trackedProductsColumns()

    let columns = dataGridColumnsGenerator([
        { field: "productId", header: "Product ID", size: 100 },
        {
            field: "track", header: "Track", function: (params) => {
                if(params.value !== undefined) {
                    return <TrackCheckbox
                    defaultValue={params.value}
                    isResponseSuccess={(boolean) => updateTrackedData(params.id)}
                    url={`http://localhost:5000/all-products/${params.id}/update`}
                />
                }
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
                if (params.value !== undefined) {
                    if (params.value === 0) {
                        return <div className="allProducts-discountPrice ">0.00</div>
                    } else {
                        return <div className="allProducts-discountPrice ">{params.value}</div>
                    }
                }
            }, size: 180
        },
        { field: 'manufacturer', header: "Manufacturer", type: "bold", size: 200 },
        ...additionalColumns
    ], 'width', true)

    function CustomToolbar(props) {
        return (
            <GridToolbarContainer>
                <ExportButton columns={invisibleColumnsObj} />
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
                columnVisibilityModel={invisibleColumnsObj}
                onColumnVisibilityModelChange={(obj) => setInvisibleColumnsObj(obj)}
                loading={loading}
            />
        </div>
    )
}

export default TrackedProducts