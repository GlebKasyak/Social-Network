import React from "react";
import { reduxForm } from "redux-form";
import styles from "./LoginForm.module.css";
import { createFiend, Input } from "../../common/FormsControls/FormsControls";
import { requiredField } from "../../utils/validators/validators";
import Error from "../../common/Error/Error";
import Captcha from "../../common/Captcha/Captcha";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.loginAndPassword}>
                {createFiend("Email", "email", [requiredField], Input, {type: "text"})}
                {createFiend("Password", "password", [requiredField], Input, {type: "password"})}
            </div>
            <div className={styles.checkBox}>
                {createFiend(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}
            </div>

            { captchaUrl && <Captcha captchaUrl={ captchaUrl }/> }

            { error && <Error error={ error } /> }
            <div className={styles.login}>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    form: "login"
})( LoginForm );

export default LoginReduxForm;
