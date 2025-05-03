import {Form, FloatingLabel, Row, Col} from 'react-bootstrap';

const categoriaDispositivo = () => {
  return (
    <div>
        <Form>
            <Row>
                {/* Titulo */}
                <Col>
                    <h3>Categoria do dispositivo</h3>
                </Col>
            </Row>
            <Row>
                <FloatingLabel></FloatingLabel>
            </Row>
        </Form>
    </div>
  )
}

export default categoriaDispositivo