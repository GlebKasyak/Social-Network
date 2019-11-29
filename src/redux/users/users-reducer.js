import { usersAPI } from "../../api/api";
import { updateObjectInArray } from "../../utils/helpers/objectHelpers";

const FOLLOW = "users/ADD-FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE-IF-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "users/TOGGLE-IF-FOLLOWING-PROGRESS";

const initialState = {
    users: [],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    ifFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };

        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalItemsCount: action.count
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                ifFetching: action.ifFetching

            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.ifFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }

};

export const followSuccess = userId => ( {type: FOLLOW, userId} );
export const unFollowSuccess = userId => ( {type: UNFOLLOW, userId} );
export const setUsers = users => ( {type: SET_USERS, users} );
export const setCurrentPage = currentPage => ( {type: SET_CURRENT_PAGE, currentPage } );
export const setTotalUsersCount = totalCount => ( {type: SET_TOTAL_USERS_COUNT, count: totalCount} );
export const toggleIsFetching = ifFetching => ( {type: TOGGLE_IS_FETCHING, ifFetching} );
export const toggleFollowingProgress = ( ifFetching, userId ) => ( {type: TOGGLE_IS_FOLLOWING_PROGRESS, ifFetching, userId} );


export const requestUsers = ( page, pageSize ) => {
    return async dispatch => {

        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage( page ));

        const responce = await usersAPI.getUsers( page, pageSize );
            dispatch(toggleIsFetching(false));
            dispatch(setUsers( responce.data.items ));
            dispatch(setTotalUsersCount( responce.data.totalCount ));
    }
};

const followUnFollowFlow = async ( dispatch, userId, apiMethod, actionCreator ) => {
    dispatch(toggleFollowingProgress( true, userId));
    const responce = await apiMethod( userId );

    if (responce.data.resultCode === 0) {
        dispatch(actionCreator( userId ))
    }
    dispatch(toggleFollowingProgress( false, userId ));

};


export const follow = userId => {
    return async dispatch => {
        const apiMethod = usersAPI.follow.bind( usersAPI );
        followUnFollowFlow( dispatch, userId, apiMethod, followSuccess );
    }
};

export const unFollow = userId => {
    return async dispatch => {
        const apiMethod = usersAPI.unFollow.bind( usersAPI );
        followUnFollowFlow( dispatch, userId, apiMethod, unFollowSuccess );
    }
};

export default usersReducer;