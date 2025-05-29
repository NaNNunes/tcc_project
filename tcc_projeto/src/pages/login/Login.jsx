import {
  Row,
  Col,
  Button,
  Form,
  Container,
  Image,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./login.module.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/userContext";
import { useVerificaLogin } from "../../hooks/useApi";

const Login = () => {

  const {login} = useContext(AuthContext);
  // useEffect(()=>{
  //   logout();
  // },[])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  const {verificaLogin} = useVerificaLogin();
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("dados: ", data);
    const respVerificacao = verificaLogin(data);
    if(respVerificacao === "Login efetuado com sucesso"){
      alert(respVerificacao);
      navigate("/criar-demanda");
    }
    else{
      alert(respVerificacao);
    }
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  const formatarCPF = (cpf) => {
    const numeros = cpf.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
<<<<<<< HEAD
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
          <h6 className="text-white">Confiança que gera conexões</h6>
        </div>
        <hr className="mb-4 mx-5 text-white border-2" />

        {/* Campo CPF */}
        <FloatingLabel id="fuserCpfInput" className="mb-3 mx-5" label="CPF">
          <Form.Control
            type="text"
            placeholder="000.000.000-00"
            isInvalid={!!errors.cpf}
            {...register("cpf", {
              required: "Informe o CPF para efetuar o login",
            })}
            onChange={(e) => {
              const formatado = formatarCPF(e.target.value);
              setValue("cpf", formatado);
            }}

          />
          <Form.Control.Feedback type="invalid">
            {errors.cpf?.message}
          </Form.Control.Feedback>

        </FloatingLabel>

        {/* Campo senha */}
        <FloatingLabel id="userSenhaInput" className="mb-3 mx-5" label="Senha">
          <Form.Control
            type="password"
            placeholder="Senha"
            isInvalid={!!errors.senha} // deixa a borda vermelha
            {...register("senha", {
              required: "A senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 caracteres",
              },
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
=======
    <div className="pageWrapper">
      <div className="mainContent">
        <Container className={styles.container}>
          <Form
            className={styles.loginForm}
            onSubmit={handleSubmit(onSubmit, onError)}
>>>>>>> b00edda6b8272a61ad516a065f4dfe9149a986af
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

            {/* Campo CPF */}
            <FloatingLabel id="fuserCpfInput" className="mb-3 mx-5" label="CPF">
              <Form.Control
                type="text"
                placeholder="000.000.000-00"
                isInvalid={!!errors.cpf}
                {...register("cpf", {
                  required: "Informe o CPF para efetuar o login",
                  minLength: {
                    value: 11,
                    message: "Necessário 11 dígitos",
                  },
                  maxLength: {
                    value: 11,
                    message: "Necessário 11 dígitos",
                  },
                })}
                onChange={(e) => {
                  const formatado = formatarCPF(e.target.value);
                  setValue("cpf", formatado);
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cpf?.message}
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
                  minLength: {
                    value: 8,
                    message: "A senha deve ter pelo menos 8 caracteres",
                  },
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
                  <Link to="/cadastro" className={styles.link}>
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
