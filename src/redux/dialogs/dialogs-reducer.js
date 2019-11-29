import { incrementId } from "../../utils/helpers/objectHelpers";

const SEND_MESSAGE = "dialogs/SEND-MESSAGE";

const initialState = {
    messages: [
        {id: 1, name: "Gleb", message: "Hi, I am junior frontend developer"},
        {id: 2, name: "Andrey", message: "Hi"},
        {id: 3, name: "Sveta", message: "Hello world!"},
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE:
            const userName = action.payload.userName;
            const newMessage = action.payload.newMessageBody;
            return {
                ...state,
                messages: [
                    ...state.messages, {id: incrementId( state.messages ), name: userName, message: newMessage}]
            };
        default:
            return state;
    }
};

export const sendMessageCreator = payload => ({type: SEND_MESSAGE, payload});

export default dialogsReducer;