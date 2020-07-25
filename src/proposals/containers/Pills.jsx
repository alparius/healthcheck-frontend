import React from "react";
import { connect } from "react-redux";
import ProposalsList from "./ProposalList";
import { loadProposals } from "../actions";
//import { getHospitalsActionCreator } from "../../admin/actions/adminActionCreator";

class Proposals extends React.Component {
    componentDidMount() {
        this.props.loadProposals();
        //let token = JSON.parse(localStorage.getItem("token"));
        //this.props.getHospitals(token.city);
    }

    render() {
        return <ProposalsList />;
    }
}

const mapStateToProps = (state) => ({
    proposals: state.proposalsReducer.proposals,
    hospitals: state.adminReducer.hospitals,
    isAdmin: state.user.isAdmin
});

const mapDispatchToProps = (dispatch) => ({
    loadProposals: () => dispatch(loadProposals())
    //getHospitals: city => dispatch(getHospitalsActionCreator(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
