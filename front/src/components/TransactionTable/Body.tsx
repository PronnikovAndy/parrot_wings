import React, {FC} from 'react';
import {TableBody, TableCell, TableRow} from "@material-ui/core";

interface Transaction {
    id: string;
    name: string;
    amount: number;
    resultingBalance: number;
    createdAt: Date;
}

interface Props {
    transactions: Transaction[] | null;
}

const Body: FC<Props> = ({transactions}) => {
    return (
        <TableBody>
            {!transactions || !transactions.length ? (
                <TableRow>
                    <TableCell>No data</TableCell>
                </TableRow>
            ) : (
                transactions.map(transaction => (
                    <TableRow
                        hover
                        key={transaction.id}
                    >
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell align="right">{transaction.amount}</TableCell>
                        <TableCell align="right">{transaction.resultingBalance}</TableCell>
                        <TableCell align="right">{transaction.createdAt.toLocaleString()}</TableCell>
                    </TableRow>
                ))
            )}
        </TableBody>
    );
};

export default Body;