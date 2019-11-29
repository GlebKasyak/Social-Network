import { authAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET-CAPTCHA-URL-SUCCESS";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        default:
            return state
    }

};

export const setAuthUserData = ( id, email, login, isAuth ) => ({type: SET_USER_DATA, payload: { id, email, login, isAuth}});
export const getCaptchaUrlSuccess = ( captchaUrl ) => ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl});

export const getAuthUserData = () => async dispatch => {
    const response = await authAPI.me();

    if(response.data.resultCode === 0) {
        const { id, email, login } = response.data.data;
        dispatch(setAuthUserData( id, email, login, true ));
    }
};


export const login = ( email, password, rememberMe, captcha ) => async dispatch => {

    const responce = await authAPI.login( email, password, rememberMe, captcha );

    if(responce.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if(responce.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        const message = responce.data.messages.length > 0 ? responce.data.messages[0] : "Some error";
        dispatch( stopSubmit("login", {_error: message}) );
    }
};

export const getCaptchaUrl = () => async dispatch => {

    const responce = await securityAPI.getCaptchaUrl();
    const captchaUrl = responce.data.url;

    dispatch(getCaptchaUrlSuccess( captchaUrl ));
};

export const logout = () => async dispatch => {

    const responce = await authAPI.logout();

    if(responce.data.resultCode === 0) {
        dispatch(setAuthUserData( null, null, null, false ));
    }
};

export default authReducer;