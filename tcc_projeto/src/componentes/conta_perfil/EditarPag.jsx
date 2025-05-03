import {Form, FloatingLabel, Row, Col, Button} from 'react-bootstrap';

const EditarPag = () => {
  return (
    <>
        <Form className='border rounded-3 shadow mb-3'>
            <Row className='m-2 mt-3'>
                <Col sm={5}>
                    <h3>Editar pagamento</h3>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col>
                    <p className='mx-2 '>
                        Edite a data em que cobraremos sua mensalidade.
                        Você pode mudar a data de pagamento uma vez por ano.
                    </p>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col>
                    <FloatingLabel
                        controlId="currentPssUserInput"
                        label="Data de pagamento"
                        className="mb-3"
                    >
                        <Form.Control
                            type="date"
                            placeholder=""
                        />
                    </FloatingLabel>
                </Col>
                <Col></Col>
                <Col sm={3} className='mx-2 my-1'>
                    <Button
                        variant='danger'
                        as="input"
                        value="Encerrar"
                        type="submit"
                        size="lg"
                    />
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default EditarPag