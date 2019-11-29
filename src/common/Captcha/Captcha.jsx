import React from "react";
import styles from "./Captcha.module.css";
import { createFiend, Input } from "../FormsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";

const maxLength6 = maxLengthCreator(6);

const Captcha = ({ captchaUrl }) => (
    <div className={styles.captcha}>
        <div>
            <img src={ captchaUrl } alt="captcha"/>
        </div>
        { captchaUrl && createFiend("Symbols from image", "captcha", [requiredField, maxLength6], Input)}
    </div>
);

export default Captcha;