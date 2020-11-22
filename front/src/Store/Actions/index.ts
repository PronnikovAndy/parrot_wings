import {deprecated, createAsyncAction} from "typesafe-actions";

const { createStandardAction } = deprecated;

export const toggleSigninForm = createStandardAction('OPEN_SIGNIN_FORM')<boolean>();
export const toggleSignupForm = createStandardAction('OPEN_SIGNUP_FORM')<boolean>();

export const signin = createAsyncAction(
    'SIGNIN_REQUEST',
    'SIGNIN_SUCCESS',
    'SIGNIN_FAILURE'
)<undefined, string | null, string>();

export const signup = createAsyncAction(
    'SIGNUP_REQUEST',
    'SIGNUP_SUCCESS',
    'SIGNUP_FAILURE'
)<undefined, string, string>();

export const logout = createAsyncAction(
    'LOGOUT_REQUEST',
    'LOGOUT_SUCCESS',
    'LOGOUT_FAILURE'
)<undefined, undefined, string>();

export const getUserInfo = createAsyncAction(
    'GET_USER_INFO_REQUEST',
    'GET_USER_INFO_SUCCESS',
    'GET_USER_INFO_FAILURE'
)<undefined, any, string>();

export const getUserTransactions = createAsyncAction(
    'GET_USER_TRANSACTIONS_REQUEST',
    'GET_USER_TRANSACTIONS_SUCCESS',
    'GET_USER_TRANSACTIONS_FAILURE'
)<undefined, any, string>();

export const getUserList = createAsyncAction(
    'GET_USER_LIST_REQUEST',
    'GET_USER_LIST_SUCCESS',
    'GET_USER_LIST_FAILURE'
)<undefined, any, string>();

export const createTransaction = createAsyncAction(
    'CREATE_TRANSACTION_REQUEST',
    'CREATE_TRANSACTION_SUCCESS',
    'CREATE_TRANSACTION_FAILURE'
)<undefined, any, string>();