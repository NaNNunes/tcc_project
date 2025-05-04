import {Form, Row, Col, FloatingLabel, Container, Button} from 'react-bootstrap';
import styles from '../../estilo-form/estiloForm.module.css'

const Contexto = () => {
  return (
    <div>
        <Container>
            <Form className={styles.formulario}>
                <Row>
                    <Col md={12} xs={12}>
                        <h3
                            style={{
                                textAlign: "left"
                            }}
                        >
                            Contextualize-nos
                        </h3>
                    </Col>
                </Row>

                <Row>
                    {/* Coluna de descriçao do problema */}
                    <Col md={6} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId='DescProblemInput'
                            label='Descrição do problema'
                        >
                            <Form.Control 
                                as='textarea'
                                style={{height: "100px", resize: "none"}}
                            />
                        </FloatingLabel>
                    </Col>
                    
                    {/* Coluna de observações */}
                    <Col md={6} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId='ObservacoesInput'
                            label='Observações'
                        >
                            <Form.Control 
                                as='textarea'
                                style={{height: "100px", resize: "none"}}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button
                            as='input'
                            value='Avançar'
                            type='submit'
                        ></Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    </div>
  )
}

export default Contexto