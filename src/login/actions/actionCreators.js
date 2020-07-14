import axios from 'axios'
import Swal from 'sweetalert2'

import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS,
         LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './actionTypes'

export const loginRequestAction = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginFailureAction = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: LOGIN_FAILURE
    }
}

export const loginSuccessAction = (name, fireAlert = true) => {
    if (fireAlert) {
        Swal.fire({
            icon: 'success',
            title: `Welcome ${name}`,
            showConfirmButton: false,
            timer: 4000
        })
    }
    return {
        type: LOGIN_SUCCESS,
        message: `Welcome ${name}!`
    }
}

export const loginActionCreator = (email, password, redirectOnSuccess) => {
    return dispatch => {
        dispatch(loginRequestAction())
        return axios
            .post("http://localhost:8080/api/login",
                {
                    email: email,
                    password: password
                })
            .then(res => {
                const token = res.data
                localStorage.setItem('token', JSON.stringify(token))
                dispatch(loginSuccessAction(token.firstName))
                redirectOnSuccess()
            })
            .catch((err) => dispatch(loginFailureAction()))
    }
}

export const logoutRequest = () => {
    Swal.fire({
        icon: 'success',
        title: 'Logged out successfully!',
        showConfirmButton: false,
        timer: 4000
    })
    return {
        type: LOGOUT_REQUEST
    }
}

export const logoutSuccess = () => {
    localStorage.clear()
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Could not logout!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: LOGOUT_FAILURE
    }
}

export const logoutUser = () => {
    let data = {}
    let token = JSON.parse(localStorage.getItem('token'))
    let config = {
        headers: {
            authorization: token.userToken
        }
    }
    return async (dispatch) => {
        dispatch(logoutRequest())
        try {
           await axios.post('http://localhost:8080/api/user/logout',
                data,
                config
            )
            dispatch(logoutSuccess())
        } catch (err) {
            dispatch(logoutFailure())
        }
    }
}