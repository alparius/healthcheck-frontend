import React from 'react'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export default class ActivityForm extends React.Component {

    getStatus(status) {
        switch (status) {
            case 'ACCEPTED':
                return 'Accepted'
            case 'IN_PROGRESS':
                return 'In Progress'
            case 'DONE':
                return 'Done'
            case 'REJECTED':
                return 'Rejected'
            case 'PENDING':
                return 'Pending'
            default:
                break
        }
    }

    render() {
        let props = this.props.properties
        if (props === undefined) {
            return (
                <div></div>
            )
        }
        let hospitals = this.props.hospitals.map(hospital => hospital.name)
        return (
            <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}>
            <tbody>
                <tr>
                    <td className="e-textlabel"> <b>Title</b></td><td colSpan={4}>
                        <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel"> <b>Category</b></td><td colSpan={4}>
                        <DropDownListComponent id="Category" placeholder='Choose a category' data-name="Category"
                            className="e-field" style={{ width: '100%' }}
                            value={props.category || 'Spitalizare'}
                            dataSource={['Spitalizare', 'Imagine corporala si constiinta de sine', 'Joc cu tematica medicala', 'Managementul durerii', 'Stil de viata sanatos']} /></td>
                </tr>
                
                <tr>
                    <td className="e-textlabel"><b>Hospital</b></td><td colSpan={4}>
                        <DropDownListComponent id="Location" placeholder='Choose status' data-name="Location"
                            className="e-field" style={{ width: '100%' }}
                            dataSource={hospitals} />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel"><b>Start Time</b></td><td colSpan={4}>
                        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" 
                            value={new Date(props.startTime || props.StartTime)} className="e-field" />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel"><b>End Time</b></td><td colSpan={4}>
                        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" 
                            value={new Date(props.endTime || props.EndTime)} className="e-field" />
                    </td>
                </tr>
                

                <tr>
                    <td className="e-textlabel"><b>Description</b></td><td colSpan={4}>
                        <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} 
                            style={{ width: '100%', height: '60px !important', resize: 'vertical' }} />
                    </td>
                </tr>
            </tbody>
            </table>
        )
    }
}