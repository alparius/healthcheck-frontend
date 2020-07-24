import React from "react";
import { connect } from "react-redux";
import WeekSideBar from "../components/WeekSideBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
        return (
            <BrowserRouter>
                <div className="proposals-wrapper">
                    <WeekSideBar />

                    <Switch>
                        <Route
                            exact
                            path="/proposals/:day"
                            render={(props) => (
                                <ProposalsList
                                    day={props.match.params.day}
                                    proposals={this.props.proposals}
                                    hospitals={this.props.hospitals}
                                    isAdmin={this.props.isAdmin}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
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
