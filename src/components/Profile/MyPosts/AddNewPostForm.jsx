import React from "react";
import { reduxForm } from "redux-form";
import { requiredField, maxLengthCreator } from "../../../utils/validators/validators";
import { Textarea, createFiend } from "../../../common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(100);

const AddNewPostForm = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                { createFiend("Add your post", "newPostText", [requiredField, maxLength50], Textarea) }
            </div>
            <div>
                <button >Add post</button>
            </div>
        </form>
    )
};

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})( AddNewPostForm );

export default AddNewPostFormRedux;