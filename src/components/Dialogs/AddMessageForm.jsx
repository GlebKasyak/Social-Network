import React from "react";
import styles from "./AppForm.module.css";
import { reduxForm } from "redux-form";
import { maxLengthCreator, requiredField } from "../../utils/validators/validators";
import { Textarea, Input, createFiend } from "../../common/FormsControls/FormsControls";
import cn from "classnames";

const maxLength200 = maxLengthCreator(200);

const AddMessageForm = props => {

    return (
        <form onSubmit={ props.handleSubmit } className={styles.form}>
            <div className={ cn(styles.fields, "fieldsCommon")}>
                { createFiend("Enter your Name", "userName", [requiredField], Input) }
                { createFiend("Enter your message", "newMessageBody", [requiredField, maxLength200], Textarea) }
            </div>
            <div className={styles.addMessage}>
                <button >Add new message</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm({form: "message"})( AddMessageForm );

export default AddMessageReduxForm;