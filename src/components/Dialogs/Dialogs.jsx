import React from "react";
import styles from "./Dialogs.module.css";

import Message from "./Message/Message";
import AddMessageReduxForm from "./AddMessageForm";

const Dialogs = props => {

    const { messages } = props.dialogsPage;
    const messagesElements =
        messages.map( message =>
            <Message key={ message.id } name={ message.name } message={ message.message } id={ message.id }/>);

    const addNewMessage = formData => {
        props.sendMessageCreator( formData );
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.messages}>
                <div> { messagesElements }</div>
            </div>
            <AddMessageReduxForm onSubmit={ addNewMessage }/>
        </div>
    )

};

export default Dialogs;