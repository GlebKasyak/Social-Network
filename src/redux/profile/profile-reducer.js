import { profileAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
import { incrementId } from "../../utils/helpers/objectHelpers";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_STATUS = "profile/SET-STATUS";
const DELETE_POST = "profile/DELETE-POST";
const SAVE_PHOTO_SUCCESS = "profile/SAVE-PHOTO-SUCCESS";

const initialState = {
    posts: [
        {id: 1, message: "first message", likeCount: 0},
        {id: 2, message: "second message", likeCount: 1},
        {id: 3, message: "third message", likeCount: 2}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: incrementId( state.posts ),
                message: action.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                newPostText: "",
                posts: [ ...state.posts, newPost ]
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(user =>
                    user.id !== action.postId
                )
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        default:
            return state;
    }

};

export const addPost = newPostText => ( {type: ADD_POST, newPostText} );
export const setUserProfile = profile => ( {type: SET_USER_PROFILE, profile} );
export const setStatus = status => ( {type: SET_STATUS, status} );
export const deletePost = postId => ( {type: DELETE_POST, postId} );
export const savePhotoSuccess = photos => ( {type: SAVE_PHOTO_SUCCESS, photos} );

export const getUserProfile = userId => async dispatch => {
    const responce = await profileAPI.getProfile( userId );
    dispatch(setUserProfile( responce.data ));
};

export const getUserStatus = userId => async dispatch => {
    const responce = await profileAPI.getStatus( userId );
    dispatch(setStatus( responce.data ));
};

export const updateUserStatus = status => async dispatch => {
    const responce = await profileAPI.updateStatus( status );
    if(responce.data.resultCode === 0) dispatch(setStatus( status ));
};

export const savePhoto = file => async dispatch => {
    const responce = await profileAPI.savePhoto( file );
    if(responce.data.resultCode === 0) dispatch(savePhotoSuccess( responce.data.data.photos ));
};

export const saveProfile = profile => async ( dispatch, getState ) => {
    const userId = getState().auth.id;
    const responce = await profileAPI.saveProfile( profile );
    if(responce.data.resultCode === 0) {
        dispatch(getUserProfile( userId ))
    } else {
        dispatch( stopSubmit("editProfile", {_error: responce.data.messages[0]}) );
        return Promise.reject(responce.data.messages[0]);
    }
};

export default profileReducer;