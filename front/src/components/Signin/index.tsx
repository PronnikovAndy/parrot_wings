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
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import {openSignin} from "../../Store/Selectors";
import {toggleSigninForm} from "../../Store/Actions";
import {fetchSignin} from "../../Store/Actions/thunk/auth.thunk";


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

    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(SigninSchema)
    });

    const open = useSelector(openSignin);
    const handleClose = useCallback(() => {
        dispatch(toggleSigninForm(false));
    }, [dispatch]);
    const onSumit = useCallback((data) => {
        dispatch(fetchSignin(data));
        dispatch(toggleSigninForm(false));
    }, [dispatch]);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form
                onSubmit={handleSubmit(onSumit)}
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
                        inputRef={register}
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        error={errors.email ? true : false}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        inputRef={register}
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
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