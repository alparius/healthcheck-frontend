import React from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import ProposalModal from "../components/ProposalModal";
import { connect } from "react-redux";
import { createProposal } from "../actions";
import { convertDateToString } from "../../shared/helpers";
import "./style.css";

class ProposalsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            pills: [
                { name: "Aspirin", frequency: 2, stock: 8 },
                { name: "Algocamin", frequency: 1, stock: 20 },
                { name: "Ibuprofen", frequency: 4, stock: 7 },
                { name: "Parasinus", frequency: 3, stock: 2 },
                { name: "Paracetamol", frequency: 3, stock: 100 },
                { name: "Oxacimol", frequency: 4, stock: 16 },
                { name: "Dental Ace", frequency: 1, stock: 20 }
            ]
        };
        this.createProposal = this.createProposal.bind(this);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    createProposal(proposal) {
        proposal.startDateAndTime = convertDateToString(proposal.startDateAndTime);
        proposal.endDateAndTime = convertDateToString(proposal.endDateAndTime);
        this.props.createProposal(proposal);
        this.toggleModal();
    }

    render() {
        return (
            <Container fluid className="w-75 mt-4 " style={{ marginLeft: "12em" }}>
                <Button id="add-proposal" onClick={() => this.toggleModal()}>
                    Track a new pill <FaPlus />
                </Button>
                <br />
                <br />

                <ProposalModal show={this.state.showModal} submit={this.createProposal} toggle={() => this.toggleModal()} />

                {this.state.pills.map((pill) => (
                    <Alert variant={pill.frequency * 3 > pill.stock ? "danger" : pill.frequency * 7 > pill.stock ? "warning" : "success"}>
                        <Row>
                            <Col>
                                <b>{pill.name}</b>
                            </Col>
                            <Col>
                                taking <b>{pill.frequency}</b> daily
                            </Col>
                            <Col>
                                <b>{pill.stock}</b> in stock
                            </Col>
                            <Col>
                                {Math.floor(pill.stock / pill.frequency) === 0 ? (
                                    <>running out of it!</>
                                ) : Math.floor(pill.stock / pill.frequency) === 1 ? (
                                    <>
                                        enough for only <b>1</b> day
                                    </>
                                ) : (
                                    <>
                                        enough for <b>{Math.floor(pill.stock / pill.frequency)}</b> days
                                    </>
                                )}
                            </Col>

                            <Col style={{ marginLeft: "5em" }}>
                                <FaEdit className="icons" style={{ marginRight: "1em" }} />
                                <FaTrash className="icons" />
                            </Col>
                        </Row>
                    </Alert>
                ))}
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createProposal: (proposal) => dispatch(createProposal(proposal))
});

export default connect(null, mapDispatchToProps)(ProposalsList);
