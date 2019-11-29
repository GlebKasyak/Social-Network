import dialogsReducer, { sendMessageCreator } from "./dialogs-reducer";

const initialState = {
    messages: [
        {id: 1, name: "Sveta", message: "Hello world!"}
    ]
};

it("the first message id < the second message id", () => {
    const action = sendMessageCreator({name: "Gleb", message: "Test done"});
    const newState = dialogsReducer( initialState, action );

    expect(initialState.messages[0].id < newState.messages[1].id).toBeTruthy();
});