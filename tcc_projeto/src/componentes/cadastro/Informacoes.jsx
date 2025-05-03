import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import styles from "./informacoes.module.css";

const Informacoes = () => {
  return (
    <Container className={styles.container}>
      <Col>
        <Form className={styles.registerForm}>
          <Image
            className={styles.Image}
            src="/logos/connectfix_logo.svg"
            fluid
          />

          <h6 className="text-white">
            Primeiro, queremos saber mais sobre você
          </h6>
          <hr className="mb-3 mx-5 text-white border-2" />

          {/* E-mail */}
          <Form.Floating className="mb-3 mx-5">
            <Form.Control
              id="floatingInputCustom"
              type="email"
              placeholder="nome@email.com"
            />
            <label htmlFor="floatingInputCustom">E-mail</label>
          </Form.Floating>

          {/* CPF e Telefone */}
          <div className={styles.inputRow}>
            <Form.Floating>
              <Form.Control
                id="floatingCpf"
                type="text"
                placeholder="000.000.000-00"
              />
              <label htmlFor="floatingCpf">CPF</label>
            </Form.Floating>

            <Form.Floating>
              <Form.Control
                id="floatingTelefone"
                type="text"
                placeholder="(00) 00000-0000"
              />
              <label htmlFor="floatingTelefone">Telefone</label>
            </Form.Floating>
          </div>

          {/* Nome e Sobrenome */}
          <div className={styles.inputRow}>
            <Form.Floating>
              <Form.Control
                id="floatingNome"
                type="text"
                placeholder="Seu nome"
              />
              <label htmlFor="floatingNome">Nome</label>
            </Form.Floating>

            <Form.Floating>
              <Form.Control
                id="floatingSobrenome"
                type="text"
                placeholder="Seu sobrenome"
              />
              <label htmlFor="floatingSobrenome">Sobrenome</label>
            </Form.Floating>
          </div>

          {/* Senha */}
          <Form.Floating className="mb-3 mx-5">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPasswordCustom">Senha</label>
          </Form.Floating>

          <Form.Floating className="mb-3 mx-5">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPasswordCustom">Confirmar Senha</label>
          </Form.Floating>

          {/* Checkbox de termos de uso */}
          <Form.Check
            className={styles.checkbox}
            type="checkbox"
            id="termsCheck"
            label="Li e aceito os termos de uso"
          />

          <div className="d-grid gap-2">
            <Button
              as="input"
              value="Avançar"
              type="button"
              size="lg"
              className={styles.Button}
            />

            <hr className="mb-1 mx-5 text-white border-2" />
            <h6 className="text-white">
              Já possui conta?{" "}
              <a
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Faça login aqui
              </a>
            </h6>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default Informacoes;
