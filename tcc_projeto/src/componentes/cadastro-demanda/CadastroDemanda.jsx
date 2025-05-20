// Importação do react-boostrap.
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import FloatingLabel  from 'react-bootstrap/FloatingLabel';
import ListGroup from 'react-bootstrap/ListGroup';

// Importação dos icones.
import { MdOutlineSmartphone } from "react-icons/md";
import { FaTabletAlt } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa6";
import { FaDesktop } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";

// Importação de estilo.
import stylesForm from '../estilo-form/estiloForm.module.css'
import styles from './CadastroDemanda.module.css'

import { useState } from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const categoriaDispositivo = () => {
    const [value, setValue] = useState(["Celular", "Periferico"]);
    const handleChange = (val) => setValue(val);

  return (
    <div style={{maxWidth: 'none', width: '100%', margin: 0}}>
        <Form>
            <Container className={stylesForm.formulario}>
                <Row>
                    {/* Título do container */}
                    <Col>
                        <h3>Categoria do dispositivo</h3>
                    </Col>
                </Row>
                <Row>
                    <Col style={{maxHeight: 'fit-content'}}>
                        <ListGroup horizontal className={styles.lista}>
                            <ListGroup.Item value="Celular" className={styles.listaBotao}><MdOutlineSmartphone className='me-2'/>Celular</ListGroup.Item>
                            <ListGroup.Item value="Tablet" className={styles.listaBotao}><FaTabletAlt className='me-2' /> Tablet</ListGroup.Item>
                            <ListGroup.Item value="Notebook" className={styles.listaBotao}><FaLaptop className='me-2' /> Notebook</ListGroup.Item>
                            <ListGroup.Item value="Desktop" className={styles.listaBotao}><FaDesktop className='me-2' /> Desktop</ListGroup.Item>
                            <ListGroup.Item value="Periférico" className={styles.listaBotao}><FaHeadphones className='me-2' /> Periférico</ListGroup.Item>
                            <ListGroup.Item value="Outros" className={styles.listaBotao}>Outros</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            
            <Container className={stylesForm.formulario}>
                <Row>
                    {/* Título do container */}
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
                    <Col md={4} xs={12} className={stylesForm.campo}>
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
                    <Col md={4} xs={12} className={stylesForm.campo}>
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
                    <Col md={4} xs={12} className={stylesForm.campo}>
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
                    <Col md={4} xs={12} className={stylesForm.campo}>
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
                    <Col md={3} xs={12} className={stylesForm.campo}>
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
                    <Col md={3} xs={12} className={stylesForm.campo}>
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
                    <Col md={2} xs={12} className={stylesForm.campo}>
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
            </Container>

            <Container className={stylesForm.formulario}>
                <Row>
                    {/* Título do container */}
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
                    <Col md={6} xs={12} className={stylesForm.campo}>
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
                    <Col md={6} xs={12} className={stylesForm.campo}>
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
                    {/* Botão para prosseguir */}
                    <Col>
                        <Button
                            as='input'
                            value='Avançar'
                            type='submit'
                        ></Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    </div>
  )
}

export default categoriaDispositivo