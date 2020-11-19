import React, {FC, useCallback, useEffect} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, MenuItem,
    TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {object, string} from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransaction, fetchUserList} from "../../Store/Actions/thunk/user.thunk";
import * as selectors from '../../Store/Selectors';

const CreateTransactionScheam = object().shape({
    name: string().required(),
    amount: string().required(),
    recipientId: string().required()
});

interface Props {
    classes: any;
    open: boolean;
    handleClose: () => void;
}

const CreateTransaction: FC<Props> = ({ open, handleClose, classes }) => {
    const dispatch = useDispatch();
    const userList = useSelector(selectors.userList);

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    const {register, handleSubmit, errors, control} = useForm({
        resolver: yupResolver(CreateTransactionScheam)
    });

    const onSubmit = useCallback((data) => {
        dispatch(fetchTransaction(data));
        handleClose();
    }, [dispatch, handleClose]);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">
                    Create Transaction
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        inputRef={register}
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        error={errors.name ? true : false}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        inputRef={register}
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="text"
                        variant="outlined"
                        error={errors.amount ? true : false}
                        helperText={errors.amount?.message}
                    />
                    <Controller
                        as={
                            <TextField
                                select
                                autoFocus
                                fullWidth
                                margin="dense"
                                label="User"
                                variant="outlined"
                                error={errors.user ? true : false}
                                helperText={errors.user?.message}
                            >
                                {!userList || !userList.length ? (
                                    null
                                ) : (
                                    userList.map((user: any) => (
                                        <MenuItem value={user.id}>{user.fullName}</MenuItem>
                                    ))
                                )}
                            </TextField>
                        }
                        id="recipientId"
                        name="recipientId"
                        control={control}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        color="primary"
                    >
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default  CreateTransaction;