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
import { useState } from "react";

const MinhasInfos = (props) => {

    const { register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {

    }
    const onError = async (data) => {
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
                                value={props.nome}
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
                                value={props.sobrenome}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="m-1">
                    <Col xs={6}>
                        <FloatingLabel 
                            controlId="nameUserInput"
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={props.email}
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
                                value={props.telefone}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col xs={2}>
                        <Button 
                            as="input"
                            value="Salvar"
                            type="submit"
                            size="lg"
                            className="mt-1"
                        />
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default MinhasInfos