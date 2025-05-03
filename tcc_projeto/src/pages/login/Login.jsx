import { Row, Col, Button, Form, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./login.module.css";


const Login = () => {
  return (
    
    <Container className={styles.container}>
      <Col>
        <Form className={styles.loginForm}>
          <Image
            className={styles.Image}
            src="/logos/connectfix_logo.svg"
            fluid
          />

          <h6 className="text-white">Confiança que gera conexões</h6>
          <hr className="mb-4 mx-5 text-white border-2" />

          <Form.Floating className="mb-3 mx-5">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="000.000.000-00"
            />
            <label htmlFor="floatingInputCustom">CPF</label>
          </Form.Floating>

          <Form.Floating className="mb-3 mx-5">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPasswordCustom">Senha</label>
          </Form.Floating>

          <div className={styles.ancor}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Esqueceu a senha?
            </a>
          </div>

          <div className="d-grid gap-2">
            <Button
              as="input"
              value="Login"
              type="button"
              size="lg"
              className={styles.Button}
            />
            <hr className="mb-1 mx-5 text-white border-2" />

            <h6 className="text-white">Ainda não se registrou?
              <Link
                to="/cadastro"
                className={styles.link}
              >
                Siga por aqui.
              </Link>
            </h6>
            
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
