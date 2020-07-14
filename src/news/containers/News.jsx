import React from 'react'
import { connect } from 'react-redux'
import { FaChevronLeft, FaChevronRight} from 'react-icons/fa'


class News extends React.Component {
    constructor(props) {
        super(props)

        this.activities = []

        for (let i = 1; i < 13; i++) {
          this.activities.push({
            description: "description1",
            category: "category" + i,
            title: "Activity " + i,
            status: "done",
            startDateAndTime: "2020-01-05T14:00",
            endDateAndTime: "2020-01-05T16:00",
            hospital: 1,
            report: {
              description: "description" + i,
              category: "category" + i,
              title: "Report " + i,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
          })
        }

        this.state = {
          allActivities: this.activities,
          currentPage: 1,
          activitiesPerPage: 3,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }

    handleNext(event) {
      console.log("Page", this.state.currentPage)
      this.setState({
        currentPage: Number(this.state.currentPage + 1)
      });
    }

    handlePrev(event) {
      this.setState({
        currentPage: Number(this.state.currentPage - 1)
      });
    }

    activityComponent(activity) {
        return (
          <div className="card" id="modified-card">
            <div className="card-header" id="modified-card-header">
              {activity.report.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">Description: {activity.report.description}</h5>
              <h5 className="card-title">Volunteers: </h5>
              <h5 className="card-title">Date: {activity.startDateAndTime.substring(0, 10)}</h5>
              <h5 className="card-title">Accomplished objectives: </h5>
              <p className="card-text">{activity.report.text}</p>
              <h5 className="card-title">Filled by: </h5>
            </div>
          </div>
        )
    }

    pageNumberComponent(number, currentPage) {
      if (number === currentPage) {
        return (
          <li className="current-page page-number"
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      } else {
        if (number - 1 === currentPage || number + 1 === currentPage)
        return (
          <li className="page-number"
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      }
    }

    render() {
      const { allActivities, currentPage, activitiesPerPage } = this.state;
      const indexOfLastActivity = currentPage * activitiesPerPage;
      const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
      const currentActivities = allActivities.slice(indexOfFirstActivity, indexOfLastActivity);

      let reports = currentActivities.map(activity => this.activityComponent(activity))

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(allActivities.length / activitiesPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => this.pageNumberComponent(number, currentPage))

      console.log("Page nr ", pageNumbers.length)
      if (currentPage - 1 === 0) {
        return (
          <React.Fragment>
          <div>
            <em>Reports</em>
            <ul className="nobullet">
              {
                reports.map((report, i) => (
                  <li key={i} className="report">
                    {report}
                  </li>
                )
              )
              }
            </ul>
            <ul id="pagination">
              {renderPageNumbers}
            <li><FaChevronRight onClick={this.handleNext}/></li>
            </ul>
            </div>
          </React.Fragment>
        )
      } else if (currentPage === pageNumbers.length) {
        return (
          <React.Fragment>
          <div className="background-div">
            <em>Reports</em>
            <ul className="nobullet">
              {
                reports.map((report, i) => (
                  <li key={i} className="report">
                    {report}
                  </li>
                )
              )
              }
            </ul>
            <ul id="pagination">
            <li><FaChevronLeft onClick={this.handlePrev}/></li>
              {renderPageNumbers}
            </ul>
            </div>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
          <div className="background-div">
            <em>Reports</em>
            <ul className="nobullet">
              {
                reports.map((report, i) => (
                  <li key={i} className="report">
                    {report}
                  </li>
                )
              )
              }
            </ul>
            <ul id="pagination">
            <li><FaChevronLeft onClick={this.handlePrev}/></li>
              {renderPageNumbers}
            <li><FaChevronRight onClick={this.handleNext}/></li>
            </ul>
            </div>
          </React.Fragment>
        )
      }
    }
}

const mapStateToProps = state => ({

})

const mapDispachToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispachToProps)(News)
