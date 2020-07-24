import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { logoutUser } from "../../login/actions/actionCreators";

class Header extends React.Component {
    loggedInHeaderLinks() {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentDate = new Date();
        let currentDay = days[currentDate.getDay()];
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    <NavLink className="header-link" to="/profile" activeClassName="active-link">
                        {" "}
                        Profile{" "}
                    </NavLink>
                    <NavLink className="header-link" to="/calendar" activeClassName="active-link">
                        {" "}
                        Calendar{" "}
                    </NavLink>
                    <NavLink className="header-link" to={`/proposals/${currentDay}`} activeClassName="active-link">
                        {" "}
                        Proposals{" "}
                    </NavLink>
                    <NavLink className="header-link" to="/news" activeClassName="active-link">
                        {" "}
                        Reports{" "}
                    </NavLink>
                </Nav>

                <Navbar.Collapse className="justify-content-end">
                    <NavLink className="header-link" to="/account" activeClassName="active-link">
                        Account <FaUser />
                    </NavLink>

                    <NavLink className="header-link" to="/" onClick={this.props.logout}>
                        Logout <FaSignOutAlt />
                    </NavLink>
                </Navbar.Collapse>
            </React.Fragment>
        );
    }

    loginHeaderLink() {
        return (
            <>
                <Navbar.Collapse className="justify-content-end">
                    <NavLink className="header-link" to="/login" activeClassName="active-link">
                        Log in <FaSignInAlt />
                    </NavLink>

                    <NavLink className="header-link" to="/admin" activeClassName="active-link">
                        Sign up <FaSignInAlt />
                    </NavLink>
                </Navbar.Collapse>
            </>
        );
    }

    render() {
        let { isLoggedIn } = this.props;
        let links = this.loginHeaderLink();
        if (isLoggedIn) {
            links = this.loggedInHeaderLinks();
        }
        let logoLink = isLoggedIn ? "/calendar" : "/";
        return (
            <Navbar bg="light" sticky="top">
                <Navbar.Brand>
                    <NavLink to={logoLink} id="logo" className="header-link">
                        Health Check
                    </NavLink>
                </Navbar.Brand>

                {links}
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
