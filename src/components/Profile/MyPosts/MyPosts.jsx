import React from 'react';
import styles from "./MyPosts.module.css";

import Post from "./Post/Post"
import AddNewPostFormRedux from "./AddNewPostForm";

const MyPosts = React.memo(props => {

    const postsElements = props.posts.map(post =>
        <Post key={ post.id } message={ post.message } likeCount={ post.likeCount } image={!!props.profile && props.profile.photos}/>);

    const onAddPost = newPost => {
        props.addPost(newPost.newPostText);

    };

    return (
        <div className={styles.postsBlock}>
            <div>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={ onAddPost }/>
            </div>
            <div className={styles.posts}>
                { postsElements }
            </div>
        </div>
    )
});


export default MyPosts;