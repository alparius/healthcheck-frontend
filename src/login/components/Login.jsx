import { Form, Button, Container, Spinner } from "react-bootstrap";
import React from "react";
import { connect } from "react-redux";
import { loginActionCreator } from "../actions/actionCreators";
import { withRouter } from "react-router-dom";

/**
 * @author [Laura]
 */
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password, this.redirectOnSucces);
    };

    redirectOnSucces = () => {
        this.props.history.push("/calendar");
    };

    render() {
        const { isFetching } = this.props;
        let buttonContent = "Login";
        let disabled = false;
        if (isFetching) {
            disabled = true;
            buttonContent = <Spinner animation="border" role="status" size="sm" />;
        }

        return (
            <Container fluid className="w-75 d-flex justify-content-center align-items-center">
                <Form style={{ marginTop: "15%" }} fluid>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>
                            {" "}
                            <b>Email address</b>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={this.onChange}
                            style={{ width: "30em" }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>
                            {" "}
                            <b>Password</b>
                        </Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChange} />
                    </Form.Group>
                    <br />
                    <br />
                    <Button
                        disabled={disabled}
                        style={{
                            backgroundColor: "rgb(38, 174, 96)",
                            width: "100%"
                        }}
                        type="submit"
                        onClick={this.onSubmit}
                    >
                        {buttonContent}
                    </Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.auth.isFetching,
    isError: state.auth.loginError,
    message: state.auth.message
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password, redirectOnSuccess) => dispatch(loginActionCreator(email, password, redirectOnSuccess))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
