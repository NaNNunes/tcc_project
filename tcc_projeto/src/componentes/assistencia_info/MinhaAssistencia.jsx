import {Button, Form, Row, Col, FloatingLabel} from 'react-bootstrap';
import { useState } from 'react';

const MinhaAssistencia = () => {

  return (
    <>
        <Form className='border rounded-3 shadow mb-3 p-1'>
            <Row className='p-1'>
                <Col className='m-1'>
                    <h3>Minha Assistencia</h3>
                </Col>
                <Col></Col>
                <Col sm={3} className='mx-2'>
                    <Button
                        as="input"
                        value="Adicionar"
                        type="submit"
                        size="lg" 
                    />
                </Col>
            </Row>
            <Row className='m-1'>
                <Col sm={4}>
                    {/* Fazer verificaão da quantidade de assistencias
                        cadastradas pelo user de acordo com seu id */}
                    <Form.Select className='mb-3 p-3'>
                        <option> CNPJ </option>
                        <option> 400.289.220/0001-01 </option>
                        <option> 123.456.789/0001-01 </option>
                    </Form.Select>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId='assistenciaEmailInput'
                        label="Email"
                        className='mb-3'
                    >
                        <Form.Control
                            type="email"
                            placeholder=""
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col sm={4}>
                    <FloatingLabel
                        controlId='assistenciaTelInput'
                        label="Telefone"
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            placeholder=''
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId='assistenciaNomeFantasiaInput'
                        label="Nome fantasia"
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            placeholder=''
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col>
                    <FloatingLabel
                        controlId='assistenciaNomeFantasiaInput'
                        label="Nome fantasia"
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            placeholder=''
                        />
                    </FloatingLabel>
                </Col>
                <Col sm={3} className='mx-2 my-1'>
                    <Button
                        as="input"
                        value="Salvar"
                        type="submit"
                        size="lg" 
                    />
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default MinhaAssistencia