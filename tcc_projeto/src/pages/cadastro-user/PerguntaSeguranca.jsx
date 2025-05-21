import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Container,
  Image,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./cadastro.module.css";

const PerguntaSeguranca = () => {
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
  return (
    <Container className={styles.containerPergunta}>
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
              Aumente sua segurança escolhendo uma pergunta de segurança
            </h6>
            <hr className="mb-3 mx-5 text-white border-2" />
          </Col>
        </Row>
      </Row>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle className={styles.dropdown} id="dropdown-basic">
              Escolha sua Pergunta de Segurança
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                Qual é o nome do seu primeiro animal de estimação?
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Qual é o nome da escola onde você estudou na infância?
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Qual é o nome da cidade onde seus pais se conheceram?
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Form>
          {/* Resposta Segurança */}
          <Col>
            <FloatingLabel className="m-3" label="Resposta">
              <Form.Control
                type="email"
                placeholder=""
                {...register("email")}
              />
            </FloatingLabel>
          </Col>
        </Form>
      </Row>
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
    </Container>
  );
};

export default PerguntaSeguranca;
