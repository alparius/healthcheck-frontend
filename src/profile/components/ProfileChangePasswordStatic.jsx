import { Card, Form, Row, Col } from "react-bootstrap";
import React from "react";
import { FaRegSave } from "react-icons/fa";
import "../style/profile.css";

const ProfileChangePasswordStatic = ({ password, confirm, onChange, savePassword, invalidConfirm }) => {
    return (
        <Card style={{ marginTop: "1vh" }}>
            <Card.Header>
                <div style={{ float: "right" }}>
                    <FaRegSave className="icons" size="25" onClick={savePassword}></FaRegSave> Save
                </div>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formPassword">
                                <Form.Label>
                                    {" "}
                                    <b>New Password</b>
                                </Form.Label>
                                <Form.Control
                                    value={password}
                                    type="password"
                                    onChange={onChange}
                                    name="password"
                                    placeholder="New Password"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>
                                    {" "}
                                    <b>Confirm Password</b>
                                </Form.Label>
                                <Form.Control
                                    value={confirm}
                                    type="password"
                                    onChange={onChange}
                                    name="confirm"
                                    placeholder="Confirm Password"
                                    isInvalid={invalidConfirm}
                                    isValid={invalidConfirm === undefined ? undefined : !invalidConfirm}
                                ></Form.Control>
                                <Form.Control.Feedback>Passwords match.</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Passwords don't match.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};
export default ProfileChangePasswordStatic;
