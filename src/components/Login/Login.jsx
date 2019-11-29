import React from "react";
import LoginReduxForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../../redux/auth/auth-reducer";
import { Redirect } from "react-router-dom";
import { getAuth, getCaptchaUrl } from "../../redux/auth/auth_selectors";

const Login = props => {

    const onSubmit = formData => {
        let { email, password, rememberMe, captcha } = formData;
        props.login( email, password, rememberMe, captcha )
    };

    if(props.isAuth) return <Redirect to="/profile" />;

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={ onSubmit } captchaUrl={ props.captchaUrl }/>
        </div>

    )
};

const mapStateToProps = state => ({
    isAuth: getAuth( state ),
    captchaUrl: getCaptchaUrl( state )
});

export default connect( mapStateToProps, { login })( Login );