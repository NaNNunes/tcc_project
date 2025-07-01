import styles from "./cadastro.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useVerificadorDeCnpj, useComparaDados } from "../../hooks/useApi";

import { useAssistencia } from "../../hooks/useAssistencia.js";

const CadastroAssistencia = () => {
  const navigate = useNavigate();

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


  const { inserirAssistencia } = useAssistencia();
  const { verificador } = useVerificadorDeCnpj();
  const {
    verificaEmailDeAdms,
    verificaEmailDeSolicitantes,
    verificaEmailDeAssistencia,
  } = useComparaDados();

  const onSubmit = (data) => {
    // verifica cnpj
    if (!verificador(data.cnpj)) {
      alert("cnpj invalido");
      return false;
    }

    // verifica se email ja foi cadastrado por outrem
    const emailDeAdm = verificaEmailDeAdms(data.assistenciaEmail);
    const emailDeSolicitante = verificaEmailDeSolicitantes(
      data.assistenciaEmail
    );
    const emailDeAssistencia = verificaEmailDeAssistencia(
      data.assistenciaEmail
    );

    if (emailDeAdm || emailDeSolicitante || emailDeAssistencia) {
      alert("Email em uso");
      return false;
    }

    inserirAssistencia(data);

    navigate("/cadastro-endereco");
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  const formatarCNPJ = (cnpj) => {
    const numeros = cnpj.replace(/\D/g, "").slice(0, 14);
    return numeros
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  return (
    <Container className={styles.containerAssistencia}>
      {/* Parte de cima */}

      <Row className="mb-3">
        <Col>
          <Image
            className={styles.Image}
            src="/logos/connectfix_logo.svg"
            fluid
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <div className="d-flex align-items-center justify-content-center">
          <h5 className="text-white">Informe-nos sobre sua Assistência</h5>
        </div>
        <hr className={styles.dividerLine} />
      </Row>

      <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          {/* E-mail */}
          <Col>
            <FloatingLabel
              id="assistenciaEmailInput"
              className="mb-3"
              label="Email"
            >
              <Form.Control
                type="email"
                placeholder=""
                isInvalid={!!errors.assistenciaEmail}
                {...register("assistenciaEmail", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Email inválido",
                  },
                  validate: (value) => value.includes("@") || "Email inválido",
                })}
              />
              {errors.assistenciaEmail && (
                <p className={styles.error}>
                  {errors.assistenciaEmail.message}
                </p>
              )}
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          {/* Nome fantasia */}
          <Col>
            <FloatingLabel
              id="nomeFantasiaInput"
              className="mb-3"
              label="Nome Fantasia"
            >
              <Form.Control
                type="text"
                placeholder=""
                {...register("nomeFantasia")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        {/* Razão Social */}
        <Row>
          <Col>
            <FloatingLabel
              controlId="razaoSocialInput"
              label="Razão Social"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder=""
                isInvalid={!!errors.razaoSocial}
                {...register("razaoSocial", {
                  required: "Razão Social é obrigatória",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.razaoSocial?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="">
          {/* Cnpj 
            fazer a contensao de inserçao indevida e auto preenchimento
          */}
          <Col>
            <FloatingLabel id="CnpjInput" className="mb-3" label="CNPJ">
              <Form.Control
                type="text"
                placeholder="00.000.000/0000-00"
                value={formatarCNPJ(watch("cnpj") || "")}
                isInvalid={!!errors.cnpj}
                onChange={(e) => {
                  const apenasNumeros = e.target.value.replace(/\D/g, "");
                  if (apenasNumeros.length <= 14) {
                    setValue("cnpj", apenasNumeros);
                  }
                }}
                {...register("cnpj", {
                  required: "CNPJ é obrigatório",
                  validate: (value) => {
                    const somenteNumeros = value.replace(/\D/g, "");
                    if (somenteNumeros.length !== 14) {
                      return "Necessário 14 dígitos";
                    }
                    if (!verificador(somenteNumeros)) {
                      return "CNPJ inválido";
                    }
                    return true;
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cnpj?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          {/* Telefone */}
          <Col>
            <FloatingLabel
              controlId="assistenciaTelInput"
              label="Telefone"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="(00) 00000-0000"
                isInvalid={!!errors.assistenciaTelefone}
                {...register("assistenciaTelefone", {
                  required: "Telefone é obrigatório",
                  pattern: {
                    value:
                      /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9?\d{4})[-.\s]?(\d{4})$/,
                    message: "Telefone inválido",
                  },
                })}
              />
              {errors.assistenciaTelefone && (
                <p className={styles.error}>
                  {errors.assistenciaTelefone.message}
                </p>
              )}
            </FloatingLabel>
          </Col>
        </Row>

        {/* termos 2 sobre assistência */}
        <Form.Check
          className={styles.checkbox}
          type="checkbox"
          id="termsCheck"
          value={true}
          isInvalid={!!errors.termos}
          {...register("assistenciaTermos", {
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

        <Row>
          <Col className="d-flex align-items-center justify-content-center m-3">
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
    </Container>
  );
};

export default CadastroAssistencia;
