import {Dispatch} from "redux";
import {createTransaction, getUserInfo, getUserList, getUserTransactions} from "../index";
import {Axios} from "../../../Core";

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
    dispatch(getUserInfo.request());

    try {
        const response = await Axios.get('/user/profile');
        dispatch(getUserInfo.success(response.data));
    } catch (error) {
        dispatch(getUserInfo.failure(error.message));
    }
}

export const fetchUserTransactions = ({ order, field}: { order: 'asc' | 'desc', field: string }) => async (dispatch: Dispatch) => {
    dispatch(getUserTransactions.request());

    try {
        const response = await Axios.get('/transaction',
            {
                params: {
                    order,
                    field
                }
            });
        dispatch(getUserTransactions.success(response.data));
    } catch (error) {
        dispatch(getUserTransactions.failure(error.message));
    }
}

export const fetchUserList = () => async (dispatch: Dispatch) => {
    dispatch(getUserList.request());

    try {
        const response = await Axios.get('/user');
        dispatch(getUserList.success(response.data));
    } catch (error) {
        dispatch(getUserList.failure(error.message));
    }
}

export const fetchTransaction = (data: any) => async (dispatch: Dispatch) => {
    dispatch(createTransaction.request());

    try {
        const response = await Axios.post('/transaction', data);
        dispatch(createTransaction.success(response.data));
    } catch (error) {
        dispatch(createTransaction.failure(error.message));
    }
}