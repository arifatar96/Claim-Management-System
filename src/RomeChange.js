import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';

export default function RomeChangeRequests() {

    const columns = useMemo(

        () => [
            {
                accessorKey: 'patientid',
                header: 'PATIENT ID',
            },

            {
                accessorKey: 'currentroom',
                header: 'CURRENT ROOM',
            },

            {
                accessorKey: 'requestedroom',
                header: 'REQUESTED ROOM',
            },

            {
                accessorKey: 'status',
                header: 'STATUS',
            },
        ],
        [], //end
    );

    const [rows, setRows] = useState([
        {
            patientid: 'rahul@gmail.com',
            currentroom: '110',
            requestedroom: '210',
            status: 'REQUESTED'
        }
    ]);

    const patientId = 'rahul@gmail.com';
    // sessionStorage.getItem('currentpatientid');

    const sortedRows = rows.filter(row => row.patientid === patientId);
    return (
        <React.Fragment>
            <Box
                sx={{
                    marginTop: 8,
                    alignItems: 'center',
                    boxShadow: 7,
                    p: 6
                }}
            >

                <Grid item xs={12} >
                    <div style={{ height: 300, width: '100%', border: 'solid 1px ' }}>
                        <MaterialReactTable
                            columns={columns}
                            data={sortedRows}
                        />
                    </div >
                </Grid>
            </Box>
        </React.Fragment>
    )
}