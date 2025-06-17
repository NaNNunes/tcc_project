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
import Form from "react-bootstrap/Form"

// router dom 
import { Link, useNavigate} from "react-router-dom";

// hooks
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useApi";

const PerguntaSeguranca = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navegação
  const navigate = useNavigate();
  const {inserirPerguntaResposta} = useUser();

  const onSubmit = (data) => { 
    // tratativa provisoria para nenhuma pergunta selecionada
    if(data.userPergunta < 1 || data.userPergunta > 3){
      alert("Defina uma pergunta de segurança");
      return false;
    }

    inserirPerguntaResposta(data);

    // casos user solicitante, abre tela de endereco, senao tela de cadastro de assistencia
    // TROQUEI de "userType" PARA "tipoUsuario"
    const userType = localStorage.getItem("tipoUsuario") ;
    if(userType === "solicitante"){
      navigate("/cadastro-endereco")
    }
    else if (userType === "administrador"){
      navigate("/cadastro-assistencia")
    }
    else{
      alert("User não válido")
    }
    
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
             
                <Form.Select size="lg" aria-label {...register("pergunta")}>
                  <option value={0}>
                    Escolha sua pergunta de Segurança
                  </option>
                  <option value={1}>Qual é o nome do seu primeiro animal de estimação?</option>
                  <option value={2}>Qual é o nome da escola onde você estudou na infância?</option>
                  <option value={3}>Qual é o nome da cidade onde  seus pais se conheceram?</option>
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
