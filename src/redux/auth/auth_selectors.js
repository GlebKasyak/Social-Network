
export const getAuth = state => {
    return state.auth.isAuth;
};

export const getCaptchaUrl = state => {
    return state.auth.captchaUrl;
};

export const getAuthorizedUserID = state => {
    return state.auth.id;
};

