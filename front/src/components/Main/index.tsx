import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as selectors from '../../Store/Selectors';
import {Grid, Typography} from "@material-ui/core";
import TransactionTable from "../TransactionTable";
import {fetchUserInfo} from "../../Store/Actions/thunk/user.thunk";

const Main = () => {
    const isAuth = useSelector(selectors.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <main>
            <Grid container direction="column" justify="center" alignItems="center">
                {isAuth ? (
                    <>
                        <Grid item>
                            <TransactionTable />
                        </Grid>
                    </>
                ) : (
                    <Typography variant="h2">
                        Use should authorize to see content
                    </Typography>
                )}
            </Grid>
        </main>
    )
}

export default Main;