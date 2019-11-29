import React from "react";
import styles from "./ProfileInfo.module.css";
import classes from "../../Login/LoginForm.module.css";
import cn from "classnames";

import { createFiend, Input, Textarea } from "../../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import Error from "../../../common/Error/Error";

const ProfileDataForm = ( {handleSubmit, profile, error} ) => {
    return (
        <form onSubmit={ handleSubmit }>

            <div className={styles.profileInformation}>
                <span>FullName:</span> {createFiend("Full name", "fullName", [], Input )}
            </div>
            <div className={styles.profileInformation}>
                <span>Looking for a job:</span> {createFiend(null, "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div className={styles.profileInformation}>
                <span>My professional skills:</span> {createFiend("Professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div className={styles.profileInformation}>
                <span>About Me:</span> {createFiend("About me", "aboutMe", [], Textarea)}
            </div>

            <div className={styles.profileInformation}>
                <span>Contacts:</span> {Object.keys(profile.contacts).map(key => {
                return <div
                    className={ cn(classes.contact, styles.contactsEdit)}
                    key={ key }
                >
                    <b> {key } : {createFiend(key, "contacts." + key, [], Input)}</b>
                </div>
            })}
            </div>

            { error && <Error error={ error }/> }

            <div className={styles.infoProfileEdit}><button disabled={ !!error }>Save</button></div>
        </form>
    )
};

const ProfileDataReduxForm = reduxForm({
    form: "editProfile"
})( ProfileDataForm );

export default ProfileDataReduxForm;