import React from 'react'
import { Box } from '@mui/material';
import Header from '../Header';

function Dashboard() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Dashboard'} subtitle={'View analytics'} />
            </Box>
            <div>(work in progress)</div>
        </Box>
    )
}

export default Dashboard