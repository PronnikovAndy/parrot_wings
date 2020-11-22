import React, {FC, useEffect} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {object, string, number} from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchTransaction,
    fetchUserInfo,
    fetchUserList,
    fetchUserTransactions
} from "../../Store/Actions/thunk/user.thunk";
import * as selectors from '../../Store/Selectors';
import {Autocomplete} from "@material-ui/lab";
import {Recipient} from "../../Store/Reducers/User/UserList";
import {useFormik} from "formik";

interface Values {
    recipient: Recipient | null;
    amount: number;
}

interface Props {
    classes: any;
    open: boolean;
    handleClose: () => void;
    currentBalance: number;
    order: 'asc' | 'desc',
    field: string;
}

const CreateTransaction: FC<Props> = ({open, handleClose, classes, currentBalance, order, field}) => {
    const dispatch = useDispatch();
    const userList = useSelector(selectors.userList);

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    const formik = useFormik<Values>({
        initialValues: {
            recipient: null,
            amount: 0
        },
        validationSchema: object().shape({
            amount: number().required().positive().max(currentBalance),
            recipient: object().shape({
                id: string().required(),
            }).required()
        }),
        validateOnChange: false,
        onSubmit: async values => {
            if (!values.recipient) return;

            await dispatch(fetchTransaction({
                recipientId: values.recipient.id,
                amount: values.amount
            }));
            dispatch(fetchUserInfo());
            dispatch(fetchUserTransactions({}));
            handleClose();
        }
    });

    if (!userList) {
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="form-dialog-title">
                    Create Transaction
                </DialogTitle>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <Autocomplete
                        style={{ width: 500 }}
                        id="recipient"
                        onChange={(event, data) => formik.setFieldValue('recipient', data)}
                        options={userList}
                        value={formik.values.recipient}
                        getOptionLabel={(option: any) => option.fullName}
                        getOptionSelected={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                margin="dense"
                                label="User"
                                variant="outlined"
                            />
                        )}
                    />
                    {!formik.values.recipient ? null : (
                        <TextField
                            fullWidth
                            margin="dense"
                            id="amount"
                            label="Amount"
                            type="number"
                            variant="outlined"
                            onChange={formik.handleChange}
                            error={formik.touched.amount && formik.errors.amount ? true : false}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />
                    )}
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

export default CreateTransaction;