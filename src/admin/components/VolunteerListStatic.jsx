import React from 'react'
import VolunteerCardStatic from './VolunteerCardStatic'

const VolunteerListStatic = ({
    volunteers,
    onDelete,
    uniform,
}) => {
    if (volunteers.length === 0)
        return (
            <div style={{ marginLeft: "20vw" }}>
                <div class=" msg search-message-empty-container">
                    <span class="msg search-message-empty-decal">
                        <span class="msg search-message-empty-decal-eyes">:</span>
                        <span>(</span>
                    </span>
                    <h2 class="msg search-message-empty-message">
                        No volunteers found.
                    </h2>
                </div>
            </div>
        )
    else
        return (
            uniform(volunteers).map(volunteer =>
                <VolunteerCardStatic key={volunteer.email} volunteer={volunteer} onDelete={onDelete} />
            )
        )
}
export default VolunteerListStatic;