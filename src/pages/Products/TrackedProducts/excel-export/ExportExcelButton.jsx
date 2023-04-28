import { GridToolbarExportContainer } from '@mui/x-data-grid';
import { ExportMenuItem } from './ExportMenuItem';
import * as React from 'react';

export function ExportButton({
  columns
}) {

  return (
    <GridToolbarExportContainer>
      <ExportMenuItem columns={columns}/>
    </GridToolbarExportContainer>
  );
}