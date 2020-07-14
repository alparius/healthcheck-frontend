import React from 'react'
import { NavLink } from 'react-router-dom'

export default class WeekSideBar extends React.Component {
    render() {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => 
            <li className="week-day" key={index}> 
                <NavLink 
                    className="header-link" 
                    activeClassName="active-link" 
                    to={`/proposals/${day}`}> 
                    {day}
                </NavLink>
            </li>
        )
        return (
            <div className="week-days-menu">
                <ul className="week-days">
                    {days}
                </ul> 
            </div>
                       
        )
    }
}