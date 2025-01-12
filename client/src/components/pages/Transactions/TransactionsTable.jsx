import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { DataGrid } from '@mui/x-data-grid';
import ToCSVButton from './ToCSVButton';
import { Person, People } from '../../settings/People';
import RecipientsCell from './RecipientsCell';

function TransactionsTable() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    const [transactions, setTransactions] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [error, setError] = useState(null);

    useEffect(() => {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        fetch(`${backendURL}/record/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTransactions(data || []);
            })
            .catch(error => {
                setError('Failed to fetch transactions. Please try again later.');
                console.error('Error fetching data:', error);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'Index', flex: 3, sortable: true },
        {
            field: 'timestamp', headerName: 'Date', flex: 12, sortable: true, filterable: true,
            valueFormatter: (params) => {
                const d = new Date(params.value);
                return d.toLocaleString('en-SG', {
                    timeZone: "Asia/Singapore", // GMT+8
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
            }
        },
        {
            field: 'price', headerName: 'Price', flex: 10, sortable: true, filterable: true,
            valueGetter: (params) => parseFloat(params.value),
            valueFormatter: (params) => {
                return parseFloat(params.value).toLocaleString('en-SG', {
                    style: 'currency', currency: 'SGD',
                    minimumFractionDigits: 0,  // Show no decimal places if not needed
                    maximumFractionDigits: 2
                });
            }
        },
        { field: 'category', headerName: 'Category', flex: 10, sortable: true, filterable: true },
        {
            field: 'recipients', headerName: 'Recipients', flex: 20, sortable: true, filterable: true,
            renderCell: (params) => (
                < RecipientsCell recipients={params.value || []} />
            )
        },
        { field: 'description', headerName: 'Description', flex: 15, sortable: true, filterable: true },
        {
            field: 'payer', headerName: 'Payer', flex: 8, sortable: true, filterable: true,
            valueGetter: (params) => Person.findDisplayName(params.value, People)
        },
    ];

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }

    return (
        <Box sx={{ padding: 4 }}>
            <ToCSVButton data={transactions} colours={colours} />
            {error ? (
                <Typography color="error" variant="body1">{error}</Typography>
            ) : (
                <Box sx={{ height: 550, width: '100%' }}>
                    <DataGrid
                        rows={transactions.map((transaction, index) => ({ id: index + 1, ...transaction }))}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[10, 20, 50]}
                        onPageSizeChange={handlePageSizeChange}
                        sortingOrder={['asc', 'desc']}
                    />
                </Box>
            )}
        </Box>
    );
};

export default TransactionsTable;
