import React from 'react'
import { Modal } from 'react-bootstrap'
import ProposalForm from './ProposalForm'

export default class ProposalModal extends React.Component {

    render() {
        let { show, proposal, hospitals, toggle } = this.props
        let title = 'New Proposal'
        if (proposal) {
            title = proposal.title || 'New Proposal'
        }

        return (
            <Modal 
                show={show}
                onHide={() => toggle()}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProposalForm 
                        submit={this.props.submit}
                        proposal={proposal}
                        hospitals={hospitals}/>
                </Modal.Body>
            </Modal>

        )
    }
}