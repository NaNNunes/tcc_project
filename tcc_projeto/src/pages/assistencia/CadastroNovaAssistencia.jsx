import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import styles from "../../componentes/conta_perfil/conta_perfil.module.css";


import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useVerificadorDeCnpj,
  useAssistencia,
  useComparaDados,
} from "../../hooks/useApi";

const CadastroNovaAssistencia = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { verificador } = useVerificadorDeCnpj();

  const formatarCNPJ = (cnpj) => {
    const numeros = cnpj.replace(/\D/g, "").slice(0, 14);
    return numeros
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const onSubmit = (data) => {
    if (!verificador(data.cnpj)) {
      alert("CNPJ inválido");
      return;
    }

    if (!data.assistenciaTermos) {
      alert("Você deve aceitar os termos de uso");
      return;
    }

    console.log("Dados para salvar:", data);
    navigate("/cadastro-endereco");
  };

  const onError = (errors) => {
    console.log("Erros no formulário:", errors);
  };

  return (
    <div>
      <Form className="p-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <Container
          fluid
          className={styles.parteFormulario}
          style={{ marginBottom: "20px" }}
        >
          {/* Título centralizado */}
          <Row className="justify-content-center mb-4">
            <Col md="auto">
              <h3 className={styles.titleh3}>Cadastro de Assistência</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="assistenciaEmailInput"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder=""
                  {...register("assistenciaEmail", {
                    required: "O email é obrigatório",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Email inválido",
                    },
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
            <Col>
              <FloatingLabel
                controlId="nomeFantasiaInput"
                label="Nome Fantasia"
                className="mb-3"
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
            <Col>
              <FloatingLabel
                controlId="razaoSocialInput"
                label="Razão Social"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register("razaoSocial")}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel controlId="cnpjInput" label="CNPJ" className="mb-3">
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
                    required: "CNPJ obrigatório",
                    validate: (value) => {
                      const numeros = value.replace(/\D/g, "");
                      if (numeros.length !== 14)
                        return "CNPJ deve ter 14 dígitos";
                      if (!verificador(numeros)) return "CNPJ inválido";
                      return true;
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cnpj?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="assistenciaTelInput"
                label="Telefone"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="(00) 00000-0000"
                  {...register("assistenciaTelefone", {
                    required: "Telefone necessário",
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
          {/* Botão centralizado ao fim */}
          <Row className="mt-4 pb-4">
            <Col className="d-flex justify-content-center">
              <Button type="submit" size="lg" className={styles.botaoSalvar}>
                Salvar Assistência
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
    
  );
};

export default CadastroNovaAssistencia;
