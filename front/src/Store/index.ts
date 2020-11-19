import { applyMiddleware, createStore, Store } from 'redux';
import rootReducer, { RootState } from './Reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;