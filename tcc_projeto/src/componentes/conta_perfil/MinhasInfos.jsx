// importação de componentes do react-bootstrap.
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Importações dos icones.
import { IoSaveOutline } from "react-icons/io5";

// react
import { useForm } from "react-hook-form";

// hooks
import { useUser } from "../../hooks/useApi";
import { useEffect, useState } from "react";

import styles from './conta_perfil.module.css';

const MinhasInfos = (props) => {

    const { register, handleSubmit, setValue, formState: {errors}} = useForm();
    
    const {atualizaInfosUser} = useUser();

    // enable input at the fields
        // !false para fazer teste de alteração
    const [inputFieldEnable, setInputFieldEnable] = useState(!false);

    // atribuindo valores aos campos
    for(const [key, value] of Object.entries(props)){
        setValue(key, value);
    }

    const onSubmit = async (data) => {
        // atualiza dados
        atualizaInfosUser(data);
    }
    const onError = async (erro) => {
        console.log(erro);
    }

    return (
        <>
            <Form 
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Container fluid className={styles.parteFormulario} style={{marginBottom: '20px'}}>
                    {/* Titulo */}
                    <Row style={{paddingBottom: '1%'}}>
                        <Col md={12} xs={12}>
                            <h3 className={styles.titleh3}>Minhas informações</h3>
                        </Col>
                    </Row>

                    {/* Campos de nome, sobrenome e CPF. */}
                    <Row>
                        {/* Coluna de nome. */}
                        <Col md={4} xs={12} className={styles.campo}>
                            <FloatingLabel 
                                controlId="nameUserEditInput"
                                label="Nome"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    disabled={!inputFieldEnable}
                                    {...register("nome", {
                                        required: "O nome é obrigatório",
                                        minLength: {
                                        value: 2,
                                        message: "O nome deve ter pelo menos 2 caracteres",
                                        },
                                        maxLength: {
                                        value: 20,
                                        message: "O nome deve ter ate 20 caracteres",
                                        },
                                        pattern: {
                                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
                                        message: "O nome só pode conter letras e espaços",
                                        },
                                        validate: (value) => (value && value.trim() !== '') || 'O sobrenome não pode conter apenas espaços em branco.',
                                    })}
                                />
                                {errors.nome && (
                                    <span className='error'>{errors.nome.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>
                        
                        {/* Coluna de sobrenome. */}
                        <Col md={4} xs={12} className={styles.campo}>
                            <FloatingLabel 
                                controlId="surnameUserInput"
                                label="Sobrenome"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    disabled={!inputFieldEnable}
                                    {...register("sobrenome", {
                                        required: "O sobrenome é obrigatório",
                                        minLength: {
                                        value: 2,
                                        message: "O sobrenome deve ter pelo menos 2 caracteres",
                                        },
                                        maxLength: {
                                        value: 20,
                                        message: "O sobrenome deve ter ate 20 caracteres",
                                        },
                                        pattern: {
                                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
                                        message: "O sobrenome só pode conter letras e espaços",
                                        },
                                        validate: (value) => (value && value.trim() !== '') || 'O sobrenome não pode conter apenas espaços em branco.',
                                    })}
                                />
                                {errors.sobrenome && (
                                    <span className='error'>{errors.sobrenome.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>

                        {/* Coluna do CPF. */}
                        <Col md={4} xs={12} className={styles.campo}>
                            <FloatingLabel 
                                controlId="cpfUserEditInput"
                                label="CPF"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    disabled={inputFieldEnable}
                                    {...register("cpf",)}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    
                    {/* Campos de email, telefone e botão para salvar */}
                    <Row>
                        {/* Coluna de email */}
                        <Col md={5} lg={6} xs={12} className={styles.campo}>
                            <FloatingLabel 
                                controlId="emailUserInput"
                                label="Email"
                            >
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder=""
                                    // campo quando invalido não permite auteração favor verificar lembrar de fazer em telefone
                                    {...register("email", {
                                        required: "O email é obrigatório",
                                        pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                        message: "Email inválido",
                                        },
                                        validate: (value) => value.includes("@") || "Email inválido",
                                        validate: (value) => (value && value.trim() !== '') || 'O sobrenome não pode conter apenas espaços em branco.',
                                    })}
                                />
                                {errors.email && (
                                    <span className='error'>{errors.email.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>

                        {/* Coluna de telefone */}
                        <Col md={4} xs={12} className={styles.campo}>
                            <FloatingLabel 
                                controlId="TelefoneUserInput"
                                label="Telefone"
                            >
                                <Form.Control
                                type="text"
                                placeholder="(00) 00000-0000"
                                {...register("userTelefone", {
                                    required: "Telefone necessário",
                                    pattern: {
                                    value: /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9?\d{4})[-.\s]?(\d{4})$/,
                                    message: "Telefone inválido",
                                    },
                                    validate: (value) => (value && value.trim() !== '') || 'O sobrenome não pode conter apenas espaços em branco.',
                                })}
                                />
                                {errors.userTelefone && (
                                    <span className='error'>{errors.userTelefone.message}</span>
                                )}
                            </FloatingLabel>
                        </Col>
                        
                        {/* Botão para salvar a edição */}
                        <Col md={3} lg={2} xs={12} className={styles.campo} style={{display: 'flex', justifyContent: 'center'}}>
                            {
                                // are inputs enabled?
                                (inputFieldEnable)
                                ?
                                    <>
                                        <Button 
                                            type="submit"
                                            className={styles.botaoSalvar}
                                            // onClick={()=>{setInputFieldEnable(false)}}
                                        >
                                            <IoSaveOutline style={{ marginRight: '8px' }} size={24}/>Salvar
                                        </Button>
                                    </>
                                :
                                    <>
                                        <Button 
                                            as="input"
                                            value="Editar"
                                            type="submit"
                                            className={styles.botaoSalvar}
                                            // onClick={() => {setInputFieldEnable(true)}}
                                        />
                                    </>
                            }  
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    )
}

export default MinhasInfos