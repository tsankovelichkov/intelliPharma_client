import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import * as React from 'react';

import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

function getExcelData(apiRef, columnsObj) {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  let readyForUseColumnsField = []
  let invisibleColumnsArray = []

  for (const key in columnsObj) {
    if (Object.hasOwnProperty.call(columnsObj, key)) {
      if (!columnsObj[key]) {
        invisibleColumnsArray.push(key)
      }
    }
  }

  visibleColumnsField.forEach(el => {
    if (!el.includes(invisibleColumnsArray)) {
      readyForUseColumnsField.push(el)
    }
  })

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    readyForUseColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return { rows: data, columnNames: readyForUseColumnsField };
}

function handleExport(apiRef, columns) {

  const { rows, columnNames} = getExcelData(apiRef, columns);

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
        handleExport(apiRef, props.columns);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Download Excel
    </MenuItem>
  );
}