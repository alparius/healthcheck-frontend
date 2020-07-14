export const GET_USER_DATA = 'GET_USER_DATA'
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'

export const getUserData = token => {
    return {
        type: GET_USER_DATA,
        token
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA
    }
}