import React from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// const getStatus = (status) => {
//     switch (status) {
//         case "ACCEPTED":
//             return "Accepted";
//         case "IN_PROGRESS":
//             return "In Progress";
//         case "DONE":
//             return "Done";
//         case "REJECTED":
//             return "Rejected";
//         case "PENDING":
//             return "Pending";
//         default:
//             break;
//     }
// };

const activityTypes = ["Medic appointment", "Buy new pills", "Call doc for results", "Other"];

export default class ActivityForm extends React.Component {
    render() {
        let props = this.props.properties;
        if (props === undefined) {
            return <div></div>;
        }

        return (
            <table className="custom-event-editor" style={{ width: "100%", cellpadding: "5" }}>
                <tbody>
                    <tr>
                        <td className="e-textlabel">
                            {" "}
                            <b>Title</b>
                        </td>
                        <td colSpan={4}>
                            <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: "100%" }} />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">
                            {" "}
                            <b>Category</b>
                        </td>
                        <td colSpan={4}>
                            <DropDownListComponent
                                id="Category"
                                placeholder="Choose a category"
                                data-name="Category"
                                className="e-field"
                                style={{ width: "100%" }}
                                value={props.category || "Other"}
                                dataSource={activityTypes}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">
                            <b>Start Time</b>
                        </td>
                        <td colSpan={4}>
                            <DateTimePickerComponent
                                format="dd/MM/yy hh:mm a"
                                id="StartTime"
                                data-name="StartTime"
                                value={new Date(props.startTime || props.StartTime)}
                                className="e-field"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">
                            <b>End Time</b>
                        </td>
                        <td colSpan={4}>
                            <DateTimePickerComponent
                                format="dd/MM/yy hh:mm a"
                                id="EndTime"
                                data-name="EndTime"
                                value={new Date(props.endTime || props.EndTime)}
                                className="e-field"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="e-textlabel">
                            <b>Description</b>
                        </td>
                        <td colSpan={4}>
                            <textarea
                                id="Description"
                                className="e-field e-input"
                                name="Description"
                                rows={3}
                                cols={50}
                                style={{ width: "100%", height: "60px !important", resize: "vertical" }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
