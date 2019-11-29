import authReducer, { setAuthUserData, getCaptchaUrlSuccess } from "./auth-reducer";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

it("initialState should be changed after then added values", () => {
    const action = setAuthUserData("15", "email", "Gleb", true);
    const newState = authReducer( initialState, action );

    expect(newState).toEqual( {id: "15", email: "email", login: "Gleb", isAuth: true} );
});

it("captcha text should be 'captcha' ", () => {
    const action = getCaptchaUrlSuccess( "captcha" );
    const newState = authReducer( initialState, action );

    expect(newState.captchaUrl).toBe("captcha");
});