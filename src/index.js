import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux';
import { createReduxStore } from './shared/createReduxStore'

const store = createReduxStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

     document.getElementById('root'))

