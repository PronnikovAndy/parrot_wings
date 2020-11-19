import * as actions from '../../../Actions';
import {ActionType, getType} from "typesafe-actions";

type Action = ActionType<typeof actions>;

export interface TransactionState {
    loading: boolean;
    data: any | null;
    error: string | null;
}

const defaultState: TransactionState = {
    loading: false,
    data: null,
    error: null
}

const TransactionReducer = (state = defaultState, action: Action): TransactionState => {
    switch (action.type) {
        case getType(actions.getUserTransactions.request): {
            return {
                ...state,
                loading: true,
            }
        }

        case getType(actions.getUserTransactions.success): {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        }

        case getType(actions.getUserTransactions.failure): {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        }

        default:
            return state;
    }
};

export default TransactionReducer;