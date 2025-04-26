import {Form, FloatingLabel, Button, Row, Col} from "react-bootstrap";

const Seguranca = () => {
  return (
    <>
        <Form className="border rounded-3 shadow mb-3">
            <Row className="mb-1 mt-2">
                <Col xs={6}>
                    <h3>Dados de Segurança</h3>
                </Col>
            </Row>
            <Row className="m-1">
                <Row>
                    <Col sm={4}>
                        <h5 style={{color:"gray"}}>Alterar senha</h5>
                    </Col>
                </Row>
                <Col>
                    <FloatingLabel
                        controlId="currentPssUserInput"
                        label="Senha Atual"
                        className="mb-3"    
                    >
                        <Form.Control
                            type="text"
                            placeholder=""
                        />

                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId="newPssUserInput"
                        label="Nova Senha"
                        className="mb-3"    
                    >
                        <Form.Control
                            type="text"
                            placeholder=""
                        />

                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId="checkNewPssUSerInput"
                        label="Confirmar Senha"
                        className="mb-3"    
                    >
                        <Form.Control
                            type="text"
                            placeholder=""
                        />

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

export default Seguranca