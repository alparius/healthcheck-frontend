import { LOAD_ACTIVITIES, LOAD_ACTIVITIES_SUCCESS, LOAD_ACTIVITIES_FAILURE, 
         DELETE_ACTIVITY_SUCCESS, DELETE_ACTIVITY_FAILURE, 
         CREATE_ACTIVITY_SUCCESS, CREATE_ACTIVITY_FAILURE, 
         UPDATE_ACTIVITY_SUCCEESS, UPDATE_ACTIVITY_FAILURE } from '../actions'

const intialState = {
    isFetching: false,
    activities: []
}

const calendarReducer = (state = intialState, action) => {
    let index, activities
    switch (action.type) {
        case LOAD_ACTIVITIES:
            return {
                ...state,
                isFetching: true
            }
        case LOAD_ACTIVITIES_SUCCESS:
            return {
                isFetching: false,
                activities: action.activities
            }
        case DELETE_ACTIVITY_SUCCESS:
            index = state.activities.findIndex(activity => activity.id === action.activityId)
            activities = [...state.activities]
            activities.splice(index, 1)
            return {
                isFetching: false,
                activities
            }
        case CREATE_ACTIVITY_SUCCESS:
            return {
                isFetching: false,
                activities: [
                    ...state.activities,
                    action.activity
                ]
            }
        case UPDATE_ACTIVITY_SUCCEESS:
            index = state.activities.findIndex(activity => activity.id === action.activity.id)
            activities = [...state.activities]
            activities[index] = action.activity
            return {
                activities
            }

        case LOAD_ACTIVITIES_FAILURE || DELETE_ACTIVITY_FAILURE || CREATE_ACTIVITY_FAILURE || UPDATE_ACTIVITY_FAILURE:
            return {
                isFetching: false,
                ...state
            }
        default:
            return state
    }
}

export default calendarReducer