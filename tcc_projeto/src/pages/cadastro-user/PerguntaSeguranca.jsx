import {
  FloatingLabel,
  Button,
  Row,
  Col,
  Container,
  Image,
  Dropdown,
  ButtonGroup,
  Card
} from "react-bootstrap";

import Form from "react-bootstrap/Form"

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./cadastro.module.css";

const PerguntaSeguranca = () => {

  const navigate = useNavigate();
  const dataState = useLocation().state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataState) => {
    
    if (dataState.id == "1" ){
      navigate("/cadastro-assistencia", { state: data })
    }
    else if (dataState.id == "2"){
      navigate("/login", { state: data }) // cadastrar  solicitante no banco
    }

    console.log(dataState);

  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };
  return (
    <Container>
      <Card  className={styles.containerPergunta}>
        <Card.Header>
          {/* Parte de cima */}
          
            <Card.Title>
              <Row className="mb-3">
                <Col>
                  <Image
                    className={styles.Image}
                    src="/logos/connectfix_logo.svg"
                    fluid
                  />
                </Col>
              </Row>
            </Card.Title>
            <Card.Subtitle className="text-white">
              <Row>
                <Col>
                  
                    Aumente sua segurança escolhendo uma pergunta de segurança
                  
                  {/* retirado o divisor, se possivel retirar o shadow do header para inserir o o divisor */}
                </Col>
              </Row>
            </Card.Subtitle>
          
        </Card.Header>
        <Card.Body>

            <Form onSubmit={handleSubmit(onSubmit, onError)}>
               <Form.Select aria-label size="lg" {...register("pergunta")}>
                <option className={styles.dropdown} id="dropdown-basic">
                  Escolha sua Pergunta de Segurança
                </option>
                <option value="1">
                  Qual é o nome do seu primeiro animal de estimação?
                </option>
                <option value="2">
                  Qual é o nome da escola onde você estudou na infância?
                </option>
                <option value="3">
                  Qual é o nome da cidade onde seus pais se conheceram?
                </option>
              </Form.Select>

              {/* Resposta Segurança */}
              
                <FloatingLabel className="m-3" label="Resposta">
                  <Form.Control
                    type="text"
                    placeholder=""
                    isInvalid={!!errors.resposta}
                    {
                      ...register("resposta",{
                        required: "Campo necessário para recuperação de senha"
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.resposta?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              
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
                <Col>
                    <Button
                      as="input"
                      value="Finalizar"
                      type="submit"
                      size="lg"
                      className={`${styles.Button}`}
                    />
                  </Col>
              </Row>
            </Form>

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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PerguntaSeguranca;
