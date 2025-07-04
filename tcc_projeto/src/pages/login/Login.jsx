import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useForm } from "react-hook-form";

import styles from "./login.module.css";

import { useUser } from "../../hooks/useUser.js";
import { useVerificaLogin } from "../../hooks/useVerificaLogin.js";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  if(userType !== "Visitante" && userType !== null) return <Navigate to="/inicio"/>;

  localStorage.setItem("userType", "Visitante");

  const { verificaLogin } = useVerificaLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    // verifica qual a resposta da tentativa de acesso
    const respVerificacao = await verificaLogin(data);

    if (respVerificacao === "Login efetuado com sucesso") {
      alert(respVerificacao);
      navigate("/inicio");
    } else {
      alert(respVerificacao);
      console.log(respVerificacao);
    }
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  return (
    <div className="pageWrapper">
      <div className="mainContent">
        <Container className={styles.container}>
          <Form
            className={styles.loginForm}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Image
              className={styles.Image}
              src="/logos/connectfix_logo.svg"
              fluid
            />
            <div className="d-flex align-items-center justify-content-center">
              <h5 className="text-white">Confiança que gera conexões</h5>
            </div>
            <hr className="mb-4 mx-5 text-white border-2" />
            {/* Campo acesso cpf ou email */}
            <FloatingLabel
              id="fuserCpfInput"
              className="mb-3 mx-5"
              label="CPF ou Email"
            >
              <Form.Control
                type="text"
                placeholder=""
                isInvalid={!!errors.loginOuCpf}
                {...register("loginOuCpf", {
                  required: "Informe para efetuar o login",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.loginOuCpf?.message}
              </Form.Control.Feedback>
            </FloatingLabel>

            {/* Campo senha */}
            <FloatingLabel
              id="userSenhaInput"
              className="mb-3 mx-5"
              label="Senha"
            >
              <Form.Control
                type="password"
                placeholder="Senha"
                isInvalid={!!errors.senha} // deixa a borda vermelha
                {...register("senha", {
                  required: "A senha é obrigatória",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.senha?.message}
              </Form.Control.Feedback>
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

            <Row className="d-flex justify-content-center">
              <Col xs="auto">
                <Button
                  as="input"
                  value="Login"
                  type="submit"
                  size="lg"
                  className={styles.Button}
                />
              </Col>
            </Row>
            <hr className="mb-1 mx-5 text-white border-2" />

            <Row className="d-flex justify-content-center">
              <Col xs="auto">
                <div className="d-flex align-items-center gap-2 mt-3">
                  <h6 className="text-white mb-0">Ainda não se registrou?</h6>
                  <Link to="/selecao-perfil" className={styles.link}>
                    Siga por aqui.
                  </Link>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Login;
