import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import styles from "../../componentes/conta_perfil/conta_perfil.module.css";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useVerificadorDeCnpj } from "../../hooks/useApi.js";
import { useEndereco } from "../../hooks/useEndereco.js";
import { useAssistencia } from "../../hooks/useAssistencia.js";

const CadastroNovaAssistencia = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  if (userType !== "administrador") return navigate("/inicio");

  const userId = localStorage.getItem("userId");

  const { buscaEnderecoByZipCode } = useEndereco();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { verificador } = useVerificadorDeCnpj();
  const { cadastrarEndereco } = useEndereco();
  const { inserirAssistencia } = useAssistencia();

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
      const resBuscaEnderecoByZipCode = await buscaEnderecoByZipCode(zipCode);

      if (
        resBuscaEnderecoByZipCode.errors ||
        resBuscaEnderecoByZipCode.message
      ) {
        throw new Error();
      }

      setEndereco((prev) => ({
        ...prev,
        zipcode: zipCode,
        localidade: resBuscaEnderecoByZipCode.localidade,
        bairro: resBuscaEnderecoByZipCode.bairro,
        logradouro: resBuscaEnderecoByZipCode.logradouro,
        uf: resBuscaEnderecoByZipCode.uf,
      }));

      setInputFieldEnable(false);
    } catch {
      alert("CEP não encontrado. Insira os dados manualmente.");
      setInputFieldEnable(true);
    }
  };

  const onSubmit = async (data) => {
    if (!verificador(data.cnpj)) {
      alert("CNPJ inválido");
      return;
    }

    const dadosAssistencia = {
      assistenciaEmail: data.assistenciaEmail,
      nomeFantasia: data.nomeFantasia,
      razaoSocial: data.razaoSocial,
      cnpj: data.cnpj,
      assistenciaTelefone: data.assistenciaTelefone,
      assistenciaTermos: data.assistenciaTermos,
      administradorId: userId,
    };

    // cadastra assistencia
    const resCadastrarAssistencia = await inserirAssistencia(dadosAssistencia);

    if (resCadastrarAssistencia) {
      const dadosEnderecoAssitiencia = {
        zipcode: data.zipcode,
        localidade: data.localidade,
        bairro: data.bairro,
        logradouro: data.logradouro,
        uf: data.uf,
        number: data.number,
        complemento: data.complemento,
      };

      const isEnderecoCadastrado = await cadastrarEndereco(
        dadosEnderecoAssitiencia
      );
      if (isEnderecoCadastrado) {
        alert(`Nova assistencia, ${data.razaoSocial}, cadastrada`);
        location.reload();
      }
    }
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
