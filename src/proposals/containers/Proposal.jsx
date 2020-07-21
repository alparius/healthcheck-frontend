import React from 'react'
import ProposalModal from '../components/ProposalModal'
import { Card, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash, FaThumbsUp, FaCheck, FaFileAlt, FaMapMarker, FaClock, FaUser, FaTags } from 'react-icons/fa'
import { connect } from 'react-redux'
import { deleteProposal, updateProposal, voteProposal, loadProposals, unlikeProposal, acceptProposal } from '../actions'
import { convertDateToString } from '../../shared/helpers'

class Proposal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
        this.updateProposal = this.updateProposal.bind(this)
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    deleteProposal() {
        this.props.deleteProposal(this.props.proposal.id)
    }

    updateProposal(proposal) {
        proposal.startDateAndTime = convertDateToString(proposal.startDateAndTime)
        proposal.endDateAndTime = convertDateToString(proposal.endDateAndTime)
        this.props.updateProposal(proposal)
        this.toggleModal()
    }

    likeProposal() {
        this.props.likeProposal(this.props.proposal.id)
        setTimeout(() => {
            this.props.loadProposals()
        }, 1000)
    }

    unlikeProposal() {
        this.props.unlikeProposal(this.props.proposal.id)
        setTimeout(() => {
            this.props.loadProposals()
        }, 1000)
    }

    acceptProposal() {
        this.props.acceptProposal(this.props.proposal.id)
        this.props.deleteProposal(this.props.proposal.id, false)
    }

    getLikeButton(liked) {
        if (liked) {
            return (
                <Card.Link href="#" onClick={() => this.unlikeProposal()}><FaThumbsUp style={{ color: "yellow" }} /> </Card.Link>
            )
        }
        return (
            <Card.Link href="#" onClick={() => this.likeProposal()}> <FaThumbsUp /> </Card.Link>
        )
    }

    render() {
        let { proposal, isAdmin, hospitals, userId, userName } = this.props
        let canEditOrDelete = isAdmin || userName === proposal.proposedBy

        let start = new Date(proposal.startDateAndTime)
        let end = new Date(proposal.endDateAndTime)

        let likesCnt = proposal.userIdsWhoVotedThisProposal.length
        let liked = proposal.userIdsWhoVotedThisProposal.filter(id => id === userId).length > 0
        let likeButton = this.getLikeButton(liked)
        let likes = likesCnt === 1 ? "1 like" : `${likesCnt} likes`

        return (
            <div className="proposal">
                <ProposalModal
                    hospitals={hospitals}
                    show={this.state.showModal}
                    proposal={proposal}
                    submit={this.updateProposal}
                    toggle={() => this.toggleModal()} />

                <Card>
                    <Card.Header className="proposal-card-header">
                        <Row>
                            <Col md={8} xs={8} lg={8}>
                                <Card.Title> {proposal.title} </Card.Title>
                            </Col>

                            <Col md={4} xs={4} lg={4} style={{textAlign: 'right'}}>
                                { canEditOrDelete && <Card.Link href="#" onClick={() => this.toggleModal() }> <FaEdit /> </Card.Link> }
                                { canEditOrDelete && <Card.Link href="#" onClick={() => this.deleteProposal()}> <FaTrash /> </Card.Link> }
                                { isAdmin && <Card.Link href="#" onClick={() => this.acceptProposal()}> <FaCheck /> </Card.Link> }
                                { likeButton }
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <div className="proposal-details">
                            <FaUser className="proposal-icon" />
                            <Card.Subtitle className="mb-2 text-muted">
                                {proposal.proposedBy}
                            </Card.Subtitle>

                            <FaThumbsUp className="proposal-icon"/>
                            <Card.Subtitle className="mb-2 text-muted"> {likes} </Card.Subtitle>

                            <FaTags className="proposal-icon" />
                            <Card.Subtitle className="mb-2 text-muted"> {proposal.category} </Card.Subtitle>

                            <FaFileAlt className="proposal-icon" />
                            <Card.Subtitle className="mb-2 text-muted">
                                {proposal.description}
                            </Card.Subtitle>
                            
                            <FaClock className="proposal-icon" />
                            <Card.Subtitle className="mb-2 text-muted">
                                {start.toDateString()} ({start.toLocaleTimeString()} - {end.toLocaleTimeString()})
                            </Card.Subtitle>

                            <FaMapMarker className="proposal-icon" />
                            <Card.Subtitle className="mb-2 text-muted">
                                {proposal.location}
                            </Card.Subtitle>
                        </div>
                    </Card.Body>                  
                </Card>
            </div>          
        )
    }
}

const mapStateToProps = state => ({
    userId: state.user.userId,
    userName: state.user.username,
    isAdmin: state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
    loadProposals: () => dispatch(loadProposals()),
    likeProposal: proposalId => dispatch(voteProposal(proposalId)),
    unlikeProposal: proposalId => dispatch(unlikeProposal(proposalId)),
    acceptProposal: proposalId => dispatch(acceptProposal(proposalId)),
    updateProposal: proposal => dispatch(updateProposal(proposal)),
    deleteProposal: (proposalId, showMessage) => dispatch(deleteProposal(proposalId, showMessage))
})

export default connect(mapStateToProps, mapDispatchToProps)(Proposal)
