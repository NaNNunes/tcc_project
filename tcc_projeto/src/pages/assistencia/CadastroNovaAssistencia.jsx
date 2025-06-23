import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import styles from "../../componentes/conta_perfil/conta_perfil.module.css";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useVerificadorDeCnpj, useEndereco } from "../../hooks/useApi";

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
  const { cadastrarEndereco, atualizarEndereco } = useEndereco();

  // Estado para o endereço
  const [endereco, setEndereco] = useState({
    zipcode: "",
    localidade: "",
    bairro: "",
    logradouro: "",
    uf: "",
    number: "",
    complemento: "",
  });

  // Preenche campos ao carregar endereço
  useEffect(() => {
    for (const [key, value] of Object.entries(endereco)) {
      setValue(key, value);
    }
  }, [endereco, setValue]);

  const [inputFieldEnable, setInputFieldEnable] = useState(true);

  const formatarCNPJ = (cnpj) => {
    const numeros = cnpj.replace(/\D/g, "").slice(0, 14);
    return numeros
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handleZipCodeBlur = async (e) => {
    const zipCode = e.target.value.replace(/\D/g, "");

    if (zipCode.length !== 8) {
      alert("CEP deve conter exatamente 8 números.");
      setInputFieldEnable(true);
      setEndereco((prev) => ({
        ...prev,
        zipcode: zipCode,
        localidade: "",
        bairro: "",
        logradouro: "",
        uf: "",
      }));
      return;
    }

    try {
      const request = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${zipCode}`
      );
      const response = await request.json();

      if (response.errors || response.message) {
        throw new Error();
      }

      setEndereco((prev) => ({
        ...prev,
        zipcode: zipCode,
        localidade: response.city || response.localidade,
        bairro: response.neighborhood || response.bairro,
        logradouro: response.street || response.logradouro,
        uf: response.state || response.uf,
      }));

      setInputFieldEnable(false);
    } catch {
      alert("CEP não encontrado. Insira os dados manualmente.");
      setInputFieldEnable(true);
    }
  };

  const onSubmit = (data) => {
    if (!verificador(data.cnpj)) {
      alert("CNPJ inválido");
      return;
    }

    if (data.zipcode === endereco.zipcode) {
      cadastrarEndereco(data);
    } else {
      atualizarEndereco(endereco.id, data);
    }

    console.log("Dados para salvar:", data);
    navigate("/cadastro-endereco");
  };

  const onError = (error) => {
    console.log("Erro no formulário:", error);
  };

  return (
    <Form className="p-4" onSubmit={handleSubmit(onSubmit, onError)}>
      <Container fluid className={styles.parteFormulario}>
        <Row className="justify-content-center mb-4">
          <Col md="auto">
            <h3 className={styles.titleh3}>Cadastro de Assistência</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* Email */}
            <FloatingLabel
              controlId="assistenciaEmailInput"
              label="Email"
              className="mb-3"
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
        {/* Nome Fantasia */}
        <Row>
          <Col>
            <FloatingLabel
              controlId="nomeFantasiaInput"
              label="Nome Fantasia"
              className="mb-3"
            >
              <Form.Control type="text" {...register("nomeFantasia")} />
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

        {/* CNPJ */}
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
                  required: "CNPJ é obrigatório",
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

        {/* Endereço */}
        <Row className="pt-3">
          <Col md={12}>
            <h4 className={styles.titleh3}>Endereço</h4>
          </Col>
        </Row>

        {/* CEP */}
        <Row>
          <Col>
            <FloatingLabel
              controlId="cepUserInput"
              label="CEP"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="00000-000"
                maxLength={9}
                isInvalid={!!errors.zipcode}
                {...register("zipcode", {
                  required: "CEP é obrigatório",
                  validate: (value) => {
                    const numeros = value.replace(/\D/g, "");
                    if (numeros.length !== 8)
                      return "CEP deve conter 8 dígitos numéricos";
                    return true;
                  },
                  onBlur: handleZipCodeBlur,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.zipcode?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="cityUserInput"
              label="Cidade"
              className="mb-3"
            >
              <Form.Control
                type="text"
                disabled={!inputFieldEnable}
                {...register("localidade")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="bairroUserInput"
              label="Bairro"
              className="mb-3"
            >
              <Form.Control
                type="text"
                disabled={!inputFieldEnable}
                {...register("bairro")}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel
              controlId="logradouroUserInput"
              label="Logradouro"
              className="mb-3"
            >
              <Form.Control
                type="text"
                disabled={!inputFieldEnable}
                {...register("logradouro")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="ufUserInput" label="UF" className="mb-3">
              <Form.Control
                type="text"
                disabled={!inputFieldEnable}
                {...register("uf")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="numResidUserInput"
              label="Nº"
              className="mb-3"
            >
              <Form.Control type="text" {...register("number")} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel
              controlId="complementoUserInput"
              label="Complemento"
              className="mb-3"
            >
              <Form.Control type="text" {...register("complemento")} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mt-4 pb-4">
          <Col className="d-flex justify-content-center">
            <Button type="submit" size="lg" className={styles.botaoSalvar}>
              Salvar Assistência
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default CadastroNovaAssistencia;
