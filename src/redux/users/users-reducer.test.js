import usersReducer, {followSuccess, setUsers, toggleIsFetching, unFollowSuccess} from "./users-reducer";

const initialState = {
    users: [
        {
            followed: false,
            id: 5268,
        },
        {
            followed: true,
            id: 5300,
        },
    ],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    ifFetching: false,
    followingInProgress: []
};

it("followed should be true", () => {
    const action = followSuccess(5268);
    const newState = usersReducer( initialState, action );

    expect(newState.users[0].followed).toBeTruthy();
});

it("followed should be false", () => {
    const action = unFollowSuccess(5300);
    const newState = usersReducer( initialState, action );

    expect(newState.users[1].followed).toBeFalsy();
});

it("new user should be added", () => {
    const newUser = {name: "Sasha", id: 1984};
    const action = setUsers([newUser]);
    const newState = usersReducer( initialState, action );

    expect(newState.users[2]).not.toBeNull();
});

it("ifFetching should be true", () => {
    const action = toggleIsFetching(true);
    const newState = usersReducer( initialState, action );

    expect(newState.ifFetching).toBeTruthy();
});
