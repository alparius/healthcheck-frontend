import axios from "axios";
import {
    ADD_SUCCESS,
    ADD_FAILURE,
    ADD_REQUEST,
    GET_VOLUNTEERS_REQUEST,
    GET_VOLUNTEERS_SUCCESS,
    GET_VOLUNTEERS_FAILURE,
    GET_HOSPITALS_SUCCESS,
    GET_HOSPITALS_FAILURE,
    GET_HOSPITALS_REQUEST,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE
} from "./adminActionTypes";
import Swal from "sweetalert2";
// --------------- ADD --------------------
export const addRequestAction = () => {
    return {
        type: ADD_REQUEST
    };
};

export const addSuccessAction = () => {
    return {
        type: ADD_SUCCESS
    };
};

export const addFailureAction = () => {
    return {
        type: ADD_FAILURE
    };
};

export const addActionCreator = (email) => {
    return (dispatch) => {
        dispatch(addRequestAction());
        console.log(email);
        return axios
            .post("http://localhost:8080/api/user/leader/add", {
                email: email
            })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Registration complete!",
                    text: "We sent an email to the given email adress with a generated password.",
                    confirmButtonColor: "#26ae60"
                });
                dispatch(addSuccessAction());
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong.",
                    confirmButtonColor: "#26ae60",
                    confirmButtonText: "OK"
                });
                dispatch(addFailureAction());
            });
    };
};

// --------------- GET VOLUNTEERS --------------------
export const getVolunteersRequestAction = () => {
    return {
        type: GET_VOLUNTEERS_REQUEST
    };
};

export const getVolunteersSuccessAction = (volunteers) => {
    return {
        type: GET_VOLUNTEERS_SUCCESS,
        volunteers: volunteers
    };
};

export const getVolunteersFailureAction = () => {
    return {
        type: GET_VOLUNTEERS_FAILURE
    };
};

export const getVolunteersActionCreator = (city) => {
    return (dispatch) => {
        dispatch(addRequestAction());
        return axios
            .get("http://localhost:8080/api/user/leader/getVolunteersByCity?city=" + city)
            .then((res) => {
                dispatch(getVolunteersSuccessAction(res.data));
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong.",
                    confirmButtonColor: "#26ae60",
                    confirmButtonText: "OK"
                });
                dispatch(getVolunteersFailureAction());
            });
    };
};
// --------------- GET HOSPITALS --------------------
export const getHospitalsRequestAction = () => {
    return {
        type: GET_HOSPITALS_REQUEST
    };
};

export const getHospitalsSuccessAction = (hospitals) => {
    return {
        type: GET_HOSPITALS_SUCCESS,
        hospitals: hospitals
    };
};

export const getHospitalsFailureAction = () => {
    return {
        type: GET_HOSPITALS_FAILURE
    };
};
export const getHospitalsActionCreator = (city) => {
    return (dispatch) => {
        dispatch(getHospitalsRequestAction());
        return axios
            .get("http://localhost:8080/api/hospital/getHospitalsByCity?city=" + city)
            .then((res) => {
                dispatch(getHospitalsSuccessAction(res.data));
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong.",
                    confirmButtonColor: "#26ae60",
                    confirmButtonText: "OK"
                });
                dispatch(getHospitalsFailureAction());
            });
    };
};

// --------------- DELETE ----------------------
export const deleteRequestAction = () => {
    return {
        type: DELETE_REQUEST
    };
};

export const deleteSuccessAction = () => {
    return {
        type: DELETE_SUCCESS
    };
};

export const deleteFailureAction = () => {
    return {
        type: DELETE_FAILURE
    };
};

export const deleteActionCreator = (volunteerId, city) => {
    return (dispatch) => {
        dispatch(deleteRequestAction());
        return axios
            .post("http://localhost:8080/api/user/leader/delete?userId=" + volunteerId)
            .then((res) => {
                dispatch(deleteSuccessAction());
                dispatch(getVolunteersActionCreator(city));
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong.",
                    confirmButtonColor: "#26ae60",
                    confirmButtonText: "OK"
                });
                dispatch(deleteFailureAction());
            });
    };
};
