import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
    render() {
        return (
            <div className="row">
              <div className="col-md-2">
                <img alt="leul" src="images/leul_curajos.png" id="leul-curajos"></img>
              </div>
              <div className="col-md-8">
                <div className="card">
                  <img alt="kids" src="images/kids.png" id="kids" className="card-img-top"></img>
                  <div className="card-body">
                    <h3 className="card-title"><b>Little People Association Romania</b></h3>
                    <p className="card-text">
                    The Little People Association was born by the initiative of its founders, Katie and Shajjad Rizvi in 1996 in Cluj-Napoca, from the desire to offer child and teenage cancer patients the support each one of them needs.
                    Today, the Association provides the field of pediatric oncology from Romania and the Republic of Moldova with a whole range of high-quality services, daily psychosocial support programs for patients,
                    complex events for the young cancer survivors, professionalism in volunteer coordination, material support for the hospital wards through playroom renovation projects, donations of medical equipment and acquisition of hard-to-find medicine,
                    as well as constant concern and involvement from a highly dedicated team.
                    </p>
                    <h4 className="card-title"><b>Our Mission</b></h4>
                    <p>
                    The mission of the organisation is to improve the quality of life for children and young people with cancer,
                    by offering psychosocial support both during the hospitalisation period and after,
                    thus increasing the survival rate of this particular age group.
                    All the efforts of the Little People Association revolve around the patient.
                    Every activity we plan, every camp we organise and every project we develop focuses first and foremost on the needs of the patient and his/her family!
                    </p>
                    <p>
                    The Little People Association is fully committed to not expose a patient or a minor who is sick or in pain to a negative light,
                    and not to use images of human suffering for the purpose of raising funds or for financial gain.
                    In the event that the patients want some of their photos published (when they meet celebrities, for instance) parental agreement is required in advance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <img alt="doneaza" src="images/doneaza.png" id="doneaza"></img>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispachToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispachToProps)(Home)
