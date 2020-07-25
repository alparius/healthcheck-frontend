import { Card, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import React from "react";
import { FaEdit, FaRegSave, FaTimes, FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../profile/style/profile.css";

class Tab1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            birthyear: "",
            gender: "",
            height: "",
            weight: "",
            notEditMode: true
        };
    }

    componentDidMount() {
        this.undo();
    }

    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        });
    };

    selectedOption = (event) => {
        var target = event.target;
        var index = target.selectedIndex;
        this.setState({
            gender: target[index].id
        });
    };

    getBMI() {
        return (Number(this.state.weight) / ((Number(this.state.height) * Number(this.state.height)) / 10000)).toFixed(2);
    }

    undo = () => {
        this.setState({
            birthyear: this.state.birthyear === null ? "" : this.state.birthyear,
            gender: this.state.gender === null ? "" : this.state.gender,
            height: this.state.height === null ? "" : this.state.height,
            weight: this.state.weight === null ? "" : this.state.weight,
            notEditMode: true
        });
    };

    toEditMode = (value) => {
        this.setState({
            notEditMode: value
        });
    };

    saveProfileInfo = () => {
        this.setState({
            notEditMode: true
        });
    };

    render() {
        return (
            <Container className="w-50">
                <Card style={{ marginTop: "5vh" }}>
                    <Card.Header>
                        <b>Basics</b>
                        {this.state.notEditMode ? (
                            <div style={{ float: "right" }}>
                                <FaEdit className="icons" size="25" onClick={() => this.toEditMode(false)} /> Edit
                            </div>
                        ) : (
                            <div style={{ float: "right" }}>
                                <FaTimes
                                    className="icons"
                                    size="25"
                                    onClick={() => {
                                        this.undo();
                                        this.toEditMode(true);
                                    }}
                                ></FaTimes>{" "}
                                Cancel
                                <FaRegSave className="icons" size="25" onClick={this.saveProfileInfo}></FaRegSave> Save
                            </div>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBirthyear">
                                        <Form.Label>Birthyear</Form.Label>
                                        <Form.Control
                                            value={this.state.birthyear}
                                            readOnly={this.state.notEditMode}
                                            onChange={this.onChange}
                                            name="birthyear"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" readOnly={this.state.notEditMode} onChange={this.selectedOption}>
                                            <option id="male" value="male">
                                                Male
                                            </option>
                                            <option id="female" value="female">
                                                Female
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formHeight">
                                        <Form.Label>Height (cm)</Form.Label>
                                        <Form.Control
                                            value={this.state.height}
                                            readOnly={this.state.notEditMode}
                                            onChange={this.onChange}
                                            name="height"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formWeight">
                                        <Form.Label>Weight (kg)</Form.Label>
                                        <Form.Control
                                            value={this.state.weight}
                                            readOnly={this.state.notEditMode}
                                            onChange={this.onChange}
                                            name="weight"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {!this.state.height || !this.state.weight ? (
                                <p>
                                    Please input your <b>height</b> and <b>weight</b> in order to calculate your Body Mass Index (BMI).
                                </p>
                            ) : (
                                <Form.Group controlId="formWeight">
                                    <Form.Label>Your Body Mass Index (BMI) is</Form.Label>
                                    <Form.Control readOnly value={this.getBMI()} name="bmi" />

                                    <Form.Label>
                                        This means that you are most probably{" "}
                                        {this.getBMI() < 18.5
                                            ? "underweight"
                                            : this.getBMI() < 24.9
                                            ? "in a normal condition"
                                            : this.getBMI() < 29.9
                                            ? "overweight"
                                            : "obese"}
                                        . <a href="https://en.wikipedia.org/wiki/Body_mass_index">Learn more about BMI.</a>
                                    </Form.Label>
                                </Form.Group>
                            )}
                        </Form>
                    </Card.Body>
                </Card>
                <Card style={{ marginTop: "5vh" }}>
                    <Card.Header>
                        <b>Your health history</b>
                        <div style={{ float: "right" }}>
                            <FaPlusCircle className="icons" size="25" /> Add new
                        </div>
                    </Card.Header>

                    <ListGroup as="ul">
                        <ListGroup.Item>
                            <NavLink to="/healthissue/1">Diabetes</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/healthissue/2">Spine pain</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/healthissue/3">Dental issues</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/healthissue/4">Myopia</NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <br />
                <br />
            </Container>
        );
    }
}
export default Tab1;
