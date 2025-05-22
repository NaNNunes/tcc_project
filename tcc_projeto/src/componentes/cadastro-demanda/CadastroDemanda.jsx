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

// Importação do useForm para mexer com o formulário.
import { useForm } from "react-hook-form";

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const categoriaDispositivo = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
    } = useForm();

    const categoriaSelecionada = watch("categoria");

    // Lista com as categorias do dispositivo
    const categorias = [
        {label: "Celular", value: "Celular", icon: <MdOutlineSmartphone className="me-2" />},
        {label: "Tablet", value: "Tablet", icon: <FaTabletAlt className="me-2" />},
        {label: "Notebook", value: "Notebook", icon: <FaLaptop className="me-2" />},
        {label: "Desktop", value: "Desktop", icon: <FaDesktop className="me-2" />},
        {label: "Periférico", value: "Periférico", icon: <FaHeadphones className="me-2" />},
        {label: "Outros", value: "Outros", icon: null},   
    ];

    const onSubmit = async (dados) => {
        console.log("Dados: ", dados)
    }

    const onError = (errors) => {
        console.log("Erros: ", errors)
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* Div para controlar o tamanho do Form. */}
        <div className={styles.formulario}>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                {/* Categoria do dispositivo */}
                <Container fluid className={stylesForm.parteFormulario}>
                    {/* Campo oculto para fazer o registro da categoria e caso tenha algum erro mostrar na tela. */}
                    <input 
                        type="hidden" 
                        {...register("categoria", {
                            required: "A categoria é obrigatória"
                        })}
                    />
                    {/* Título do container */}
                    <Row> 
                        <Col>
                            <h3>Categoria do dispositivo</h3>
                        </Col>
                    </Row>
                    {/* Seleção de categoria */}
                    <Row>
                        <Col style={{maxHeight: 'fit-content'}}>
                            <ListGroup 
                                horizontal 
                                className={styles.lista}
                            >
                                {/* Map para carregar as categorias da 'const categorias' */}
                                {categorias.map((cat) => (
                                    <ListGroup.Item
                                        key={cat.value}
                                        value={cat.value}
                                        className={
                                            `${styles.listaBotao} ${categoriaSelecionada === cat.value 
                                            ? styles.listaBotaoSelecionado 
                                            : ""}`
                                        }
                                        active={categoriaSelecionada === cat.value}
                                        onClick={() => setValue("categoria", cat.value, { shouldValidate: true })} 
                                        // shouldValidate serve para caso o erro já estiver presente na tela do usuário, quando for selecionado um campo o erro some imediatamente.
                                    >
                                        {cat.icon}
                                        {cat.label}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            {errors.categoria && (<span className='error'>{errors.categoria.message}</span>)}
                        </Col>
                    </Row>
                </Container>
                
                {/* Informações do dispositivo */}
                <Container fluid className={stylesForm.parteFormulario}>
                    {/* Título do container */}
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

                    {/* Informações do dispositivo */}
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

                {/* Contextualize-nos */}
                <Container fluid className={stylesForm.parteFormulario}>
                    {/* Título do container */}
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
    </div>
    
  )
}

export default categoriaDispositivo