import React, {FC} from 'react';
import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import {Classes, Data, Order} from "./index";

interface Props {
    classes: Classes;
    order: Order;
    orderBy: string;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
}

const headCells = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Correspondent name'},
    {id: 'amount', numeric: true, disablePadding: false, label: 'Amount'},
    {id: 'balance', numeric: true, disablePadding: false, label: 'Resulting balance'},
    {id: 'date', numeric: true, disablePadding: false, label: 'Date'}
];

const Head: FC<Props> = (props) => {
    const {classes, order, orderBy, onRequestSort} = props;

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id as keyof Data)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default Head;