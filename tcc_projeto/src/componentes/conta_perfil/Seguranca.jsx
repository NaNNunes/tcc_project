import {Form, FloatingLabel, Button, Row, Col} from "react-bootstrap";

const Seguranca = () => {
  return (
    <>
        <Form className="border rounded-3 shadow mb-3">
            {/* alterar senha */}
            <Row className="mb-1 mt-2">
                <Col xs={6}>
                    <h3>Dados de Segurança</h3>
                </Col>
            </Row>
            <Row className="m-1">
                <Row>
                    <Col xs={4}>
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
                <Col xs={3}>
                    <Button
                        as="input"
                        value="Salvar"
                        type="submit"
                        size="lg"
                    />
                </Col>
            </Row>
            {/* Pergunta de segurança */}
            <Row className="mb-3">
                <Col sm={6}>
                    <h4>Pergunta de segurança</h4>
                </Col>
                <Row>
                    <p>Altere a pergunta de segurança que será usada para recuperar sua senha.</p>
                </Row>
                <Row>
                    <Col xs={5}>
                        <Button
                            as="input"
                            value="Alterar pergunta"
                            type="submit"
                            size="lg"
                        />
                    </Col>
                </Row>
            </Row>
        </Form>
    </>
  )
}

export default Seguranca