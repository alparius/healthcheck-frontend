import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./shared/components/PrivateRoute";
import Home from "./home/containers/Home";
import Login from "./login/components/Login";
import News from "./news/containers/News";
import Profile from "./profile/containers/Profile";
import Calendar from "./calendar/containers/Calendar";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import PageNotFound from "./shared/components/PageNotFound";
import { connect } from "react-redux";
import { getUserData } from "./shared/actions";
import { loginSuccessAction } from "./login/actions/actionCreators";
import AdminDashboard from "./admin/containers/AdminDashboard";
import Proposals from "./proposals/containers/Proposals";

class App extends Component {
    componentDidMount() {
        let token = localStorage.getItem("token");
        if (token) {
            token = JSON.parse(token);
            this.props.markAsLoggedIn(token.firstName);
            this.props.getUserData(token);
        }
    }

    componentDidUpdate() {
        let token = localStorage.getItem("token");
        if (this.props.isLoggedIn && token !== JSON.stringify(this.props.user)) {
            this.props.getUserData(JSON.parse(token));
        }
    }

    loggedInRoutes() {
        let { isLoggedIn, user } = this.props;
        return (
            <Switch>
                <Route exact path="/" component={Calendar} />
                <PrivateRoute path="/calendar" component={Calendar} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/news" component={News} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/profile" component={Profile} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/proposals" component={Proposals} authorized={isLoggedIn} redir="/login" />
                <Route path="/admin" component={AdminDashboard} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }

    loggedOutRoutes() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/admin" component={AdminDashboard} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }

    render() {
        let routes = this.props.isLoggedIn ? this.loggedInRoutes() : this.loggedOutRoutes();

        return (
            <BrowserRouter>
                <Header />
                {routes}
                <Footer />
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    message: state.auth.message,
    user: state.user,
    profile: state.profileReducer
});

const mapDispatchToProps = (dispatch) => ({
    getUserData: (token) => dispatch(getUserData(token)),
    markAsLoggedIn: (firstName) => dispatch(loginSuccessAction(firstName, false))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
