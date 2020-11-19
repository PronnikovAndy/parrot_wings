import * as actions from '../../../Actions';
import {ActionType, getType} from "typesafe-actions";

type Action = ActionType<typeof actions>;

export interface ProfileState {
    loading: boolean;
    data: any | null;
    error: string | null;
}

const defaultState: ProfileState = {
    loading: false,
    data: null,
    error: null
}

const ProfileReducer = (state = defaultState, action: Action): ProfileState => {
    switch (action.type) {
        case getType(actions.getUserInfo.request): {
            return {
                ...state,
                loading: true,
            }
        }

        case getType(actions.getUserInfo.success): {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        }

        case getType(actions.getUserInfo.failure): {
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

export default ProfileReducer;