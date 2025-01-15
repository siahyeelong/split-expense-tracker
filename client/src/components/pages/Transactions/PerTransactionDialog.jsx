import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import React from 'react'
import { Categories } from '../../settings/Categories';

function TransactionCard(transaction) {
    const trans = transaction.transaction
    const price = parseFloat(trans.price).toLocaleString('en-SG', {
        style: 'currency', currency: (trans.currency === 'SGD') ? 'SGD' : (trans.currency || 'SGD'),
        minimumFractionDigits: 0,  // Show no decimal places if not needed
        maximumFractionDigits: 2
    })

    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
                {/* Display category icon in the same line */}
                {Categories.getCategoryIcon(trans.category)}
                {/* Display price large */}
                <Typography fontSize={'large'}>{price}</Typography>
            </Box>

            {/* Display Category in text */}
            <Box display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
                <Typography fontWeight={'bold'}>Category: </Typography>
                <Typography>{trans.category}</Typography>
            </Box>
            {/* Display Description */}
            {/* Display amount in SGD if not in original currency */}
            {/* Display exchange rate */}
            {/* Display recipients */}
            {/* Display Payer */}

            {/* Display timestamp as a grey footer */}
        </>
    )
}

function PerTransactionDialog({ showDialog, transaction, onClose }) {
    return (
        <Dialog open={showDialog} onClose={onClose} fullWidth={true} maxWidth={'xs'}>
            <DialogTitle>Transaction number: {transaction.id}</DialogTitle>
            <DialogContent><TransactionCard transaction={transaction} /></DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default PerTransactionDialog