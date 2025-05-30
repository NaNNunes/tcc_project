// importação de componentes do react-bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// react
import { useForm } from "react-hook-form";

// hooks
import { useUser } from "../../hooks/useApi";
import { useEffect, useState } from "react";

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
                className="border rounded-3 mb-3 shadow"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Row className="my-2">
                    {/* Titulo */}
                    <Col xs={5}>
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
                                    pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Email inválido",
                                    },
                                    validate: (value) => value.includes("@") || "Email inválido",
                                })}
                            />
                            {errors.email && (
                            <p className='text-danger'>{errors.email.message}</p>
                            )}
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
                </Row>
            </Form>
        </>
    )
}

export default MinhasInfos