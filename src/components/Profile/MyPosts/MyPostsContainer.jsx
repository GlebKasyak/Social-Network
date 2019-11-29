import { addPost } from "../../../redux/profile/profile-reducer";
import { connect } from "react-redux";
import MyPosts from "./MyPosts";
import { getNewPosts, getPhoto, getPosts } from "../../../redux/profile/profile_selectors";


let mapStateToProps = state => {
    return {
        posts: getPosts( state ),
        newPostText: getNewPosts( state ),
        profile: getPhoto( state )
    }
};

const MyPostsContainer = connect(mapStateToProps, { addPost })( MyPosts );

export default MyPostsContainer;