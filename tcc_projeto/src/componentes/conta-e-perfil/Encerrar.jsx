import {Form, FloatingLabel, Row, Col, Button} from 'react-bootstrap';

const Encerrar = () => {
  return (
    <>
        <Form className='border rounded-3 shadow'>
            <Row className='m-2 mt-3'>
                <Col xs={4}>
                    <h3>Encerrar conta</h3>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col>
                    <p className='mx-2 '>
                        Encerre sua conta, incluindo todas as informações pessoais.
                        O encerramento permanente da sua conta ocorrerá imediatamente
                        depois da confirmação.
                    </p>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={3} className='mx-2'>
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

export default Encerrar