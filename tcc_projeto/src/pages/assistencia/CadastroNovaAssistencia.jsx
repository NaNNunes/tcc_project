// Importação do react-bootstrap.
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// Importação dos estilos.
import stylesCad from "../../componentes/demanda/cadastro-demanda/CadastroDemanda.module.css";

// Importação do useState e useEffect.
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useComparaDados, useVerificadorDeCnpj } from "../../hooks/useApi.js";
import { useEndereco } from "../../hooks/useEndereco.js";
import { useAssistencia } from "../../hooks/useAssistencia.js";

const CadastroNovaAssistencia = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  if (userType !== "administrador") navigate("/inicio");

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
  const { inserirNovaAssistencia } = useAssistencia();
  const {
    verificaEmailDeAdms,
    verificaEmailDeSolicitantes,
    verificaEmailDeAssistencia,
    verificarTelefoneAdministradores,
    verificarTelefoneSolicitantes,
    verificarTelefoneAssistencia,
    verificarCnpj,
    verificarNomeFantasia,
    verificarRazaoSocial
  } = useComparaDados();

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

    // verifica cnpj
    if (!verificador(data.cnpj)) {
      alert("cnpj invalido");
      return false;
    }
    // verifica se email ja foi cadastrado por outrem

    const email = data.assistenciaEmail;
    const emailDeAdm = await verificaEmailDeAdms(email);
    const emailDeSolicitante = await verificaEmailDeSolicitantes(email);
    const emailDeAssistencia = await verificaEmailDeAssistencia(email)

    if (emailDeAdm || emailDeSolicitante || emailDeAssistencia) {
      return alert("Email em uso");
    }

    const telefone = data.assistenciaTelefone;
    
    const isTelefoneAdminstrador = await verificarTelefoneAdministradores(telefone);
    const isTelefoneSolicitante = await verificarTelefoneSolicitantes(telefone);
    const isTelefoneAssistencia = await verificarTelefoneAssistencia(telefone);

    if (isTelefoneAdminstrador || isTelefoneSolicitante || isTelefoneAssistencia) {
      return alert("telefone em uso");
    }

    const cnpj = data.cnpj;
    const isCnpjUtilizado = await verificarCnpj(cnpj);
    if (isCnpjUtilizado) {
      return alert("cnpj em uso");
    }

    const razaoSocial = data.razaoSocial
    const isRazaoSocial = await verificarRazaoSocial(razaoSocial);
    if (isRazaoSocial) {
      return alert("Razao Social em uso");
    }

    const nomeFantasia = data.nomeFantasia;
    const isNomeFantasia = await verificarNomeFantasia(nomeFantasia);
    if (isNomeFantasia) {
      return alert("Nome Fantasia em uso");
    }

    // cadastra assistencia
    const resCadastrarAssistencia = await inserirNovaAssistencia(data, userId);
    console.log("resCadastrarAssistencia:",resCadastrarAssistencia);

    if (resCadastrarAssistencia) {
      const dadosEnderecoAssitiencia = {
        "zipcode": data.zipcode,
        "localidade": data.localidade,
        "bairro": data.bairro,
        "logradouro": data.logradouro,
        "uf": data.uf,
        "number": data.number,
        "complemento": data.complemento,
      };

      const isEnderecoCadastrado = await cadastrarEndereco(dadosEnderecoAssitiencia);
      console.log("isEnderecoCadastrado",isEnderecoCadastrado);
      if (isEnderecoCadastrado) {
        alert(`Nova assistencia, ${data.razaoSocial}, cadastrada`);
        navigate("/buscar-assistencias/administrador");
      }
    }
  };

  const onError = (error) => {
    console.log("Erro no formulário:", error);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* Div para controlar o tamanho do Form. */}
      <div className={stylesCad.formulario}>  
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Container 
            fluid 
            className={stylesCad.parteFormulario} 
            style={{
              paddingBottom: '1.7rem', 
              marginBottom: '20px'
            }}
          >
            {/* Assistência */}
            <div>
              {/* Título do container */}
              <Row style={{paddingBottom: '1%'}}>
                <Col>
                  <h3 className={stylesCad.titleh3}>
                    Cadastro de Assistência
                  </h3>
                </Col>
              </Row>

              {/* Linha de e-mail */}
              <Row> 
                {/* Email */}
                <Col md={12} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="assistenciaEmailInput"
                    label="Email *"
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
                      <span className='error'>
                        {errors.assistenciaEmail.message}
                      </span>
                    )}
                  </FloatingLabel>
                </Col>
              </Row>
              
              {/* Linha de nome fantasia e razão social */}
              <Row>
                {/* Nome fantasia */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="nomeFantasiaInput"
                    label="Nome Fantasia"
                  >
                    <Form.Control type="text" {...register("nomeFantasia")}/>
                  </FloatingLabel>
                </Col>

                {/* Razão Social */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="razaoSocialInput"
                    label="Razão Social *"
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
                      {errors.razaoSocial && (
                        <span className='error'>
                          {errors.razaoSocial.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Linha com CNPJ e Telefone */}
              <Row>
                {/* CNPJ */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel 
                    controlId="cnpjInput" 
                    label="CNPJ *"
                  >
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
                      {errors.cnpj && (
                        <span className='error'>
                          {errors.cnpj.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                {/* Telefone */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="assistenciaTelInput"
                    label="Telefone *"
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
                      <span className='error'>
                        {errors.assistenciaTelefone.message}
                      </span>
                    )}
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            <hr style={{
              border: 'none', 
              borderTop: '2px solid #cacaca',
              margin: '10px 0',
              width: '100%',               
              opacity: '1',
              }}
            />
                  
            {/* Endereço */}
            <div>
              <Row style={{paddingBottom: '1%'}}>
                <Col>
                  <h3 className={stylesCad.titleh3}>Endereço</h3>
                </Col>
              </Row>

              {/* Linha com CEP, Cidade e Bairro */}
              <Row>
                {/* CEP */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="cepUserInput"
                    label="CEP *"
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
                      {errors.zipcode && (
                        <span className='error'>
                          {errors.zipcode.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                
                {/* Localidade */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="cityUserInput"
                    label="Cidade *"
                  >
                    <Form.Control
                      type="text"
                      disabled={!inputFieldEnable}
                      {...register("localidade")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.localidade && (
                        <span className='error'>
                          {errors.localidade.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="bairroUserInput"
                    label="Bairro *"
                  >
                    <Form.Control
                      type="text"
                      disabled={!inputFieldEnable}
                      {...register("bairro")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bairro && (
                        <span className='error'>
                          {errors.bairro.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
              
              {/* Linha com logradouro, UF e N° */}
              <Row>
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="logradouroUserInput"
                    label="Logradouro *"
                  >
                    <Form.Control
                      type="text"
                      disabled={!inputFieldEnable}
                      {...register("logradouro")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.logradouro && (
                        <span className='error'>
                          {errors.logradouro.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel 
                    controlId="ufUserInput" 
                    label="UF *"
                  >
                    <Form.Control
                      type="text"
                      disabled={!inputFieldEnable}
                      {...register("uf")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.uf && (
                        <span className='error'>
                          {errors.uf.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel 
                    id="userNumInput" 
                    label="Nº *"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      isInvalid={!!errors.number}
                      {...register("number", {
                        required: "Número é obrigatório",
                        minLength: {
                          value: 2,
                          message: "Digite pelo menos 2 dígitos",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Somente números",
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.number && (
                        <span className='error'>
                          {errors.number.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              <Row>
                <Col xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="complementoUserInput"
                    label="Complemento"
                  >
                    <Form.Control type="text" {...register("complemento")} />

                    <Form.Control.Feedback type="invalid">
                      {errors.complemento && (
                        <span className='error'>
                          {errors.complemento.message}
                        </span>
                      )}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  type='submit'
                  className={stylesCad.botaoSubmit}
                >
                  Salvar Assistência
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default CadastroNovaAssistencia;
