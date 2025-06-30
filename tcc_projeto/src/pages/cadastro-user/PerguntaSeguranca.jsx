// styles
import styles from "./cadastro.module.css";

// componentes bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

// router dom
import { useNavigate } from "react-router-dom";

// hooks
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser.js";

const PerguntaSeguranca = () => {
  
  const userType = localStorage.getItem("userType");
  if(userType !== "Visitante" && userType !== null ){
    navigate("/inicio");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navegação
  const navigate = useNavigate();
  const { inserirPerguntaResposta } = useUser();

  const onSubmit = (data) => {
    // tratativa provisoria para nenhuma pergunta selecionada
    if (data.userPergunta < 1 || data.userPergunta > 3) {
      alert("Defina uma pergunta de segurança");
      return false;
    }

    inserirPerguntaResposta(data);

    // casos user solicitante, abre tela de endereco, senao tela de cadastro de assistencia
    // TROQUEI de "userType" PARA "tipoUsuario"
    const userType = localStorage.getItem("tipoUsuario");
    if (userType === "solicitante") {
      navigate("/cadastro-endereco");
    } else if (userType === "administrador") {
      navigate("/cadastro-assistencia");
    } else {
      alert("User não válido");
    }
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  return (
    <Container>
      <Card className={styles.containerPergunta}>
        <Card.Header className="text-center d-flex flex-column align-items-center border-bottom-0 pb-0">
          <Row className="mb-2 w-100 justify-content-center">
            <Col xs="auto">
              <Image
                className={styles.Image}
                src="/logos/connectfix_logo.svg"
                fluid
              />
            </Col>
          </Row>

          <Card.Subtitle className="text-white text-center mb-1">
            Aumente sua segurança escolhendo uma pergunta de segurança
          </Card.Subtitle>

          <hr className={styles["divider-line"]} />
        </Card.Header>

        <Card.Body className="d-flex flex-column justify-content-center">
          <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            className={styles["pergunta-form"]}
          >
            {/* Pergunta de Segurança */}
            <Form.Select
              size="lg"
              aria-label
              className={styles["pergunta-select"]}
              {...register("pergunta")}
              isInvalid={!!errors.pergunta}
            >
              <option value={0}>Escolha sua pergunta de Segurança</option>
              <option value={1}>
                Qual é o nome do seu primeiro animal de estimação?
              </option>
              <option value={2}>
                Qual é o nome da escola onde você estudou na infância?
              </option>
              <option value={3}>
                Qual é o nome da cidade onde seus pais se conheceram?
              </option>
            </Form.Select>
            {errors.pergunta && (
              <div className="text-danger text-center">
                {errors.pergunta.message}
              </div>
            )}

            {/* Resposta Segurança */}
            <div className={styles["floating-label-container"]}>
              <FloatingLabel label="Resposta">
                <Form.Control
                  type="text"
                  placeholder=""
                  isInvalid={!!errors.resposta}
                  className={styles["pergunta-input"]}
                  {...register("resposta", {
                    required: "Campo necessário para recuperação de senha",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.resposta?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>

            <div className={styles["pergunta-button-container"]}>
              <Button
                type="submit"
                size="lg"
                className={styles["pergunta-button"]}
              >
                Avançar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PerguntaSeguranca;
