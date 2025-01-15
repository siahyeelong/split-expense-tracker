import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { Categories } from '../../settings/Categories';

function TransactionCard(transaction) {
    const trans = transaction.transaction
    return (
        <>
            {/* Display price large */}
            {/* Display category icon in the same line */}
            {Categories.getCategoryIcon(trans.category)}

            {/* Display Category in text */}
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
        <Dialog open={showDialog} onClose={onClose}>
            <DialogTitle>Transaction number: {transaction.id}</DialogTitle>
            <DialogContent><TransactionCard transaction={transaction} /></DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default PerTransactionDialog