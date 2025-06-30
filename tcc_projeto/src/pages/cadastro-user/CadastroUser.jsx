//styles
import styles from "./cadastro.module.css";

//react bootstrap componentes
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

//navegação by router dom
import { Link, useNavigate } from "react-router-dom";

//hooks
import { useForm } from "react-hook-form";

import { useVerificadorDeCpf, useComparaDados } from "../../hooks/useApi.js";

import { useUser } from "../../hooks/useUser.js";

const CadastroUser = () => {
  const navigate = useNavigate();
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const userType = localStorage.getItem("userType");
  if(userType !== "Visitante" && userType !== null ){
    navigate("/inicio");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { cadastrarInfosUser } = useUser();
  const { verificador } = useVerificadorDeCpf();

  const {
    verificaCpfDeSolicitantes,
    verificaCpfDeAdms,
    verificaEmailDeAdms,
    verificaEmailDeSolicitantes,
    verificaEmailDeAssistencia,
  } = useComparaDados();

  const senha = watch("senha");

  const onSubmit = async (data) => {
    if (tipoUsuario !== "solicitante" && tipoUsuario !== "administrador") {
      alert("Defina um tipo de user");
      return ;
    }

    // verificar se cpf ja foi cadastrado por outrem
    const cpfDeSolicitante = verificaCpfDeSolicitantes(data.cpf);
    const cpfDeAdm = verificaCpfDeAdms(data.cep);
    // caso adm ou solicitante não seja undefined
    if (cpfDeSolicitante || cpfDeAdm) {
      alert("CPF já utilizado ");
      return ;
    }

    // verifica se email ja foi cadastrado por outrem
    const emailDeAdm = verificaEmailDeAdms(data.email);
    const emailDeSolicitante = verificaEmailDeSolicitantes(data.email);
    const emailDeAssistencia = verificaEmailDeAssistencia(data.email);

    // caso adm ou solicitante ou assistencia não seja undefined 2
    if (emailDeAdm || emailDeSolicitante || emailDeAssistencia) {
      alert("Email em uso");
      return;
    }

    // cadastra user
    const isCadastrado = await cadastrarInfosUser(data, tipoUsuario);
    if(isCadastrado){
      navigate("/pergunta-seguranca");
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
    <Container>
      <Card className={styles.container}>
        {/* Parte de cima */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-center">
            <Image
              className={styles.Image}
              src="/logos/connectfix_logo.svg"
              fluid
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <h5 className="text-white text-center">
              Primeiro, queremos saber mais sobre você
            </h5>
            <hr className={styles.dividerLine} />
          </Col>
        </Row>

        {/* Formulario */}
        <Form
          action="/user/cadastrar"
          method="POST"
          className="px-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          {/* E-mail */}
          <Row>
            <Col>
              <FloatingLabel id="userEmailInput" className="mb-3" label="Email">
                <Form.Control
                  name="email"
                  size="sm"
                  type="email"
                  placeholder=""
                  isInvalid={!!errors.email}
                  {...register("email", {
                    required: "O email é obrigatório",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Email inválido",
                    },
                    validate: (value) =>
                      value.includes("@") || "Email inválido",
                  })}
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email.message}</p>
                )}
              </FloatingLabel>
            </Col>
          </Row>

          {/* cpf e tel */}
          <Row>
            {/* CPF */}
            <Col>
              <FloatingLabel id="userCpfInput" className="mb-3" label="CPF">
                <Form.Control
                  type="text"
                  placeholder="000.000.000-00"
                  value={formatarCPF(watch("cpf") || "")}
                  isInvalid={!!errors.cpf}
                  onChange={(e) => {
                    const apenasNumeros = e.target.value.replace(/\D/g, "");
                    if (apenasNumeros.length <= 11) {
                      setValue("cpf", apenasNumeros);
                    }
                  }}
                  {...register("cpf", {
                    required: "CPF necessário",
                    validate: (value) => {
                      const cpfNumeros = value.replace(/\D/g, "");
                      if (cpfNumeros.length !== 11)
                        return "Necessário 11 dígitos";
                      if (!verificador(cpfNumeros)) return "CPF inválido";
                      return true;
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cpf?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* Telefone */}
            <Col>
              <FloatingLabel
                id="userTelInput"
                className="mb-3"
                label="Telefone"
              >
                <Form.Control
                  type="text"
                  placeholder="(00) 00000-0000"
                  isInvalid={!!errors.userTelefone}
                  {...register("userTelefone", {
                    required: "Telefone necessário",
                    pattern: {
                      value:
                        /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9?\d{4})[-.\s]?(\d{4})$/,
                      message: "Telefone inválido",
                    },
                  })}
                />
                {errors.userTelefone && (
                  <p className={styles.error}>{errors.userTelefone.message}</p>
                )}
              </FloatingLabel>
            </Col>
          </Row>

          {/* Nome e Sobrenome */}
          <Row>
            {/* nome */}
            <Col className="">
              <FloatingLabel id="userNomeInput" className="mb-3" label="Nome">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  isInvalid={!!errors.nome}
                  {...register("nome", {
                    required: "O nome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "O nome deve ter pelo menos 2 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message: "O nome deve ter ate 20 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
                      message: "O nome só pode conter letras e espaços",
                    },
                  })}
                />
                {errors.nome && (
                  <p className={styles.error}>{errors.nome.message}</p>
                )}
              </FloatingLabel>
            </Col>

            {/* sobrenome */}
            <Col className="">
              <FloatingLabel
                id="userSobrenomeInput"
                className="mb-3"
                label="Sobrenome"
              >
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder=""
                  isInvalid={!!errors.sobrenome}
                  {...register("sobrenome", {
                    required: "O sobrenome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "O sobrenome deve ter pelo menos 2 caracteres",
                    },
                    maxLength: {
                      value: 20,
                      message: "O sobrenome deve ter ate 20 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
                      message: "O sobrenome só pode conter letras e espaços",
                    },
                  })}
                />
                {errors.sobrenome && (
                  <p className={styles.error}>{errors.sobrenome.message}</p>
                )}
              </FloatingLabel>
            </Col>
          </Row>

          {/* senha e confirmar senha */}
          <Row>
            {/* Senha */}
            <Col md={6}>
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
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "A senha deve conter maiúsculas, minúsculas, números e caracteres especiais",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.senha?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* Confirmação */}
            <Col md={6}>
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
                      value === watch("senha") || "As senhas não coincidem",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmarSenha?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>

          {/* checkbox */}
          <Form.Check
            className={styles.checkbox}
            type="checkbox"
            id="termsCheck"
            value={true}
            isInvalid={!!errors.termos}
            {...register("termos", {
              required: "Termos necessários",
            })}
            label={
              <>
                Li e aceito os{" "}
                <Link
                  to="/termos-de-uso"
                  className={styles.link}
                  style={{ fontSize: "13px" }}
                >
                  termos de uso
                </Link>
              </>
            }
          />

          {/* Botão */}
          <Row>
            <Col className="d-flex align-items-center justify-content-center mt-3 mb-3">
              <Button
                as="input"
                value="Avançar"
                type="submit"
                size="lg"
                className={`${styles.Button}`}
              />
            </Col>
          </Row>

          <hr className={styles.dividerLine} />

          {/* tem conta? */}
          <Row className="mt-3">
            <Col className="d-flex align-items-center justify-content-center">
              <h6 className="text-white">
                Já possui conta?{" "}
                <Link
                  to="/login"
                  className={styles.link}
                  style={{ fontSize: "16px" }}
                >
                  Login
                </Link>
              </h6>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default CadastroUser;
