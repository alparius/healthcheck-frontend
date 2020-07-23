import { Card, Form, Row, Col } from "react-bootstrap";
import React from "react";
import { FaEdit, FaRegSave, FaTimes } from "react-icons/fa";
import "../style/profile.css";
const ProfileCardStatic = ({
    username,
    firstName,
    surName,
    email,
    notEditMode,
    onChange,
    toEditMode,
    saveProfileInfo,
    invalidFirstName,
    invalidSurName,
    invalidPhone,
    invalidUsername,
    undo
}) => {
    return (
        <Card style={{ marginTop: "1vh" }}>
            <Card.Header>
                {notEditMode ? (
                    <div style={{ float: "right" }}>
                        <FaEdit className="icons" size="25" onClick={() => toEditMode(false)} /> Edit
                    </div>
                ) : (
                    <div style={{ float: "right" }}>
                        <FaTimes
                            className="icons"
                            size="25"
                            onClick={() => {
                                undo();
                                toEditMode(true);
                            }}
                        ></FaTimes>{" "}
                        Cancel
                        {invalidFirstName === false && invalidSurName === false && invalidUsername === false && (
                            <>
                                <FaRegSave className="icons" size="25" onClick={saveProfileInfo}></FaRegSave> Save
                            </>
                        )}
                    </div>
                )}
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>
                                    {" "}
                                    <b>First Name</b>
                                </Form.Label>
                                <Form.Control
                                    value={firstName}
                                    readOnly={notEditMode}
                                    onChange={onChange}
                                    name="firstName"
                                    placeholder="First name"
                                    isInvalid={invalidFirstName}
                                    isValid={invalidFirstName === undefined ? undefined : !invalidFirstName}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Required field!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formLastName">
                                <Form.Label>
                                    {" "}
                                    <b>Last Name</b>
                                </Form.Label>
                                <Form.Control
                                    value={surName}
                                    readOnly={notEditMode}
                                    onChange={onChange}
                                    name="surName"
                                    placeholder="Last name"
                                    isInvalid={invalidSurName}
                                    isValid={invalidSurName === undefined ? undefined : !invalidSurName}
                                ></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Required field!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formUsername">
                                <Form.Label>
                                    {" "}
                                    <b>Username</b>
                                </Form.Label>
                                <Form.Control
                                    value={username}
                                    readOnly={notEditMode}
                                    onChange={onChange}
                                    name="username"
                                    placeholder="Username"
                                    isInvalid={invalidUsername}
                                    isValid={invalidUsername === undefined ? undefined : !invalidUsername}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Required field!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>
                                    {" "}
                                    <b>Email</b>
                                </Form.Label>
                                <Form.Control value={email} readOnly={true} placeholder="Email"></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};
export default ProfileCardStatic;
