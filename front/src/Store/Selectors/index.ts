import {RootState} from "../Reducers";
import {createSelector} from "reselect";

export const openSignin = (state: RootState) => state.auth.openSignin;
export const openSignup = (state: RootState) => state.auth.openSignup;
export const profile = (state: RootState) => state.user.profile.data;
export const transactions = (state: RootState) => state.user.transaction.data;
export const userList = (state: RootState) => state.user.userList.data;

export const isAuth = createSelector(
    (state: RootState) => state.auth.token,
    token => token !== null
);