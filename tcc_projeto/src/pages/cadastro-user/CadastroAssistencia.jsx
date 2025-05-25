// styles
import styles from "./cadastro.module.css";

// import react-bootstrap componentes
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

// router
import { Link, useNavigate } from "react-router-dom";

// hooks
import { useForm } from "react-hook-form";
import { useVerificadorDeCnpj, useCadastroAssistencia} from "../../hooks/useApi";

const CadastroAssistencia = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  
  const {inserirAssistencia} = useCadastroAssistencia();
  const {verificador} = useVerificadorDeCnpj();

  const onSubmit = (data) => {

    // verifica cnpj
    if (!(verificador(data.cnpj))) {
      alert("cnpj invalido")
      return false;
    }

    inserirAssistencia(data);

    navigate("/cadastro-endereco");
  };

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  return (
    <Container className={styles.containerAssistencia}>
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
        <div className="d-flex align-items-center justify-content-center">
          <h5 className="text-white">Informe-nos sobre sua Assistência</h5>
        </div>
        <hr className="mb-3 mx-auto text-white border-2 w-75" />
      </Row>

      <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          {/* E-mail */}
          <Col>
            <FloatingLabel id="assistenciaEmailInput" className="mb-3" label="Email">
              <Form.Control
                type="email"
                placeholder=""
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
                <p className={styles.error}>{errors.assistenciaEmail.message}</p>
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

        <Row>
          {/* Razão social */}
          <Col>
            <FloatingLabel
              id="RazaoSocialInput"
              className="mb-3"
              label="Razão Social"
            >
              <Form.Control
                type="text"
                placeholder=""
                {...register("razaoSocial")}
              />
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
                {...register("cnpj", {
                  required: "CNPJ obrigatório",
                  maxLength: {
                    value: 14,
                    message: "Necessário 14 digitos"
                  },
                  minLength: {
                    value: 14,
                    message: "Necessário 14 digitos"
                  },
                  //regex para numeros
                })}
              />
            </FloatingLabel>
          </Col>

          {/* telefone */}
          <Col>
            <FloatingLabel id="assistenciaTelInput" className="mb-3" label="Telefone">
              <Form.Control
                type="text"
                placeholder="(00) 00000-0000"
                {...register("assistenciaTelefone", {
                  required: "Telefone necessário",
                  pattern: {
                    value: /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9?\d{4})[-.\s]?(\d{4})$/,
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
          <Col className="d-flex align-items-center justify-content-center mt-3">
            <Button
              as="input"
              value="Avançar"
              type="submit"
              size="lg"
              className={`${styles.Button}`}
            />
          </Col>
        </Row>

        <hr className="mb-3 mx-5 text-white border-2" />

        <Row className="mt-3">
          <Col className="d-flex align-items-center justify-content-center mb-2">
            <h6 className="text-white">
              Já possui conta?{" "}
              <Link to="/login" className={styles.link} style={{ fontSize: "16px" }}>
                Login
              </Link>
            </h6>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CadastroAssistencia;
