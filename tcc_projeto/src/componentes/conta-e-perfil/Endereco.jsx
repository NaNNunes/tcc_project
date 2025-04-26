import {Form, FloatingLabel, Row, Col, Button} from "react-bootstrap";

const Endereco = () => {
  return (
    <>
        <Form className="border rounded-3 shadow mb-3">
          <Row className="m-2 mt-3">
            <Col xs={3}>
              <h3>Endereco</h3>
            </Col>
          </Row>
          <Row className="m-1">
            <Col>
              <FloatingLabel
                controlId="currentPssUserInput"
                label="Senha Atual"
                className="mb-3"
              >
                <Form.Control/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="currentPssUserInput"
                label="Senha Atual"
                className="mb-3"
              >
                <Form.Control/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="currentPssUserInput"
                label="Senha Atual"
                className="mb-3"
              >
                <Form.Control/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="m-1">
            <Col>
              <FloatingLabel
                controlId="currentPssUserInput"
                label="Senha Atual"
                className="mb-3"
              >
                <Form.Control/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="currentPssUserInput"
                label="Senha Atual"
                className="mb-3"
              >
                <Form.Control/>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="currentPssUserInput"
                label="Senha Atual"
                className="mb-3"
              >
                <Form.Control/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3}>
              <Button
                as="input"
                value="Salvar"
                type="submit"
                size="lg"
              />
            </Col>
          </Row>
        </Form>
    </>
  )
}

export default Endereco