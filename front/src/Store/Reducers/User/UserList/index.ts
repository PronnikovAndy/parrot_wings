import * as actions from '../../../Actions';
import {ActionType, getType} from "typesafe-actions";

type Action = ActionType<typeof actions>;

export interface UserListState {
    loading: boolean;
    data: any | null;
    error: string | null;
}

const defaultState: UserListState = {
    loading: false,
    data: null,
    error: null
}

const UserListReducer = (state = defaultState, action: Action): UserListState => {
    switch (action.type) {
        case getType(actions.getUserList.request): {
            return {
                ...state,
                loading: true,
            }
        }

        case getType(actions.getUserList.success): {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        }

        case getType(actions.getUserList.failure): {
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

export default UserListReducer;