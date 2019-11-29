import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/auth-reducer";
import { getPhoto } from "../../redux/profile/profile_selectors";
import { getUserProfile } from "../../redux/profile/profile-reducer";
import { getAuthorizedUserID } from "../../redux/auth/auth_selectors";

class HeaderContainer extends React.Component {

    componentDidMount() {
        const { getUserProfile, authorizedUserID } = this.props;
        getUserProfile( authorizedUserID );
    }

    render() {
        return <Header {...this.props} image={!!this.props.profile && this.props.profile.photos}/>
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: getPhoto( state ),
    authorizedUserID: getAuthorizedUserID( state )
});

export default connect(mapStateToProps, { logout, getUserProfile })(HeaderContainer);