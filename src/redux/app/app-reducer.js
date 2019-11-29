
import { getAuthUserData } from "../auth/auth-reducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED-SUCCESS";

const initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state
    }

};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => dispatch => {
    const dispatchResult = dispatch(getAuthUserData());
    Promise.all([dispatchResult])
        .then(() => {
            dispatch(initializedSuccess());
    })

};


export default appReducer;