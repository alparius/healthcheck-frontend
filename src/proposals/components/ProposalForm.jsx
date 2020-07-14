import React from 'react'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { Button } from 'react-bootstrap'

export default class ProposalForm extends React.Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {
            proposal: {
                title: '',
                category: '',
                description: '',
                location: '',
                startDateAndTime: '',
                endDateAndTime: ''
            },
            isValid: true,
            message: ''
        }
    }

    componentDidMount() {
        if (this.props.proposal) {
            this.setState({
                proposal: this.props.proposal
            })
        }
        
    }

    onChange = (event) => {
        const { value, name } = event.target
        const proposal = this.state.proposal
        
        this.setState({
            proposal: {
                ...proposal,
                [name]: value
            }
        })
    }

    onChangeCategory(value) {
        let proposal = this.state.proposal
        this.setState({
            proposal: {
                ...proposal,
                category: value
            }
        })
    }

    onChangeHospital(value) {
        let proposal = this.state.proposal
        this.setState({
            proposal: {
                ...proposal,
                location: value
            }
        })
    }

    valid() {
        for(let key in this.state.proposal) {
            if (this.state.proposal[key] === '') {
                return false
            }
        }
        return true
    }

    submit() {
        let isValid = this.valid()
        if (isValid) {
            let hospitalName = this.state.proposal.location
            let hospitalId = this.props.hospitals.filter(h => h.name + " " + h.city === hospitalName)[0].id
            let proposal = {
                ...this.state.proposal,
                hospitalId
            }
            delete proposal.location
            this.props.submit(proposal)
        } else {
            this.setState({
                isValid: false,
                message: 'Please fill in all the fields!'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        isValid: true,
                        message: ''
                    })
                }, 3000)
            })
        }
    }

    render() {
        let { proposal } = this.state
        let hospitals = this.props.hospitals.map(hospital => hospital.name + " " + hospital.city)

        return (
            <React.Fragment>
                <div className="message">
                    <p style={{color: "red", textAlign:"center"}}> {this.state.message} </p>
                </div>
                <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}>
                    <tbody>
                        <tr>
                            <td className="e-textlabel"> <b>Title</b></td><td colSpan={4}>
                                <input 
                                    id="title"
                                    className="e-field e-input" 
                                    type="text" 
                                    name="title"
                                    placeholder="New proposal" 
                                    style={{ width: '100%' }}
                                    value={proposal.title}
                                    onChange={this.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td className="e-textlabel"> <b>Category</b></td><td colSpan={4}>
                                <DropDownListComponent 
                                    id="category" 
                                    placeholder='Choose a category' 
                                    data-name="category"
                                    name="category"
                                    className="e-field" 
                                    style={{ width: '100%' }}
                                    value={proposal.category}
                                    change={(arg) => this.onChangeCategory(arg.value)}
                                    dataSource={['Spitalizare', 'Imagine corporala si constiinta de sine', 'Joc cu tematica medicala', 'Managementul durerii', 'Stil de viata sanatos']} /></td>
                        </tr>

                        <tr>
                            <td className="e-textlabel"><b>Hospital</b></td><td colSpan={4}>
                                <DropDownListComponent 
                                    id="location" 
                                    placeholder='Choose a hospital' 
                                    data-name="location"
                                    name="location"
                                    className="e-field" 
                                    style={{ width: '100%' }}
                                    value={proposal.location}
                                    change={(arg) => this.onChangeHospital(arg.value)}
                                    dataSource={hospitals} />
                            </td>
                        </tr>
                        <tr>
                            <td className="e-textlabel"><b>Start Time</b></td><td colSpan={4}>
                                <DateTimePickerComponent 
                                    format='dd/MM/yy hh:mm a' 
                                    id="StartTime" 
                                    data-name="StartTime"
                                    name="startDateAndTime"
                                    placeholder="When will it start?"
                                    value={new Date(proposal.startDateAndTime)}
                                    onChange={this.onChange}
                                    className="e-field" />
                            </td>
                        </tr>
                        <tr>
                            <td className="e-textlabel"><b>End Time</b></td><td colSpan={4}>
                                <DateTimePickerComponent
                                    format='dd/MM/yy hh:mm a' 
                                    id="EndTime" 
                                    data-name="EndTime"
                                    name="endDateAndTime"
                                    placeholder="When will it end?"
                                    value={new Date(proposal.endDateAndTime)}
                                    onChange={this.onChange}
                                    className="e-field" />
                            </td>
                        </tr>


                        <tr>
                            <td className="e-textlabel"><b>Description</b></td><td colSpan={4}>
                                <textarea 
                                    id="Description" 
                                    className="e-field e-input" 
                                    name="description"
                                    value={proposal.description}
                                    onChange={this.onChange}
                                    rows={3} cols={50}
                                    placeholder="Describe what will happen"
                                    style={{ width: '100%', height: '60px !important', resize: 'vertical' }} />
                            </td>
                        </tr>
                    </tbody>
                    
                </table>

                <div className="proposal-submit">
                    <Button
                        variant="danger"
                        onClick={this.submit}>
                        Submit
                    </Button>
                </div>

            </React.Fragment>
        )
    }
}