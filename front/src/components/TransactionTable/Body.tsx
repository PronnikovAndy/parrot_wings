import React, {FC} from 'react';
import {TableBody, TableCell, TableRow, Typography} from "@material-ui/core";

interface Transaction {
    id: string;
    name: string;
    amount: number;
    balance: number;
    date: Date;
}

interface Props {
    transactions: Transaction[] | null;
}

const Body: FC<Props> = ({transactions}) => {
    console.log("transactions", transactions);
    return (
        <TableBody>
            {!transactions || !transactions.length ? (
                <Typography>No data</Typography>
            ) : (
                transactions.map(transaction => (
                    <TableRow
                        hover
                        key={transaction.id}
                    >
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell align="right">{transaction.amount}</TableCell>
                        <TableCell align="right">{transaction.balance}</TableCell>
                        <TableCell align="right">{transaction.date.toLocaleString()}</TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
    );
};

export default Body;