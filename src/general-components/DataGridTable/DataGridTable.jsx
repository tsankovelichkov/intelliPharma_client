import "./DataGridTable.scss"
import React from 'react'

import { DataGrid, GridToolbar } from "@mui/x-data-grid"

const DataGridTable = ({
    columns,
    outsourceData,
    rowHeight,
    loading,
    onRowClick,
    components
}) => {

    return (
        <div className='mui-data-grid-main-wrapper'>
            <DataGrid
                rows={outsourceData}
                columns={columns}
                rowHeight={rowHeight}
                sx={{ backgroundColor: "white", borderRadius: 2 }}
                autoHeight={true}
                components={components}
                onRowClick={onRowClick}
                initialState={{
                    ...outsourceData.initialState,
                    pagination: { paginationModel: { pageSize: 20 } },
                }}
                pageSizeOptions={[20,30,50]}
                loading={loading}
            />
        </div>
    )
}

export default DataGridTable