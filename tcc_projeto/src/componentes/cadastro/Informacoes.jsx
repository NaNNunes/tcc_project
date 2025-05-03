import {Form, FloatingLabel, Button, Row, Col,Container} from "react-bootstrap";

import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import styles from "./informacoes.module.css";

const Informacoes = () => {
  return (
    <Container className={styles.container}>
      {/* Parte de cima */}
      <Row>
        <Row className="mb-3">
          <Col>
            <Image
              className={styles.Image}
              src="/logos/connectfix_logo.svg"
              fluid
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="text-white">
              Primeiro, queremos saber mais sobre você
            </h6>
            <hr className="mb-3 mx-5 text-white border-2" />
          </Col>
        </Row>
      </Row>
      <Form className='px-4'>
        <Row>
          {/* E-mail */}
          <Col>
            <FloatingLabel
              id="userEmailInput"
              className="mb-3"
              label="Email"
            >
              <Form.Control
                type="email"
                placeholder=""
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="">
          {/* CPF e Telefone */}
          <Col>
            <FloatingLabel
              id="userCpfInput"
              className="mb-3"
              label='CPF'
            >
              <Form.Control
                type="text"
                placeholder="000.000.000-00"
              />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel
              id="userTelInput"
              className="mb-3"
              label='Telefone'
            >
              <Form.Control
                type="text"
                placeholder="(00) 00000-0000"
              />
            </FloatingLabel>
          </Col>
        </Row>

        {/* Nome e Sobrenome */}
        <Row className="">
          <Col className="">
            <FloatingLabel
              id="userNomeInput"
              className="mb-3"
              label="Nome"
            >
              <Form.Control
                type="text"
                placeholder="Seu nome"
              />
            </FloatingLabel>
          </Col>

          <Col className="">
            <FloatingLabel
              id="userSobrenomeInput"
              className="mb-3"
              label="Sobrenome"
            >
              <Form.Control
                type="text"
                placeholder="Sobrenome"
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          {/* Senha */}
          <Col>
            <FloatingLabel
              id="userSenhaInput"
              className="mb-3"
              label="Senha"
            >
              <Form.Control
                type="password"
                placeholder="Password"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel 
              id="userConfirmaSenhaInput"
              className="mb-3"
              label="Confirmar Senha"
            >
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
              />
            
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="my-3">
          {/* Checkbox de termos de uso */}
          <Col sm={6}>
            <Form.Check
              className={styles.checkbox}
              type="checkbox"
              id="termsCheck"
              label="Li e aceito os termos de uso"
            />
          </Col>
        </Row>

          <Row>
            <Col>
              <Button
                as="input"
                value="Avançar"
                type="button"
                size="lg"
                className={`${styles.Button}`}
              />
            </Col>
          </Row>

          <hr className="mt-4 mx-5 text-white border-2"/>
          
          <Row className="mt-5">
            <Col>
              <h6 className="text-white">
                Já possui conta?{" "}
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
              </h6>
            </Col>
          </Row>
      </Form>
    </Container>
  );
};

export default Informacoes;
