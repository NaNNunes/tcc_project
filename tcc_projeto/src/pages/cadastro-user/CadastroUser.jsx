
import {Card} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./cadastro.module.css";

import { verificadorCpf } from "../../functions/verificador_cpf";

const CadastroUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (!verificadorCpf(data.cpf)) {
      return false;
    }

    navigate("/pergunta-seguranca", { state: data });
  };

  const senha = watch("senha");
  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  // to do renan : chamar funcao para registro na api local

  //ta com erro de estrutura
  return (
    <Container>
      <Card className={styles.container}>
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
                Primeiro, queremos saber mais sobre você
              </h6>
              <hr className="mb-3 mx-5 text-white border-2" />
            </Col>
          </Row>
        </Row>
        <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <Row>
            {/* E-mail */}
            <Col>
              <FloatingLabel id="userEmailInput" className="mb-3" label="Email">
                <Form.Control
                  type="email"
                  placeholder=""
                  {...register("email")}
                />
              </FloatingLabel>
            </Col>
          </Row>
        
          {/* CPF e Telefone */}
          <Row className="">
            <Col>
              <FloatingLabel id="userCpfInput" className="mb-3" label="CPF">
                <Form.Control
                  type="text"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel id="userTelInput" className="mb-3" label="Telefone">
                <Form.Control
                  type="text"
                  placeholder="(00) 00000-0000"
                  {...register("telefone")}
                />
              </FloatingLabel>
            </Col>
          </Row>
          {/* Nome e Sobrenome */}
          <Row className="">
            <Col className="">
              <FloatingLabel id="userNomeInput" className="mb-3" label="Nome">
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  {...register("nome")}
                />
              </FloatingLabel>
            </Col>
            <Col className="">
              <FloatingLabel
                id="userSobrenomeInput"
                className="mb-3"
                label="Sobrenome"
              >
                <Form.Control
                  type="text"
                  placeholder="Sobrenome"
                  {...register("sobrenome")}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            {/* Senha */}
            <Col>
              <FloatingLabel id="userSenhaInput" className="mb-3" label="Senha">
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  isInvalid={!!errors.senha}
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
            </Col>
            <Col>
              <FloatingLabel
                id="userConfirmaSenhaInput"
                className="mb-3"
                label="Confirmar Senha"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirmar Senha"
                  isInvalid={!!errors.confirmarSenha}
                  {...register("confirmarSenha", {
                    required: "A confirmação de senha é obrigatória",
                    validate: (value) =>
                      value === senha || "As senhas não coincidem",
                  })}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="my-3">
            {/* Checkbox de termos de uso */}
            <Col sm={6}>
              <Form.Check
                className={styles.checkbox}
                type="checkbox"
                id="termsCheck"
                label="Li e aceito os termos de uso"
                value={true}
                {
                  ...register("termos",{
                    required:"Termos necessários"
                  })
                }
              />
            </Col>
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
          <Form.Group>
            <Form.Select as="select" aria-label {...register("categoriaUser")}>
              <option >Escolha seu nivel de user</option>
              <option value="1">Solicitante</option>
              <option value="2">ADM</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};

export default CadastroUser;
