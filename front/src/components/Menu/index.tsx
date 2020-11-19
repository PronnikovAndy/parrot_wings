import React, {useCallback, useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {ButtonGroup} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {signin, toggleSigninForm, toggleSignupForm} from "../../Store/Actions";
import * as selectors from "../../Store/Selectors";
import {fetchUserInfo} from "../../Store/Actions/thunk/user.thunk";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const Menu = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectors.isAuth);
    const handleSigninOpen = useCallback(() => {
        dispatch(toggleSigninForm(true));
    }, [dispatch]);

    const handleSignupOpen = useCallback(() => {
        dispatch(toggleSignupForm(true));
    }, [dispatch]);

    const handleLogoutClick = useCallback(() => {
        dispatch(signin.success(null));
        localStorage.removeItem("access_token");
    }, [dispatch]);

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUserInfo());
        }
    }, [isAuth, dispatch]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        PW
                    </Typography>
                    {isAuth ? (
                        <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
                    ) : (
                        <ButtonGroup>
                            <Button color="inherit" variant="outlined" onClick={handleSigninOpen}>Signin</Button>
                            <Button color="inherit" variant="outlined" onClick={handleSignupOpen}>Signup</Button>
                        </ButtonGroup>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Menu;