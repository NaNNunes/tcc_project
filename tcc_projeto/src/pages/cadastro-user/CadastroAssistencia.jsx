import React from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./cadastro.module.css";

const CadastroAssistencia = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    // verifica cnpj
    if(""){

    }

    // socando mais coisas no localStorage
    localStorage.setItem("assistenciaEmail",data.assistenciaEmail);
    localStorage.setItem("assistenciaNomeFantasia",data.nomeFantasia);
    localStorage.setItem("assistenciaRazaoSocial",data.razaoSocial);
    localStorage.setItem("assistenciaCnpj",data.cnpj);
    localStorage.setItem("assistenciaTelefone",data.assistenciaTelefone);

    console.log(data);
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };
  return (
    <Container className={styles.containerAssistencia}>
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
              Informe-nos sobre sua Assistência Técnica
            </h6>
            <hr className="mb-3 mx-5 text-white border-2" />
          </Col>
        </Row>
      </Row>
      <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          {/* E-mail */}
          <Col>
            <FloatingLabel id="assistenciaEmailInput" className="mb-3" label="Email">
              <Form.Control
                type="email"
                placeholder=""
                {...register("assistenciaEmail")}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          {/* Nome fantasia */}
          <Col>
            <FloatingLabel
              id="nomeFantasiaInput"
              className="mb-3"
              label="Nome Fantasia"
            >
              <Form.Control
                type="text"
                placeholder=""
                {...register("nomeFantasia")}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          {/* Razão social */}
          <Col>
            <FloatingLabel
              id="RazaoSocialInput"
              className="mb-3"
              label="Razão Social"
            >
              <Form.Control
                type="text"
                placeholder=""
                {...register("razaoSocial")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="">
          {/* Cnpj e Telefone */}
          <Col>
            <FloatingLabel id="CnpjInput" className="mb-3" label="CNPJ">
              <Form.Control
                type="text"
                placeholder="00.000.000/0000-00"
                {...register("cnpj",{
                  required:"cnpj necessário",
                  maxLength:{
                    value:14,
                    message:"necessario 14 digitos"
                  },
                  minLength:{
                    value:14,
                    message:"necessario 14 digitos"
                  },
                  //regex para numeros
                })}
              />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel id="assistenciaTelInput" className="mb-3" label="Telefone">
              <Form.Control
                type="text"
                placeholder="(00) 00000-0000"
                {...register("assistenciaTelefone")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Form.Check
          className={styles.checkbox}
          type="checkbox"
          id="termsCheck"
          value={true}
          {...register("assistenciaTermos", {
            required: "Termos necessários",
          })}
          label={
            <>
              Li e aceito os{" "}
              <Link
                to="/termos-de-uso"
                className={styles.link}
                style={{ fontSize: "13px" }}
              >
                termos de uso
              </Link>
            </>
          }
        />

        <Row>
          <Col>
            <Button
              as="input"
              value="Avançar"
              type="submit"
              size="lg"
              className={`${styles.Button}`}
            />
          </Col>
        </Row>

        <hr className="mb-3 mx-5 text-white border-2" />

        <Row className="mt-2">
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

export default CadastroAssistencia;
