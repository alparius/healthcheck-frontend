import { Form, Container, ListGroup, Button } from "react-bootstrap";
import React from "react";

import { NavLink } from "react-router-dom";
import "../profile/style/profile.css";

class HealthIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: "",
            files: []
        };
    }

    componentDidMount() {
        if (this.props.issue) {
            this.setState({
                title: this.props.issue.title,
                text: this.props.issue.text,
                files: this.props.issue.files
            });
        }
    }

    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <Container className="w-75 mt-4">
                <h1>{this.state.title}</h1>
                <br />

                <Form>
                    <Form.Group>
                        <Form.Label>
                            <h3>Description</h3>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={(this.state.text.match(/\n/g) || []).length < 6 ? 6 : (this.state.text.match(/\n/g) || []).length}
                            value={this.state.text}
                            name="text"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <h3>Files</h3>
                        </Form.Label>
                        <Form.Row>
                            <Form.Label style={{ marginRight: "2em" }}>
                                <h5>Add a new file</h5>
                            </Form.Label>
                            <Form.File />
                        </Form.Row>
                        <Button variant="outline-success">Upload!</Button>
                        <br />
                        <br />
                        <ListGroup>
                            {this.state.files.map((file) => {
                                return (
                                    <ListGroup.Item>
                                        <NavLink to="#">{file}</NavLink>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                        <br />
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}
export default HealthIssue;
