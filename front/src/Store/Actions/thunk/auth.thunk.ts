import {Dispatch} from "redux";
import {signin, signup} from "../index";
import {Axios} from "../../../Core";

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