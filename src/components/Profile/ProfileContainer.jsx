import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withAuthRedirect, withRouter} from "../../hoc/HOCs";
import Login from "../Login/Login";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.router.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId; // 27596 //2
            //this.props.navigate('/login');
        }
        if (!userId) {
            //this.props.navigate("/login");
            userId = 27596//1079//;
        }
        /*
                if(!this.props.authorizedUserId && !userId){
                    return <Login/>
                }*/


        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }


    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter
    //withAuthRedirect
)(ProfileContainer)

