import React from "react";
import styles from "./Message.module.css";
import { NavLink } from "react-router-dom";

const Message = props => {
    return(
        <div className={ styles.messages }>
            <div className={ styles.dialog }>
                <NavLink to={`/dialogs/${props.id}`}>{ props.name }</NavLink>
            </div>
            <div className={ styles.message }>{ props.message }</div>
        </div>
    )
};

export default Message;