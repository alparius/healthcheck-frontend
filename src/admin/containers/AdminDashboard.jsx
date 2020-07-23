import React from "react";
import { connect } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";

import { addActionCreator } from "../actions/adminActionCreator";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            invalidEmail: undefined
        };
    }

    componentDidMount() {
        this.setState({
            invalidEmail: undefined
        });
    }

    onChange = (event) => {
        const { value, name } = event.target;
        this.setState(
            {
                [name]: value
            },
            () => {
                this.validate();
            }
        );
    };

    validate = () => {
        var isEmail = this.validateEmail(this.state.email);
        this.setState({
            invalidEmail: this.state.email.length === 0 || isEmail === false
        });
    };

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    save = () => {
        this.props.addVolunteer(this.state.email);
    };

    render() {
        return (
            <Container fluid className="w-75 d-flex justify-content-center align-items-center">
                <Form style={{ marginTop: "15%" }} fluid>
                    <label htmlFor="basic-url">
                        <b>Email:</b>
                    </label>
                    <Form.Group controlId="formFirstName">
                        <Form.Control
                            onChange={this.onChange}
                            name="email"
                            type="email"
                            id="basic-url"
                            style={{ width: "30em" }}
                            aria-describedby="basic-addon3"
                            isInvalid={this.state.invalidEmail}
                            isValid={this.state.invalidEmail === undefined ? undefined : !this.state.invalidEmail}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Required field!</Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        disabled={this.state.invalidEmail !== false}
                        style={{
                            backgroundColor: "rgb(38, 174, 96)",
                            width: "100%"
                        }}
                        onClick={() => {
                            this.save();
                        }}
                    >
                        Register
                    </Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        adminReducer: state.adminReducer,
        userReducer: state.user
    };
};

const mapDispachToProps = (dispatch) => {
    return {
        addVolunteer: (email) => dispatch(addActionCreator(email))
    };
};

export default connect(mapStateToProps, mapDispachToProps)(AdminDashboard);
