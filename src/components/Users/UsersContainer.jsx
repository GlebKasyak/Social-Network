import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import {
    follow,
    setCurrentPage,
    toggleFollowingProgress,
    unFollow,
    requestUsers
} from "../../redux/users/users-reducer";

import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {
    getUsers,
    getPageSize,
    getTotalItemsCount,
    getCurrentPage,
    getIfFetching,
    getFollowingInProgress
} from "../../redux/users/users_selectors";


class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, pageSize, requestUsers } = this.props;
        requestUsers( currentPage, pageSize );
    }

    onPageChanged = ( pageNumber ) => {
        let { setCurrentPage, pageSize, requestUsers } = this.props;
        requestUsers( pageNumber, pageSize );
        setCurrentPage( pageNumber );
    };

    render() {
        return (
            <>
                {this.props.ifFetching ? <Preloader /> : null}
                <Users
                    totalItemsCount={ this.props.totalItemsCount }
                    pageSize={ this.props.pageSize }
                    currentPage={ this.props.currentPage }
                    users={ this.props.users }
                    unFollow={ this.props.unFollow }
                    follow={ this.props.follow }
                    followingInProgress={ this.props.followingInProgress }
                    onPageChanged={ this.onPageChanged }
                />
            </>

        )
    }
}


let mapStateToProps = state => {
    return {
        users: getUsers( state ),
        pageSize: getPageSize( state ),
        totalItemsCount: getTotalItemsCount( state ),
        currentPage: getCurrentPage( state ),
        ifFetching: getIfFetching( state ),
        followingInProgress: getFollowingInProgress( state )
    }
};

export default compose(
    connect(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        toggleFollowingProgress,
        requestUsers
    })
)(UsersContainer)