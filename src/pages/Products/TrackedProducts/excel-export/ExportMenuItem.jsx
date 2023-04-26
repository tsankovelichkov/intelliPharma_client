import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import * as React from 'react';

import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
  gridColumnDefinitionsSelector,
} from '@mui/x-data-grid';

function getExcelData(apiRef) {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
}

function handleExport(apiRef) {
  const columnNames = gridColumnDefinitionsSelector(apiRef).map( x => {
    return x.headerName
  });

  const rows = getExcelData(apiRef);

  console.log(rows)

  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.sheet_add_aoa(worksheet, [columnNames], {
    origin: 'A1',
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Information');
  XLSX.writeFile(workbook, 'data.xlsx', { compression: true });
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Download Excel
    </MenuItem>
  );
}