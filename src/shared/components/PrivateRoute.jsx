import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class PrivateRoute extends Component {

    render() {
        let { component: Component, authorized, redir, ...rest } = this.props
        return (
            <Route {...rest} render={(props) => {
                return authorized === true ? <Component {...props} />: <Redirect to={redir} />
            }} />
        )
    }
}
