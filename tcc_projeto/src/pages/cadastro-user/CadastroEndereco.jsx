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

const CadastroEndereco = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!verificadorCpf(data.cpf)) {
      return false;
    }

    navigate("/pergunta-seguranca", { state: data });
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  // to do renan : chamar funcao para registro na api local

  return (
    <Container className={styles.containerEndereco}>
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
          <Col className="d-flex flex-column align-items-center">
            <h5 className="text-center text-white">
              Estamos quase lá!
              <br /> Pra finalizar, coloque o endereço de seu negócio.
            </h5>
            <hr className="mb-3 text-white border-2 w-75" />
          </Col>
        </Row>
      </Row>
      <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row className="">
          <Col>
            <FloatingLabel id="userCepInput" className="mb-3" label="CEP">
              <Form.Control
                type="text"
                placeholder="00.000.000"
                {...register("cep")}
              />
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel id="userCityInput" className="mb-3" label="Cidade">
              <Form.Control
                type="text"
                placeholder=" "
                {...register("cidade")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="">
          <Col className="">
            <FloatingLabel id="userBairroInput" className="mb-3" label="Bairro">
              <Form.Control
                type="text"
                placeholder="Bairro"
                {...register("bairro")}
              />
            </FloatingLabel>
          </Col>

          <Col className="">
            <FloatingLabel
              id="userLogradouroInput"
              className="mb-3"
              label="Logradouro"
            >
              <Form.Control
                type="text"
                placeholder="Logradouro"
                {...register("logradouro")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel id="userUFInput" className="mb-3" label="UF">
              <Form.Control type="text" placeholder="UF" {...register("uf")} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel id="userNumInput" className="mb-3" label="Nº">
              <Form.Control
                type="text"
                placeholder=""
                {...register("numero", {})}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center mt-2">
            <Button
              as="input"
              value="Cadastrar-se"
              type="submit"
              size="lg"
              className={`${styles.Button}`}
            />
            <hr className="mb-3 text-white border-2 w-100" />
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center mt-2">
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

export default CadastroEndereco;
