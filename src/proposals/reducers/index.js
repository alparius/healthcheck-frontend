import { LOAD_PROPOSALS, LOAD_PROPOSALS_FAILURE, LOAD_PROPOSALS_SUCCESS,
         CREATE_PROPOSAL, CREATE_PROPOSAL_FAILURE, CREATE_PROPOSAL_SUCCESS,
         DELETE_PROPOSAL, DELETE_PROPOSAL_FAILURE, DELETE_PROPOSAL_SUCCESS,
         UPDATE_PROPOSAL, UPDATE_PROPOSAL_FAILURE, UPDATE_PROPOSAL_SUCCESS, 
         VOTE_PROPOSAL_FAILURE, VOTE_PROPOSAL_SUCCESS, UNLIKE_PROPOSAL_SUCCESS, 
         UNLIKE_PROPOSAL_FAILURE, ACCEPT_PROPOSAL_SUCCESS, ACCEPT_PROPOSAL_FAILURE } from "../actions"

const initialState = {
    isFetching: false,
    proposals: []
}

const proposalsReducer = (state = initialState, action) => {
    let index, proposals
    switch (action.type) {
        case LOAD_PROPOSALS || CREATE_PROPOSAL || DELETE_PROPOSAL || UPDATE_PROPOSAL:
            return {
                ...state,
                isFetching: true
            }
        case LOAD_PROPOSALS_SUCCESS:
            return {
                isFetching: false,
                proposals: action.proposals
            }
        case DELETE_PROPOSAL_SUCCESS:
            index = state.proposals.findIndex(proposal => proposal.id === action.proposalId)
            proposals = [...state.proposals]
            proposals.splice(index, 1)
            return {
                isFetching: false,
                proposals
            }
        case CREATE_PROPOSAL_SUCCESS:
            return {
                isFetching: false,
                proposals: [
                    ...state.proposals,
                    action.proposal
                ]
            }
        case UPDATE_PROPOSAL_SUCCESS:
            index = state.proposals.findIndex(proposal => proposal.id === action.proposal.id)
            proposals = [...state.proposals]
            proposals[index] = action.proposal
            return {
                proposals
            }

        case LOAD_PROPOSALS_FAILURE || DELETE_PROPOSAL_FAILURE || CREATE_PROPOSAL_FAILURE || UPDATE_PROPOSAL_FAILURE || VOTE_PROPOSAL_FAILURE || VOTE_PROPOSAL_SUCCESS || UNLIKE_PROPOSAL_SUCCESS || UNLIKE_PROPOSAL_FAILURE || ACCEPT_PROPOSAL_SUCCESS || ACCEPT_PROPOSAL_FAILURE:
            return {
                isFetching: false,
                ...state
            }
        default:
            return state
    }

}

export default proposalsReducer