import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import authReducer from "../login/reducers"
import profileReducer from "../profile/reducers/profileReducer"
import userDataReducer from './reducers'
import adminReducer from '../admin/reducers/adminReducer'
import calendarReducer from '../calendar/reducers'
import proposalsReducer from '../proposals/reducers'

export const createReduxStore = () => {
    let middlewares = [thunk]
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        const logger = createLogger()
        middlewares.push(logger)
    }


    const rootReducer = combineReducers({
        user: userDataReducer,
        auth : authReducer,
        profileReducer: profileReducer,
        adminReducer : adminReducer,
        calendar: calendarReducer,
        proposalsReducer: proposalsReducer
    })

    
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    )
    return store
}

