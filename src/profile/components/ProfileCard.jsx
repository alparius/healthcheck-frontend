import React from 'react'
import '../style/profile.css'
import ProfileCardStatic from './ProfileCardStatic';
import { connect } from 'react-redux'
import { editProfileActionCreator } from '../actions/profileActionCreators';
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import {getUserData} from '../../shared/actions'


class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            surName: "",
            phone: "",
            city: "",
            email: "",
            notEditMode: true,
            invalidFirstName: undefined,
            invalidSurName: undefined,
            invalidPhone: undefined,
            invalidUsername: undefined,
        }
    }

    componentDidMount() {
        this.undo();
    }

    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        },
            () => {
                this.validate();
            }
        )
    }
    toEditMode = (value) => {
        this.setState({
            notEditMode: value,
            invalidFirstName: undefined,
            invalidSurName: undefined,
            invalidPhone: undefined,
            invalidUsername: undefined,
        })
    }
    undo = () => {
        var user = JSON.parse(localStorage.getItem('token'))
        this.setState({
            username: user.username=== null?"":user.username,
            firstName: user.firstName===null?"":user.firstName,
            surName: user.surname === null?"":user.surName,
            phone: user.phone=== null?"":user.phone,
            city: user.city=== null?"":user.city,
            email: user.email,
            notEditMode: true,
            invalidFirstName: undefined,
            invalidSurName: undefined,
            invalidPhone: undefined,
            invalidUsername: undefined,
        })
    }
    redirectOnSucces = async (b) => {
        if (b) {
            await Swal.fire({
                icon: 'success',
                title: 'Profile updated!',
                text: 'We have succesfully updated your profile.',
                confirmButtonColor: '#26ae60',
            })
            this.props.getUserData(localStorage.getItem('token'));

        }
        this.undo();
    }
    saveProfileInfo = () => {
        if (this.state.invalidFirstName === false && this.state.invalidSurName === false
            && this.state.invalidPhone === false && this.state.invalidUsername === false) {
            this.setState({
                notEditMode: true,
                invalidFirstName: undefined,
                invalidSurName: undefined,
                invalidPhone: undefined,
                invalidUsername: undefined,
            });
            this.props.editProfile(this.state.username, this.state.firstName, this.state.surName,
                this.state.phone, this.redirectOnSucces);
        }
    }
    validate = () => {
        this.setState({
            invalidFirstName: this.state.firstName.length === 0,
            invalidSurName: this.state.surName.length === 0,
            invalidPhone: this.state.phone.length === 0 || this.state.phone.match(/^[0-9]+$/) === null,
            invalidUsername: this.state.username.length === 0
        })
    }

    render() {
        return (
            <ProfileCardStatic
                firstName={this.state.firstName}
                surName={this.state.surName}
                phone={this.state.phone}
                city={this.state.city}
                username={this.state.username}
                email={this.state.email}
                notEditMode={this.state.notEditMode}
                onChange={this.onChange}
                toEditMode={this.toEditMode}
                saveProfileInfo={this.saveProfileInfo}
                invalidFirstName={this.state.invalidFirstName}
                invalidSurName={this.state.invalidSurName}
                invalidPhone={this.state.invalidPhone}
                invalidUsername={this.state.invalidUsername}
                undo={this.undo}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfile: (username, firstName, surName, phone, token, redirectOnSuccess) =>
            dispatch(editProfileActionCreator(username, firstName, surName, phone, token, redirectOnSuccess)),
        getUserData: token => dispatch(getUserData(token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileCard))
