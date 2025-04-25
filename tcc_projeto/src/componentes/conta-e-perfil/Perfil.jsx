import {Form, FloatingLabel, Button, Row, Col} from "react-bootstrap";

const Perfil = () => {
  return (
    <>
        <Form className="border rounded-3">
            <Row className="my-2">
                {/* Titulo */}
                <Col xs={6}>
                    <h3>Minhas informações</h3>
                </Col>
            </Row>
            <Row className="m-1">
                <Col xs={5}>
                    <FloatingLabel 
                        controlId="nameUserInput"
                        label="Nome"
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
                        controlId="surnameUserInput"
                        label="Sobrenome"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="m-1">
                <Col>
                    <FloatingLabel 
                        controlId="nameUserInput"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel 
                        controlId="surnameUserInput"
                        label="Telefone"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text" 
                            placeholder="name@example.com"
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <Button 

                    />
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default Perfil