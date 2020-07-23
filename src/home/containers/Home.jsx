import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <>
                <img alt="pic2" src="images/pulse.jpg" style={{ width: "100vw" }}></img>
                <br />
                <br />
                <div className="h-75 d-flex justify-content-center align-items-center">
                    <div style={{ lineHeight: "2em" }}>
                        <h3>
                            The <b style={{ color: "green" }}>Health Check</b> application
                        </h3>
                        <div style={{ fontSize: "20px" }}>
                            is a platform to oversee all of your health related issues. Whether you
                            <br /> - are searching for a specialist in your area
                            <br /> - always forget to take your medications
                            <br /> - want to manage your upcoming visits to your doctors
                            <br /> - etc.
                            <br />
                            <br />
                        </div>
                        <h4>
                            <NavLink to="/login" activeClassName="active-link">
                                Log in
                            </NavLink>{" "}
                            or{" "}
                            <NavLink to="/admin" activeClassName="active-link">
                                Sign up
                            </NavLink>{" "}
                            to get started!
                        </h4>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispachToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispachToProps)(Home);
