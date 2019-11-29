import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import {
    getUserStatus,
    getUserProfile,
    updateUserStatus,
    savePhoto,
    saveProfile
} from "../../redux/profile/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getAuth, getAuthorizedUserID } from "../../redux/auth/auth_selectors";
import { getProfile, getStatus } from "../../redux/profile/profile_selectors";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserID;
            !userId && this.props.history.push("/login");

        }

        this.props.getUserProfile( userId );
        this.props.getUserStatus( userId );
    }

    componentDidMount() {
       this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile
            {...this.props}
            isOwner={ !this.props.match.params.userId }
            profile={ this.props.profile }
            status={ this.props.status }
            updateUserStatus={ this.props.updateUserStatus }
            savePhoto={ this.props.savePhoto }
        />
    }

};

let mapStateToProps = state => ({
    profile: getProfile( state ),
    status: getStatus( state ),
    authorizedUserID: getAuthorizedUserID( state ),
    isAuth: getAuth( state )
});

export default compose(
    connect( mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter,
)(ProfileContainer);
