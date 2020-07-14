import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa'


const AddVolunteerModal = ({
    save,
    hospitals,
    selectedOption,
    onChange,
    defaultValSelected,
    undo,
    invalidEmail,
    invalidHospital,
}) => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => { setShow(false); undo(); }
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" style={{
                backgroundColor: "rgb(219, 61, 68)",
                width: "100%"
            }}
                onClick={handleShow}
            >
                <FaUserPlus size={20}></FaUserPlus>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <label htmlFor="basic-url"><b>Email:</b></label>
                        <Form.Group controlId="formFirstName">
                            <Form.Control
                                onChange={onChange}
                                name="email"
                                type="email"
                                id="basic-url"
                                aria-describedby="basic-addon3" placeholder="volunteer@mail.com"
                                isInvalid={invalidEmail} isValid={invalidEmail === undefined ? undefined : !invalidEmail}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Required field!</Form.Control.Feedback>
                        </Form.Group>


                        <label htmlFor="basic-url"><b>Hospital:</b></label>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                onChange={selectedOption}
                                isInvalid={invalidHospital} isValid={invalidHospital === undefined ? undefined : !invalidHospital}

                            >   {
                                    defaultValSelected
                                        ?
                                        <option id={-1} value="">Please select a hospital...</option>
                                        :
                                        <option id={-1} disabled value="">Please select a hospital...</option>
                                }
                                {hospitals.map(
                                    hospital => <option id={hospital.id} value={hospital.name}>{hospital.name}</option>
                                )
                                }
                            </Form.Control>
                            <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Required field!</Form.Control.Feedback>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    {
                        invalidEmail === false && invalidHospital === false
                            ?
                            <Button variant="danger" style={{
                                backgroundColor: "rgb(219, 61, 68)",
                            }}
                                onClick={() => { handleClose(); save(); }}>
                                Save
                        </Button>
                            :
                            null
                    }

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddVolunteerModal;