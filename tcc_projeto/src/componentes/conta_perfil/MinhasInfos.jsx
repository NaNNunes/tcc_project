// importação de componentes do react-bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// react
import { useForm } from "react-hook-form";

// hooks
import { useUser } from "../../hooks/useApi";
import { useEffect, useState } from "react";

import stylesCad from '../demanda/cadastro-demanda/CadastroDemanda.module.css'

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
        <div>
            <Container className={stylesCad.parteFormulario}>
                <Form 
                    className="border rounded-3 mb-3 shadow"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >

                    <Row className="my-2">
                        {/* Titulo */}
                        <Col xs={5}>
                            <h3>Meus Dados</h3>
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
                                    disabled={!inputFieldEnable}
                                    {
                                        ...register("nome")
                                    }
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
                                    disabled={!inputFieldEnable}
                                    {
                                        ...register("sobrenome")
                                    }
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="cpfUser"
                                label="CPF"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text"
                                    placeholder=""
                                    disabled
                                    {
                                        ...register("cpf")
                                    }
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="m-1">
                        <Col xs={6}>
                            <FloatingLabel 
                                controlId="emailUserInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    name="email"
                                    size="sm"
                                    type="email"
                                    placeholder=""
                                    // campo quando invalido não permite auteração favor verificar lembrar de fazer em telefone
                                    {...register("email", {
                                        required: "O email é obrigatório",
                                    })}
                                />
                            </FloatingLabel>
                        </Col>
                    
                        <Col>
                            <FloatingLabel 
                                controlId="TelefoneUserInput"
                                label="Telefone"
                                className="mb-3"
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
                                })}
                                />
                                {errors.userTelefone && (
                                <p className='text-danger'>{errors.userTelefone.message}</p>
                                )}
                            </FloatingLabel>
                        </Col>
                        {props.botao && 
                            (
                                <Col xs={2}>
                                    {
                                        // are inputs enabled?
                                        (inputFieldEnable)
                                        ?
                                            <>
                                                <Button 
                                                    as="input"
                                                    value="Salvar"
                                                    type="submit"
                                                    size="lg"
                                                    className="mt-1"
                                                    // onClick={()=>{setInputFieldEnable(false)}}
                                                />
                                            </>
                                        :
                                            <>
                                                <Button 
                                                    as="input"
                                                    value="Editar"
                                                    type="submit"
                                                    size="lg"
                                                    className="mt-1"
                                                    // onClick={() => {setInputFieldEnable(true)}}
                                                />
                                            </>
                                    }
                                    
                                </Col>
                            )
                        }
                            
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default MinhasInfos