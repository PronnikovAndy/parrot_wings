import React, {useCallback} from 'react';
import { object, string } from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button, createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton,
    TextField, Theme,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import {openSignin} from "../../Store/Selectors";
import {toggleSigninForm} from "../../Store/Actions";
import {fetchSignin} from "../../Store/Actions/thunk/auth.thunk";
import {useFormik} from "formik";


const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }));

const SigninSchema = object().shape({
    email: string().required().email(),
    password: string().required()
})

const Signin = () => {
    const classes = styles();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: SigninSchema,
        onSubmit: values => {
            dispatch(fetchSignin(values));
            dispatch(toggleSigninForm(false));
        }
    });

    const open = useSelector(openSignin);
    const handleClose = useCallback(() => {
        dispatch(toggleSigninForm(false));
    }, [dispatch]);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form
                onSubmit={formik.handleSubmit}
            >
                <DialogTitle id="form-dialog-title">
                    Signin
                </DialogTitle>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.errors.email ? true : false}
                        helperText={formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.errors.password ? true : false}
                        helperText={formik.errors.password}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        color="primary"
                    >
                        Signin
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default Signin;