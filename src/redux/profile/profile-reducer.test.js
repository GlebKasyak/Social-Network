import profileReducer, {addPost, deletePost, setStatus} from "./profile-reducer";


let initialState = {
    posts: [
        {id: 1, message: "first message", likeCount: 0},
        {id: 2, message: "second message", likeCount: 1},
        {id: 3, message: "third message", likeCount: 2}
    ],
    status: ""
};

it("length of posts should be incremented", () => {
    let action = addPost("test");
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(4);
});

it("message of new post should be correct", () => {
    let action = addPost("test");
    let newState = profileReducer(initialState, action);

    expect(newState.posts[3].message).toBe("test");
});

it("status should be changed", () => {
    let action = setStatus("test");
    let newState = profileReducer(initialState, action);

    expect(newState.status).toBe("test");
});

it("after deleting length of message should be decrement", () => {
    let action = deletePost(1);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(2);
});

it("after deleting length shouldn't be decrement if id is incorrect", () => {
    let action = deletePost(1000);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);
});