import React from "react";
import style from "./Users.module.css";
import avatarImage from "./../../images/avtar.jpg"
import { NavLink } from "react-router-dom";


const User = ( {user, followingInProgress, unFollow, follow} ) => {
    return (
        <div className={style.user}>
            <div className={style.userPhotoWrapper}>
                <NavLink to={`/profile/${user.id}`} target="_blank">
                    <img src={user.photos.small ? user.photos.small : avatarImage} alt="user_Photo"
                         className={style.userPhoto}/>
                </NavLink>
            </div>
            <h2 className={style.userName}>{user.name}</h2>
            <div className={style.status}>
                {user.status}
            </div>
            <div className={style.followed}>
                {user.followed
                    ? <button  disabled={followingInProgress.some(id => id === user.id)}
                               onClick={() => {unFollow( user.id )}}>Un Follow</button>

                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {follow( user.id )}}>Follow</button>
                }
            </div>
        </div>
    )
};


export default User;