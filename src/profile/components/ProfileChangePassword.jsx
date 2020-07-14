import React from 'react'
import '../style/profile.css'
import ProfileChangePasswordStatic from './ProfileChangePasswordStatic';
import { connect } from 'react-redux'
import { changePassActionCreator } from '../actions/profileActionCreators'
import Swal from 'sweetalert2'
import { history } from '../../shared/history'


class ProfileChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirm: "",
            invalidPassword: undefined,
            invalidConfirm: undefined,
        }
    }

    componentDidMount() {
        this.setState({
            password: "",
            confirm: "",
            invalidPassword: undefined,
            invalidConfirm: undefined,
        })
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
    validate = () => {
        this.setState({
            invalidPassword: this.state.password.length === 0,
            invalidConfirm: this.state.confirm.length === 0 || this.state.confirm !== this.state.password
        })
    }
    redirectOnSucces = async () => {
        await Swal.fire({
            icon: 'success',
            title: 'Password updated!',
            text: 'We will redirect you to login again ....',
            confirmButtonColor: '#db3d44',
            confirmButtonText:'Got it!'
        })
        localStorage.removeItem('token')
        history.push("/login")
        window.location.reload()

    }
    savePassword = () => {
        if(this.state.invalidPassword === false && this.state.invalidConfirm === false){
            this.props.changePassword(this.state.password, this.redirectOnSucces)
        }
        else{
            Swal.fire({
                icon: 'warning',
                title: 'Forgot something?',
                text: 'Please make sure all fields are correct.',
                confirmButtonColor: '#db3d44',
                confirmButtonText:'Got it!'
            })
        }
    }
    render() {
        return (
            <ProfileChangePasswordStatic
                password={this.state.password}
                confirm={this.state.confirm}
                onChange={this.onChange}
                savePassword={this.savePassword}
                invalidConfirm={this.state.invalidConfirm}
                invalidPassword={this.state.invalidPassword}
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
        changePassword: (password, redirectOnSuccess) => dispatch(changePassActionCreator(password, redirectOnSuccess))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileChangePassword)
