import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
    render() {
        return (
            <div className="row">
              {/* <div className="col-md-2">
                <img alt="pic1" src="images/health.jpg" id="leul-curajos"></img>
              </div> */}
              <div className="col-md-8">
                <div className="card">
                  <img alt="pic2" src="images/health.jpg" id="kids" className="card-img-top"></img>
                  <div className="card-body">
                    <h3 className="card-title"><b>Lorem ipsum dolor sit amet</b></h3>
                    <p className="card-text">
                    Lorem ipsum dolor sit amet...
                    </p>
                    <h4 className="card-title"><b>Our Mission</b></h4>
                    <p>
                    Lorem ipsum dolor sit amet...
                    </p>
                    <p>
                    Lorem ipsum dolor sit amet...
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-2">
                <img alt="pic3" src="images/health.jpg" id="doneaza"></img>
              </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispachToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispachToProps)(Home)
