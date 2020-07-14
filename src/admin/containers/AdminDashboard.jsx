import React from 'react'
import { connect } from 'react-redux'
import VolunteerListStatic from "../components/VolunteerListStatic"
import { Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import AddVolunteerModal from "../components/AddVolunteerModal"
import { getVolunteersActionCreator, getHospitalsActionCreator, addActionCreator, deleteActionCreator } from '../actions/adminActionCreator'
import Swal from 'sweetalert2'


class AdminDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedHospitalId: -1,
            email: "",
            filter: "",
            invalidEmail: undefined,
            invalidHospital: undefined,
            volunteers: [],
            hospitals: [],
            searchMode: false,
        }
    }
    componentDidMount() {
        this.props.getHospitals(this.props.userReducer.city);
        this.props.getVolunteers(this.props.userReducer.city);
        this.setState({
            selectedHospitalId: -1,
            filter: "",
            invalidEmail: undefined,
            invalidHospital: undefined,
            volunteers: this.props.adminReducer.volunteers,
            hospitals: this.props.adminReducer.hospitals,
        })

    }

    componentWillUpdate(prevProps) {
        const { adminReducer: prevAdminReducer } = prevProps;
        const { adminReducer: nextAdminReducer } = this.props;
        if (prevAdminReducer.volunteers !== nextAdminReducer.volunteers) {
            this.setState({
                volunteers: [...nextAdminReducer.volunteers]
            })
        }
    }

    save = () => {
        this.props.addVolunteer(this.state.email, this.state.selectedHospitalId, this.props.userReducer.city);
        this.setState({
            searchMode: false,
        })
    }
    delete = (id) => {
        var deleteConfirm = this.deleteConfirmed;
        Swal.fire({
            title: "Are you sure?",
            text: "The volunteer will be deleted permanently.",
            icon: "warning",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonColor: '#db3d44',
            position: 'center'
        }).then((isConfirm) => {
            if (isConfirm.value === true) {
                deleteConfirm(id)
            }
            else {
            }
        });
    }
    deleteConfirmed = (id) => {
        this.setState({
            filter: "",
            searchMode: false,
        })
        document.getElementById("search").value = "";
        this.props.deleteVolunteer(id, this.props.userReducer.city);
        Swal.fire({
            icon: 'success',
            title: 'Volunteer deleted!',
            confirmButtonColor: '#db3d44',
            confirmButtonText: 'Got it!'
        })
    }

    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        },
            () => {
                this.validate();
            }
        )
    }
    onChangeFilter = (event) => {
        const { value } = event.target;
        if (value !== "") {
            this.setState({
                filter: value,
                searchMode: true,
            },
                () => {
                    this.searchVolunteer();
                }
            )
        }
        else {
            this.setState({
                filter: value,
                searchMode: false,
                volunteers: [],
            })
        }
    }
    searchVolunteer = () => {
        var toFilter = this.uniformVolunteers(this.props.adminReducer.volunteers);
        var filtered = toFilter.filter(v => v.firstName.toLowerCase().startsWith(this.state.filter.toLowerCase()));
        this.setState({
            volunteers: [...filtered]
        })
    }

    uniformVolunteers = (arr) => {
        var newArr = [...arr];
        newArr.forEach(v => {
            if (v.firstName === null) {
                v.firstName = "unknown";
            }
            if (v.phone === null) {
                v.phone = "unknown";
            }
            if (v.surname === null) {
                v.surname = "unknown";
            }
        })
        return newArr;
    }

    validate = () => {
        var isEmail = this.validateEmail(this.state.email);
        this.setState({
            invalidHospital: this.state.selectedHospitalId === -1,
            invalidEmail: this.state.email.length === 0 || isEmail === false,
        })
    }
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    selectedOption = (event) => {
        var target = event.target;
        var index = target.selectedIndex;
        this.setState({
            selectedHospitalId: parseInt(target[index].id),
        },
            () => {
                this.validate();
            }
        )
    }
    undo = () => {
        this.setState({
            selectedHospitalId: -1,
            email: "",
            invalidEmail: undefined,
            invalidHospital: undefined,
        }
        )
    }
    render() {
        return (
            <Container fluid style={{ backgroundColor: "#f8f9fa", height: "93vh" }}>
                <Row>
                    <Col xs={2}>
                    </Col>
                    <Col>
                        <Row style={{
                            marginTop: "1vh",
                        }}>
                            <Col xs={1} xl={2}>
                                <AddVolunteerModal
                                    save={this.save}
                                    hospitals={this.props.adminReducer.hospitals}
                                    onChange={this.onChange}
                                    selectedOption={this.selectedOption}
                                    defaultValSelected={this.state.selectedHospitalId === -1}
                                    undo={this.undo}
                                    invalidEmail={this.state.invalidEmail}
                                    invalidHospital={this.state.invalidHospital}
                                />
                            </Col>

                            <Col xs={11} xl={10}>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Search after first name ..."
                                        aria-describedby="basic-addon2"
                                        name="filter"
                                        onChange={this.onChangeFilter}
                                        id="search"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text
                                            style={{
                                                backgroundColor: "rgb(219, 61, 68)",
                                                color: "white",
                                            }}>
                                            <FaSearch />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                                <VolunteerListStatic
                                    volunteers={this.state.searchMode === false ? this.props.adminReducer.volunteers : this.state.volunteers}
                                    onDelete={this.delete}
                                    uniform={this.uniformVolunteers}
                                />   
                    </Col>
                    <Col xs={2}>
                    </Col>
                </Row>
            </Container>

        )
    }
}

const mapStateToProps = state => {
    return {
        adminReducer: state.adminReducer,
        userReducer: state.user,
    }
}

const mapDispachToProps = dispatch => {
    return {
        getVolunteers: (city) => dispatch(getVolunteersActionCreator(city)),
        getHospitals: (city) => dispatch(getHospitalsActionCreator(city)),
        addVolunteer: (email, hospitalId, city) => dispatch(addActionCreator(email, hospitalId, city)),
        deleteVolunteer: (volunteerId, city) => dispatch(deleteActionCreator(volunteerId, city)),
    }
}

export default connect(mapStateToProps, mapDispachToProps)(AdminDashboard)