import React from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import {FaTrashAlt} from 'react-icons/fa'
import '../style/admin.css'


const VolunteerCardStatic = ({
    volunteer,
    onDelete,
}) => {
    return (
        <Card className="volunteerCard">
            <Card.Body>
                <Card.Title style={{color:"#db3d44"}}>
                    {volunteer.firstName} {volunteer.surname}
                    <FaTrashAlt 
                    className="icons" 
                    style={{ float: "right" }} size="25"
                    onClick={()=>onDelete(volunteer.id)}/>
                </Card.Title>
                <Card.Text>
                    <Row>
                        <Col>
                            Email: {volunteer.email}
                        </Col>
                        <Col>
                            Phone: {volunteer.phone}
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default VolunteerCardStatic;