import React from 'react'
import { Box } from '@mui/material';
import Header from '../Header';

function Transactions() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Transactions'} subtitle={'View all transactions here'} />
            </Box>
        </Box>
    )
}

export default Transactions