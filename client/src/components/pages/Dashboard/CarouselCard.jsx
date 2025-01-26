import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { TransactionsContext } from '.';
import { Box } from '@mui/material';
import { People, Person } from '../../settings/People';
import { data, MyResponsivePie } from './MyResponsivePie';
import { Categories } from '../../settings/Categories';

function CarouselCard({ ower, matrix }) {
    const transactions = useContext(TransactionsContext);
    let totalSpent = 0

    const spentPerCategory = {}
    Object.keys(Categories.category).forEach((cat) => {
        spentPerCategory[cat] = 0;
    })

    // for each transaction
    transactions.forEach((transaction) => {
        if (transaction.recipients.indexOf(ower.identifier) > -1) {
            const amount = ((transaction.SGD) / (transaction.recipients.length))
            // sum up SGD if ower is in recipients array
            totalSpent += amount
            // sum up amount spent for each category
            spentPerCategory[transaction.category] += amount
        }
    })

    let pieChartData = []
    Object.keys(Categories.category).forEach((cat) => {
        pieChartData = [...pieChartData,
        {
            "id": cat,
            "label": cat,
            "value": spentPerCategory[cat],
            "color": Categories.getCategoryColour(cat)
        }
        ]
    })

    function formatPrice(amount) {
        return parseFloat(amount).toLocaleString('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: String(amount).includes('.') ? 2 : 0,  // If there's a decimal, show 2 decimal places
            maximumFractionDigits: 2  // Cap at 2 decimal places
        })
    }

    return (
        <Card sx={{ maxWidth: 300, backgroundColor: ower.favColour, color: '#36332b', borderRadius: 7, boxShadow: 5, margin: 1 }}>
            <CardActionArea onClick={() => console.log('clicked!', ower.displayName)} sx={{ minHeight: '400px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h3" fontWeight={'bold'} component="div">
                        {ower.displayName}
                    </Typography>
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                        <Typography variant="h6" paddingRight={2}>
                            Total spent:
                        </Typography>
                        <Typography variant="h2">
                            {formatPrice(totalSpent)}
                        </Typography>
                    </Box>
                    {/* Display donut chart */}
                    {/* <Box height={300} display={'flex'} justifyContent={'center'}>
                        <MyResponsivePie key={ower.identifier} data={pieChartData} />
                    </Box> */}
                    {/* Display debts */}
                    {matrix && Object.values(matrix).some(amount => amount !== 0) ?
                        <Typography>You owe:</Typography> :
                        undefined}
                    {matrix && Object.entries(matrix).map(([owed, amount]) => {
                        if (amount === 0) return undefined;
                        else {
                            return (
                                <Box key={`${ower.identifier}owes${owed}box`} display={'flex'}>
                                    <Typography key={`${ower.identifier}owes${owed}who`} variant="body2" maxWidth={150} paddingRight={1}>
                                        {`> ${Person.findDisplayName(owed, People)}:`}
                                    </Typography>
                                    <Typography key={`${ower.identifier}owes${owed}amt`} variant="body2">
                                        {`${formatPrice(amount)}`}
                                    </Typography>
                                </Box>
                            )
                        }
                    })}

                </CardContent>
            </CardActionArea>
        </Card >
    )
}

export default CarouselCard

