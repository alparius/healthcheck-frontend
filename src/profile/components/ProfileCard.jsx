import React from "react";
import "../style/profile.css";
import ProfileCardStatic from "./ProfileCardStatic";
import { connect } from "react-redux";
import { editProfileActionCreator } from "../actions/profileActionCreators";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserData } from "../../shared/actions";

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            surName: "",
            email: "",
            notEditMode: true,
            invalidFirstName: undefined,
            invalidSurName: undefined,
            invalidUsername: undefined
        };
    }

    componentDidMount() {
        this.undo();
    }

    onChange = (event) => {
        const { value, name } = event.target;

        this.setState(
            {
                [name]: value
            },
            () => {
                this.validate();
            }
        );
    };
    toEditMode = (value) => {
        this.setState({
            notEditMode: value,
            invalidFirstName: undefined,
            invalidSurName: undefined,
            invalidUsername: undefined
        });
    };
    undo = () => {
        var user = JSON.parse(localStorage.getItem("token"));
        this.setState({
            username: user.username === null ? "" : user.username,
            firstName: user.firstName === null ? "" : user.firstName,
            surName: user.surname === null ? "" : user.surName,
            email: user.email,
            notEditMode: true,
            invalidFirstName: undefined,
            invalidSurName: undefined,

            invalidUsername: undefined
        });
    };
    redirectOnSucces = async (b) => {
        if (b) {
            await Swal.fire({
                icon: "success",
                title: "Profile updated!",
                text: "We have succesfully updated your profile.",
                confirmButtonColor: "#26ae60"
            });
            this.props.getUserData(localStorage.getItem("token"));
        }
        this.undo();
    };
    saveProfileInfo = () => {
        if (
            this.state.invalidFirstName === false &&
            this.state.invalidSurName === false &&
            this.state.invalidUsername === false
        ) {
            this.setState({
                notEditMode: true,
                invalidFirstName: undefined,
                invalidSurName: undefined,
                invalidUsername: undefined
            });
            this.props.editProfile(this.state.username, this.state.firstName, this.state.surName, this.redirectOnSucces);
        }
    };
    validate = () => {
        if (this.state.firstName) {
            this.setState({
                invalidFirstName: this.state.firstName.length === 0
            });
        } else {
            this.setState({
                invalidFirstName: true
            });
        }
        if (this.state.surName) {
            this.setState({
                invalidSurName: this.state.surName.length === 0
            });
        } else {
            this.setState({
                invalidSurName: true
            });
        }
        if (this.state.username) {
            this.setState({
                invalidUsername: this.state.username.length === 0
            });
        } else {
            this.setState({
                invalidUsername: true
            });
        }
    };

    render() {
        return (
            <ProfileCardStatic
                firstName={this.state.firstName}
                surName={this.state.surName}
                username={this.state.username}
                email={this.state.email}
                notEditMode={this.state.notEditMode}
                onChange={this.onChange}
                toEditMode={this.toEditMode}
                saveProfileInfo={this.saveProfileInfo}
                invalidFirstName={this.state.invalidFirstName}
                invalidSurName={this.state.invalidSurName}
                invalidUsername={this.state.invalidUsername}
                undo={this.undo}
            />
        );
    }
}
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (username, firstName, surName, token, redirectOnSuccess) =>
            dispatch(editProfileActionCreator(username, firstName, surName, token, redirectOnSuccess)),
        getUserData: (token) => dispatch(getUserData(token))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileCard));
