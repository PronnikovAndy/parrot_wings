import {combineReducers} from "redux";
import transaction from './Transactions';
import profile from './Profile';
import userList from './UserList';

const rootReducer = combineReducers({
    transaction,
    profile,
    userList
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;