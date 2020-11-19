import React, {useCallback, useEffect, useState} from 'react';
import {createStyles, Paper, TableContainer, Theme, Table, Typography, Toolbar, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Head from "./Head";
import Body from './Body';
import {fetchUserInfo, fetchUserTransactions} from "../../Store/Actions/thunk/user.thunk";
import * as selectors from '../../Store/Selectors';
import CreateTransaction from "../CreateTransaction";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        formControl: {
            margin: '10px',
        },
    }),
);

export type Classes = ReturnType<typeof useStyles>;
export type Order = 'asc' | 'desc';

export interface Data {
    name: string;
    amount: number;
    balance: number;
    date: Date;
}

const TransactionTable = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.profile);
    const transactions = useSelector(selectors.transactions);

    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');

    const [openCreate, setOpenCreate] = useState(false);
    const handleClose = useCallback(() => {
        setOpenCreate(false);
    }, [setOpenCreate]);
    const handleOpen = useCallback(() => {
        setOpenCreate(true);
    }, [setOpenCreate]);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserTransactions());
    }, [dispatch]);

    if (!user) {
        return null;
    }

    return (
        <>
            <Paper>
                <Toolbar>
                    <Typography variant="h5">{user.fullName} - ${user.balance}</Typography>
                    <Button onClick={handleOpen}>Send money</Button>
                </Toolbar>
                <TableContainer>
                    <Table>
                        <Head
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <Body
                            transactions={transactions}
                        />
                    </Table>
                </TableContainer>
            </Paper>
            <CreateTransaction
                classes={classes}
                open={openCreate}
                handleClose={handleClose}
            />
        </>
    );
}
export default TransactionTable;