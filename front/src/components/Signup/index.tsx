import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {object, string, ref} from 'yup';
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
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {openSignup} from "../../Store/Selectors";
import {toggleSignupForm} from "../../Store/Actions";
import {fetchSignup} from "../../Store/Actions/thunk/auth.thunk";

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

const SignupScheam = object().shape({
    email: string().required().email(),
    fullName: string().required(),
    password: string().required(),
    confirmPassword: string().required().oneOf([ref('password')], 'Passwords must match')
});

const Signup = () => {
    const classes = styles();
    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(SignupScheam)
    });

    const open = useSelector(openSignup);
    const handleClose = useCallback(() => {
        dispatch(toggleSignupForm(false));
    }, [dispatch]);

    const onSubmit = useCallback((data) => {
        dispatch(fetchSignup(data));
        dispatch(toggleSignupForm((false)));
    }, [dispatch]);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">
                    Signup
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
                        id="fullName"
                        name="fullName"
                        label="Full name"
                        type="text"
                        variant="outlined"
                        error={errors.fullName ? true : false}
                        helperText={errors.fullName?.message}
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
                    <TextField
                        fullWidth
                        inputRef={register}
                        margin="dense"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm password"
                        type="password"
                        variant="outlined"
                        error={errors.confirmPassword ? true : false}
                        helperText={errors.confirmPassword?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        color="primary"
                    >
                        Signup
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default Signup;