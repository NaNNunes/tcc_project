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

import { verificadorCpf } from "../../functions/verificador_cpf";

const CadastroUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!verificadorCpf(data.cpf)) {
      return false;
    }

    navigate("/pergunta-seguranca", { state: data });
  };

  const senha = watch("senha");
  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  // to do renan : chamar funcao para registro na api local

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
            <h6 className="text-white">Cadastre seu cartão de crédito</h6>
            <hr className="mb-3 mx-5 text-white border-2" />
          </Col>
        </Row>
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
              <Form.Control type="text" placeholder="" {...register("text")} />
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
                {...register("validadeCartao")}
              />
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
                {...register("codigoSeguranca")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        {/* Nome e Sobrenome */}
        <Row>
          <Col>
            <FloatingLabel id="userNomeCartaoInput" className="mb-3" label="Nome Completo">
              <Form.Control
                type="text"
                placeholder=""
                {...register("nomeCartao")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="">
          <Col className="">
            <FloatingLabel id="userNomeInput" className="mb-3" label="Nome">
              <Form.Control
                type="text"
                placeholder="Nome"
                {...register("nome")}
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
                {...register("sobrenome")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              as="input"
              value="Confirmar"
              type="submit"
              size="lg"
              className={`${styles.Button}`}
            />
          </Col>
        </Row>

        <hr className="mt-4 mx-5 text-white border-2" />

        <Row className="mt-4">
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

export default CadastroUser;
