import React, { useState, useEffect } from "react";
import style from "./ProfileStatus.module.css";

const ProfileStatusWithHooks = props => {

    const [ editMode, setEditMode ] = useState(false);
    const [ status, setStatus ] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus( status )
    };
    const onStatusChange = e => {
        setStatus(e.target.value);
    };


    return (
        <div className={style.profileStatus}>
            {!editMode &&
            <div className={style.statusField}>
                <span>Status:  </span>
                <span onDoubleClick={ activateEditMode }>{props.status || "Your Status"}</span>
            </div>
            }
            {editMode &&
            <div className={style.statusEdit}>
                <input
                    autoFocus={ true }
                    onBlur={ deactivateEditMode }
                    value={ status }
                    onChange={ onStatusChange }
                    type="text"
                />
            </div>
            }
        </div>
    )
};

export default ProfileStatusWithHooks;