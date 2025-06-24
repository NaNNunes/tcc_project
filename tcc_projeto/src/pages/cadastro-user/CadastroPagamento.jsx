
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./cadastro.module.css";

const CadastroUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  // to do renan : chamar funcao para registro na api local

  return (
    <Container className={styles.containerPagamento}>
      {/* Parte de cima */}

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
        <Col className="d-flex flex-column align-items-center">
          <h5 className="text-white">Cadastre seu cartão de crédito</h5>
          <hr className={styles.dividerLine} />
        </Col>
      </Row>

      <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Cartão */}
        <Row>
          <Col>
            <FloatingLabel
              id="userCartaoInput"
              className="mb-3"
              label="Cartão de crédito"
            >
              <Form.Control
                type="text"
                placeholder=""
                isInvalid={!!errors.text}
                {...register("text", {
                  required: "Número do cartão é obrigatório",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.text?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="">
          {/* Validade e Código de Segurança */}
          <Col>
            <FloatingLabel
              id="userValidadeCartaoInput"
              className="mb-3"
              label="Validade"
            >
              <Form.Control
                type="text"
                placeholder=""
                isInvalid={!!errors.validadeCartao}
                {...register("validadeCartao", {
                  required: "Validade é obrigatória",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.validadeCartao?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel
              id="userCodigoSegInput"
              className="mb-3"
              label="Código de Segurança"
            >
              <Form.Control
                type="text"
                placeholder=""
                isInvalid={!!errors.codigoSeguranca}
                {...register("codigoSeguranca", {
                  required: "Código de segurança é obrigatório",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.codigoSeguranca?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        {/* Nome no Cartão */}
        <Row>
          <Col>
            <FloatingLabel
              id="userNomeCartaoInput"
              className="mb-3"
              label="Nome Completo"
            >
              <Form.Control
                type="text"
                placeholder=""
                isInvalid={!!errors.nomeCartao}
                {...register("nomeCartao", {
                  required: "Nome no cartão é obrigatório",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nomeCartao?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        {/* Nome e Sobrenome */}
        <Row className="">
          <Col>
            <FloatingLabel id="userNomeInput" className="mb-3" label="Nome">
              <Form.Control
                type="text"
                placeholder="Nome"
                isInvalid={!!errors.nome}
                {...register("nome", {
                  required: "Nome é obrigatório",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel
              id="userSobrenomeInput"
              className="mb-3"
              label="Sobrenome"
            >
              <Form.Control
                type="text"
                placeholder="Sobrenome"
                isInvalid={!!errors.sobrenome}
                {...register("sobrenome", {
                  required: "Sobrenome é obrigatório",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sobrenome?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column align-items-center mt-2 mb-3">
            <Button
              as="input"
              value="Confirmar"
              type="submit"
              size="lg"
              className={`${styles.Button}`}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CadastroUser;
