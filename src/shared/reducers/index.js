import { GET_USER_DATA, CLEAR_USER_DATA } from '../actions'

export default function userDataReducer(state = {}, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return action.token

        case CLEAR_USER_DATA:
            return {}

        default:
            return state
    }

}