import React from 'react'
import Proposal from './Proposal'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import ProposalModal from '../components/ProposalModal'
import { connect } from 'react-redux'
import { createProposal } from '../actions'
import { convertDateToString } from '../../shared/helpers'

class ProposalsList extends React.Component {
    constructor(props) {
        super(props)
        this.days = {
            'Sunday': 0,
            'Monday': 1,
            'Tuesday': 2,
            'Wednesday': 3,
            'Thursday': 4,
            'Friday': 5,
            'Saturday': 6
        }
        this.state = {
            showModal: false
        }
        this.createProposal = this.createProposal.bind(this)
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }


    filterProposals() {
        let { day, proposals } = this.props
        proposals = proposals.filter(proposal => {
            let proposalDate = new Date(proposal.startDateAndTime)
            return this.days[day] === proposalDate.getDay()
        })
        return proposals.sort((x, y) => y.userIdsWhoVotedThisProposal.length - x.userIdsWhoVotedThisProposal.length)
    }

    createProposal(proposal) {
        proposal.startDateAndTime = convertDateToString(proposal.startDateAndTime)
        proposal.endDateAndTime = convertDateToString(proposal.endDateAndTime)
        this.props.createProposal(proposal)
        this.toggleModal()
    }

    render() {
        let proposals = this.filterProposals()
        let { hospitals } = this.props
        let date = this.props.day
        return (
            <Container fluid>
                <Card style={{marginTop: "10px"}}>
                    <Card.Header id="proposal-list-header"> 
                        <Row>
                            <Col md={10} lg={10} xs={10}> <h2> Proposals for {date} </h2>  </Col>
                            <Col style={{float: "right"}}>
                                <Button 
                                id="add-proposal"
                                onClick={() => this.toggleModal()}>
                                    Propose an activity <FaPlus /> 
                                </Button>
                            </Col>
                        </Row>
                        
                    </Card.Header>
                    <Card.Body>

                        <ProposalModal
                            show={this.state.showModal}
                            submit={this.createProposal}
                            hospitals={hospitals}
                            toggle={() => this.toggleModal()} />

                        <ul className="proposals-list">
                            {proposals.map(proposal =>
                                <Proposal
                                    key={proposal.id}
                                    proposal={proposal}
                                    hospitals={hospitals} />
                            )}
                        </ul>
                    </Card.Body>
                </Card>
                
                
            </Container>
        )
        
    }
}

const mapDispatchToProps = dispatch => ({
    createProposal: proposal => dispatch(createProposal(proposal))
})


export default connect(null, mapDispatchToProps)(ProposalsList)