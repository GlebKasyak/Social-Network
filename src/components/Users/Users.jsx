import React from "react";
import style from "./Users.module.css";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";


const Users = React.memo(props => {
    return (
        <div className={style.userPage}>
            <Paginator
                totalItemsCount={ props.totalItemsCount }
                pageSize={ props.pageSize }
                currentPage={ props.currentPage }
                onPageChanged={ props.onPageChanged }
                portionSize={ 10 }
            />
            {
                props.users.map(user => {
                    return (
                        <User
                            key={ user.id }
                            user={ user }
                            followingInProgress={ props.followingInProgress }
                            unFollow={ props.unFollow }
                            follow={ props.follow }
                        />

                    )
                })
            }
        </div>
    )
});


export default Users;