import { Row, Col, Button, Form, Container, Image, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./login.module.css";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    console.log("dados: ", data);
  }

  const onError = (errors) => {
    console.log("Error: ", errors);
  }

  return (
    <Container className={styles.container}>
      <Form 
        className={styles.loginForm}
        onSubmit={handleSubmit( onSubmit, onError )}
      >
        <Image
          className={styles.Image}
          src="/logos/connectfix_logo.svg"
          fluid
        />

        <h6 className="text-white">Confiança que gera conexões</h6>
        <hr className="mb-4 mx-5 text-white border-2" />

        <FloatingLabel 
          id="fuserCpfInput"
          className="mb-3 mx-5"
          label="CPF"
        >
          <Form.Control
            type="text"
            placeholder="000.000.000-00"
            {
              ...register("cpf")
            }
          />

        </FloatingLabel>

        <FloatingLabel
          id="userSenhaInput"
          className="mb-3 mx-5"
          label="Senha"
        >
          <Form.Control   
            type="password"
            placeholder=""
            {
              ...register("senha")
            }
          />
        </FloatingLabel>

        <div className={styles.ancor}>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Row className="d-grid gap-2">
            <Col>
              <Button
                as="input"
                value="Login"
                type="submit"
                size="lg"
                className={styles.Button}
              />
            </Col>
        </Row>
        <Row>
          <Col>
            <hr className="mb-1 mx-5 text-white border-2" />
          

          <h6 className="mt-3 text-white">Ainda não se registrou?    
            <Link
              to="/cadastro"
              className={styles.link}
            >
                Siga por aqui.
            </Link>
          </h6>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
