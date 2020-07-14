import axiosInstance from "../../shared/axiosinstance"
import Swal from 'sweetalert2'

export const LOAD_PROPOSALS = 'LOAD_PROPOSALS'
export const LOAD_PROPOSALS_SUCCESS = 'LOAD_PROPOSALS_SUCCESS'
export const LOAD_PROPOSALS_FAILURE = 'LOAD_PROPOSALS_FAILURE'

export const CREATE_PROPOSAL = 'CREATE_PROPOSAL'
export const CREATE_PROPOSAL_SUCCESS = 'CREATE_PROPOSAL_SUCCESS'
export const CREATE_PROPOSAL_FAILURE = 'CREATE_PROPOSAL_FAILURE'

export const DELETE_PROPOSAL = 'DELETE_PROPOSAL'
export const DELETE_PROPOSAL_SUCCESS = 'DELETE_PROPOSAL_SUCCESS'
export const DELETE_PROPOSAL_FAILURE = 'DELETE_PROPOSAL_FAILURE'

export const UPDATE_PROPOSAL = 'UPDATE_PROPOSAL'
export const UPDATE_PROPOSAL_SUCCESS = 'UPDATE_PROPOSAL_SUCCESS'
export const UPDATE_PROPOSAL_FAILURE = 'UPDATE_PROPOSAL_FAILURE'

export const VOTE_PROPOSAL = 'VOTE_PROPOSAL'
export const VOTE_PROPOSAL_SUCCESS = 'VOTE_PROPOSAL_SUCCESS'
export const VOTE_PROPOSAL_FAILURE = 'VOTE_PROPOSAL_FAILURE'

export const UNLIKE_PROPOSAL = 'UNLIKE_PROPOSAL'
export const UNLIKE_PROPOSAL_SUCCESS = 'UNLIKE_PROPOSAL_SUCCESS'
export const UNLIKE_PROPOSAL_FAILURE = 'UNLIKE_PROPOSAL_FAILURE'

export const ACCEPT_PROPOSAL = 'ACCEPT_PROPOSAL'
export const ACCEPT_PROPOSAL_SUCCESS = 'ACCEPT_PROPOSAL_SUCCESS'
export const ACCEPT_PROPOSAL_FAILURE = 'ACCEPT_PROPOSAL_FAILURE'

const loadProposalsSuccess = proposals => {
    return {
        type: LOAD_PROPOSALS_SUCCESS,
        proposals
    }
}

const loadProposalsFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not fetch proposals from the server!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: LOAD_PROPOSALS_FAILURE
    }
}

const loadProposalsRequest = () => {
    return {
        type: LOAD_PROPOSALS
    }
}

export const loadProposals = dispatch => {
    return dispatch => {
        dispatch(loadProposalsRequest())
        return axiosInstance.get(`http://localhost:8080/api/proposal/getProposalOptionalWithStatus?currentWeek=true`)
            .then(res => dispatch(loadProposalsSuccess(res.data)))
            .catch(() => dispatch(loadProposalsFailure()))
    }
}

const deleteProposalSuccess = (proposalId, showMessage=true) => {
    if (showMessage) {
        Swal.fire({
            icon: 'success',
            title: 'Successfully deleted proposal!',
            timer: 1500,
            showConfirmButton: false
        })
    }   
    return {
        type: DELETE_PROPOSAL_SUCCESS,
        proposalId
    }
}

const deleteProposalFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not delete proposal!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: DELETE_PROPOSAL_FAILURE
    }
}

export const deleteProposal = (proposalId, showMessage, dispatch) => {
    return dispatch => {
        return axiosInstance.post(`http://localhost:8080/api/proposal/delete?proposalId=${proposalId}`)
            .then(() => dispatch(deleteProposalSuccess(proposalId, showMessage)))
            .catch(() => dispatch(deleteProposalFailure()))
    }
}

const createProposalSuccess = proposal => {
    Swal.fire({
        icon: 'success',
        title: 'Successfully created proposal!',
        timer: 1500,
        showConfirmButton: false
    })
    return {
        type: CREATE_PROPOSAL_SUCCESS,
        proposal
    }
}

const createProposalFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not create proposal!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: CREATE_PROPOSAL_FAILURE
    }
}

export const createProposal = (proposal, dispatch) => {
    return dispatch => {
        delete proposal.id
        return axiosInstance.post('http://localhost:8080/api/proposal/add', proposal)
            .then(res => dispatch(createProposalSuccess(res.data)))
            .catch(() => dispatch(createProposalFailure()))
    }
}

const updateProposalSuccess = proposal => {
    Swal.fire({
        icon: 'success',
        title: 'Successfully updated proposal!',
        timer: 1500,
        showConfirmButton: false
    })
    return {
        type: UPDATE_PROPOSAL_SUCCESS,
        proposal
    }
}

const updateProposalFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not update the proposal!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: UPDATE_PROPOSAL_FAILURE
    }
}

export const updateProposal = (proposal, dispatch) => {
    return dispatch => {
        return axiosInstance.post('http://localhost:8080/api/proposal/update', proposal)
            .then(res => dispatch(updateProposalSuccess(res.data)))
            .catch(() => dispatch(updateProposalFailure()))
    }
}


const voteProposalSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: 'Successfully voted proposal!',
        timer: 1500,
        showConfirmButton: false
    })
    return {
        type: VOTE_PROPOSAL_SUCCESS,
    }
}


const voteProposalFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not vote the proposal!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: VOTE_PROPOSAL_FAILURE
    }
}

export const voteProposal = (proposalId, dispatch) => {
    return dispatch => {
        return axiosInstance.post(`http://localhost:8080/api/vote/addVote?proposalId=${proposalId}`)
            .then(() => dispatch(voteProposalSuccess()))
            .catch(() => dispatch(voteProposalFailure()))
    }
}


const unlikeProposalSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: 'Successfully unliked proposal!',
        timer: 1500,
        showConfirmButton: false
    })
    return {
        type: UNLIKE_PROPOSAL_SUCCESS,
    }
}


const unlikeProposalFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not unlike the proposal!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: UNLIKE_PROPOSAL_FAILURE
    }
}

export const unlikeProposal = (proposalId, dispatch) => {
    return dispatch => {
        return axiosInstance.post(`http://localhost:8080/api/vote/removeVote?proposalId=${proposalId}`)
            .then(() => dispatch(unlikeProposalSuccess()))
            .catch(() => dispatch(unlikeProposalFailure()))
    }
}


const acceptProposalSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: 'Successfully accepted proposal!',
        timer: 1500,
        showConfirmButton: false
    })
    return {
        type: UNLIKE_PROPOSAL_SUCCESS,
    }
}


const acceptProposalFailure = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Could not accept the proposal!',
        confirmButtonColor: '#db3d44',
        confirmButtonText: 'OK'
    })
    return {
        type: UNLIKE_PROPOSAL_FAILURE
    }
}

export const acceptProposal = (proposalId, dispatch) => {
    return dispatch => {
        return axiosInstance.post(`http://localhost:8080/api/proposal/leader/acceptProposal?proposalId=${proposalId}`)
            .then(() => dispatch(acceptProposalSuccess()))
            .catch(() => dispatch(acceptProposalFailure()))
    }
}