import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./shared/components/PrivateRoute";
import Home from "./home/containers/Home";
import Login from "./login/components/Login";
import News from "./news/containers/News";
import Calendar from "./calendar/containers/Calendar";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import PageNotFound from "./shared/components/PageNotFound";
import { connect } from "react-redux";
import { getUserData } from "./shared/actions";
import { loginSuccessAction } from "./login/actions/actionCreators";
import AdminDashboard from "./admin/containers/AdminDashboard";
import Pills from "./proposals/containers/Pills";
import Tab1 from "./tab1/Tab1";
import HealthIssue from "./tab1/HealthIssue";
import Profile from "./profile/containers/Profile";

let issues = [
    {
        title: "Diabetes",
        text:
            "first discovered in: 2012 june \nI felt somethings no good long before, but sadly I haven't acted on it in time \n\nso it is already in Stage 2\n\n\nwhat I've tried so far:\n- acupuncture treatments\n- a dozen types of pills\n- the paleo diet\n- all the pseudo-science trends of the past 5 years\n\npills I'm currently taking:\n- Algocamin\n- Ibuprofen\n- Parasinus\n- Paracetamol\n- Nurofen\n\nclinics I've visited so far:\n - all big clinics of Romania\n- Semmelweis University, Budapest\n- Karlova Clinic in Prague\n- Oxford",
        files: [
            "results-2020-01-03.pdf",
            "results-2020-02-03.pdf",
            "blood-sugar-level-graph.png",
            "blood-sugar-level-graph.png",
            "blood-sugar-level-graph.png"
        ]
    },
    { title: "Spine pain", text: "Lorem ipsum...", files: ["results-2020-01-03.pdf", "results-2020-02-03.pdf", "scan-2020-01-03.pdf"] },
    {
        title: "Dental issues",
        text:
            "I have some medicine put in my RIGHT-TOP 3rd tooth\nsometimes check if it's still there\n\n2 more cavities left\ndoc estimated it to cost 350 ron in total",
        files: ["scan-2020-02-03.pdf", "fisa-personala-dentaldent.pdf", "scan-2019-08-23.pdf"]
    },
    { title: "Myopia", text: "Lorem ipsum...", files: ["lenses-offers.pdf", "self-evaluation.pdf"] }
];

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
        let { isLoggedIn } = this.props;
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <PrivateRoute path="/profile" component={Tab1} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/calendar" component={Calendar} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/news" component={News} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/account" component={Profile} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/pills" component={Pills} authorized={isLoggedIn} redir="/login" />

                <PrivateRoute path="/healthissue/1" component={() => <HealthIssue issue={issues[0]} />} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/healthissue/2" component={() => <HealthIssue issue={issues[1]} />} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/healthissue/3" component={() => <HealthIssue issue={issues[2]} />} authorized={isLoggedIn} redir="/login" />
                <PrivateRoute path="/healthissue/4" component={() => <HealthIssue issue={issues[3]} />} authorized={isLoggedIn} redir="/login" />

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
