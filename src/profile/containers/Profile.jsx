import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

import ProfileCard from "../components/ProfileCard";
import ProfileChangePassword from "../components/ProfileChangePassword";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            surName: "",
            phone: "",
            city: "",
            email: "",
            confirmPassword: "",
            notEditMode: true
        };
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem("token"));
        this.setState({
            username: user.username,
            firstName: user.firstName,
            surName: user.surname,
            phone: user.phone,
            city: user.city,
            email: "laura@gmail.com",
            notEditMode: true
        });
    }
    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        });
    };
    toEditMode = () => {
        this.setState({
            notEditMode: false
        });
    };
    saveProfileInfo = () => {
        this.setState({
            notEditMode: true
        });
    };
    redirectOnSucces = () => {
        //TODO: call logout
        localStorage.removeItem("token");
        this.props.history.push("/login");
    };

    render() {
        return (
            <Container fluid className="w-75">
                <ProfileCard />
                <ProfileChangePassword />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispachToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispachToProps)(Profile);
