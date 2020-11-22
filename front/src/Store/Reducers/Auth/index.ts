import * as actions from '../../Actions';
import {ActionType, getType} from "typesafe-actions";

type Action = ActionType<typeof actions>;

export interface AuthState {
    openSignin: boolean;
    openSignup: boolean;
    loading: boolean;
    token: string | null;
    error: string | null;
}

const defaultState: AuthState = {
    openSignin: false,
    openSignup: false,
    loading: false,
    token: null,
    error: null
}

const AuthReducer = (state = defaultState, action: Action): AuthState => {
    switch (action.type) {
        case getType(actions.toggleSigninForm): {
            return {
                ...state,
                openSignin: action.payload
            }
        }

        case getType(actions.toggleSignupForm): {
            return {
                ...state,
                openSignup: action.payload
            }
        }

        case getType(actions.signin.request): {
            return {
                ...state,
                loading: true,
            }
        }

        case getType(actions.signin.success): {
            return {
                ...state,
                loading: false,
                token: action.payload,
                error: null
            }
        }

        case getType(actions.signin.failure): {
            return {
                ...state,
                loading: false,
                token: null,
                error: action.payload
            }
        }

        case getType(actions.logout.request): {
            return {
                ...state,
                loading: true
            }
        }

        case getType(actions.logout.success): {
            return {
                ...state,
                loading: false,
                token: null,
                error: null
            }
        }

        case getType(actions.logout.failure): {
            return {
                ...state,
                loading: false,
                token: null,
                error: action.payload
            }
        }

        default:
            return state;
    };
};

export default AuthReducer;