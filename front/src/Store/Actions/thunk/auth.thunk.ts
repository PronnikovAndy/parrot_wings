import {Dispatch} from "redux";
import {logout, signin, signup} from "../index";
import {Axios} from "../../../Core";
import {log} from "util";

interface Signin {
    email: string;
    password: string;
}

interface Signup {
    email: string;
    fullName: string;
    password: string;
}

export const fetchSignin = (data: Signin) => async (dispatch: Dispatch) => {
    dispatch(signin.request());

    try {
        const response = await Axios.post('/auth/signin', data);
        localStorage.setItem('access_token', response.data.access_token);
        dispatch(signin.success(response.data.access_token));
    } catch (e) {
        dispatch(signin.failure(e.message));
    }
}

export const fetchSignup = (data: Signup) => async (dispatch: Dispatch) => {
    dispatch(signup.request());

    try {
        const response = await Axios.post('/auth/signup', data);
        dispatch(signup.success(response.data));
    } catch (e) {
        dispatch(signup.failure(e.message));
    }
}

export const fetchLogout = () => async (dispatch: Dispatch) => {
    dispatch(logout.request());

    try {
        const response = await Axios.post('/auth/logout');
        if(response.data.success) {
            dispatch(logout.success());
            localStorage.removeItem('access_token');
        }
    } catch (e) {
        dispatch(logout.failure(e.message));
    }
}