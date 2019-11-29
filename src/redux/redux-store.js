import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile/profile-reducer";
import dialogsReducer from "./dialogs/dialogs-reducer";
import usersReducer from "./users/users-reducer";
import authReducer from "./auth/auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app/app-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducers, composeEnhancers(applyMiddleware(thunkMiddleware)) );

// const store = createStore( reducers, applyMiddleware( thunkMiddleware ) );
window.store = store;

export default store;