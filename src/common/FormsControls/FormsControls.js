import React from "react";
import styles from "./FormsControls.module.css";
import { Field } from "redux-form";
import cn from "classnames";

export const FormControl = Element => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={ cn({[styles.error]: hasError}, styles.formControl, "formControlError") }>
            <div className={styles.elementWrapper}>
                <Element {...props} {...input}/>
            </div>
            { hasError
                && <div className={ cn(styles.validatorError, "validatorErrorCommon")} ><b>Error</b>: { error }</div>
            }
        </div>
    )
};

export const createFiend = ( placeholder, name, validators, component, props = {}, text = "" ) => {
    return (
        <div>
            <Field
                type={ props.type }
                component={ component }
                validate={ validators }
                placeholder={ placeholder }
                name={ name }
            /> { text && <span>{ text }</span>}
        </div>
    )
};

export const Textarea = FormControl("textarea");
export const Input = FormControl("input");