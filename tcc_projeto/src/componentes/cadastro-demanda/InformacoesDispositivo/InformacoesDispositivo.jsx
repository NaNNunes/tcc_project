import {Form, Row, Col, FloatingLabel, Container, Nav} from 'react-bootstrap';
import styles from '../../estilo-form/estiloForm.module.css'
import NavBar from '../../NavBar/MenuNavegacao.jsx';

const InformacoesDispositivo = () => {
  return (
    <div>
        <NavBar />

        <Container>
            <Form className={styles.formulario}>
                <Row>
                    <Col md={12} xs={12}>
                        <h3 
                            style={{
                                textAlign: "left"
                            }}
                        >
                            Informações do dispositivo
                        </h3>
                    </Col>
                </Row>

                <Row>
                    {/* Coluna de marca */}
                    <Col md={4} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId='MarcaInput'
                            label='Marca'
                        >
                            <Form.Select
                                type='select'
                                placeholder=''   
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="Xbox">Xbox</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    
                    {/* Coluna de fabricante */}
                    <Col md={4} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId='FabricanteInput'
                            label='Fabricante'
                        >
                            <Form.Control 
                                type='text'
                                placeholder=''
                            />

                        </FloatingLabel>
                    </Col>

                    {/* Coluna de modelo */}
                    <Col md={4} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId='ModeloInput'
                            label='Modelo'
                        >
                            <Form.Select 
                                type='text'
                                placeholder=''
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="Xbox-Series-S">Xbox Series S</option>
                                <option value="Xbox-Series-X">Xbox Series X</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row>
                    {/* Coluna de numero de serie */}
                    <Col md={4} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId="NumSerieInput"
                            label="N° de série"
                        >
                            <Form.Control 
                                type='text'
                                placeholder=''
                            />
                        </FloatingLabel>
                    </Col>

                    {/* Coluna de tensao */}
                    <Col md={3} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId="TensaoInput"
                            label="Tensão(V)"
                        >
                            <Form.Control 
                                type='text'
                                placeholder=''
                            />
                        </FloatingLabel>
                    </Col>

                    {/* Coluna de amperagem */}
                    <Col md={3} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId="AmperagemInput"
                            label="Amperagem(A)"
                        >
                            <Form.Control 
                                type='text'
                                placeholder=''
                            />
                        </FloatingLabel>
                    </Col>

                    {/* Coluna de cor */}
                    <Col md={2} xs={12} className={styles.campo}>
                        <FloatingLabel
                            controlId="CorInput"
                            label="Cor"
                        >
                            <Form.Control 
                                type='text'
                                placeholder=''
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>
        </Container>
    </div>
  )
}

export default InformacoesDispositivo