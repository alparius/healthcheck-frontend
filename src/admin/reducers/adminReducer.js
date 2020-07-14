import { GET_VOLUNTEERS_SUCCESS,GET_HOSPITALS_SUCCESS } from "../actions/adminActionTypes";

const initialState = {
    volunteers: [],
    hospitals:[],
}

const adminReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case GET_HOSPITALS_SUCCESS:
            newState.hospitals = action.hospitals;
            break;
        case GET_VOLUNTEERS_SUCCESS:
            newState.volunteers = action.volunteers;
            break;
        default:
            break;
    }
    return newState;
}

export default adminReducer