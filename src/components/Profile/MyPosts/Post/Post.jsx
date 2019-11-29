import React from 'react';
import styles from "./Post.module.css";

const Post = props => {
    return (
        <div className={styles.item}>
            <img src={ props.image.small } alt="post_image"/>
            <div className={styles.post}>
                <span>{ props.message }</span>
            </div>
            <div className={styles.like}>
                <p>Like { props.likeCount }</p>
            </div>
        </div>
)
};

export default Post;