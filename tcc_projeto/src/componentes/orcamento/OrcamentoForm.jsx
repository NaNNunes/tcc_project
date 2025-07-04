// Importação do react-boostrap.
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";

// Importação do useForm para mexer com o formulário.
import { useForm } from "react-hook-form";

// Importação do estilo.
import stylesCad from "../demanda/cadastro-demanda/CadastroDemanda.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAssistencia } from "../../hooks/useAssistencia.js";
import { useDemanda } from "../../hooks/useDemanda.js";
import { useUser } from "../../hooks/useUser.js";

const OrcamentoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const {
    buscaDemandaById,
    buscaDemandaVinculadaAssistencia,
    buscaDispositivoById,
    buscaDispositivoDeDemandaDaAt,
    inserirOrcamento,
  } = useDemanda();

  const {
    buscaUserById
  } = useUser();

  const { buscaAssistenciasDoAdministrador } = useAssistencia();
  const { idDemanda } = useParams();
  const userId = localStorage.getItem("userId");

  // state de demandas em atendimento vinculadas a assistencia
  const [demandaSelecionada, setDemandaSelecionada] = useState({});
  const [dispositivoDemandaSelecionada, setDispositivoDemandaSelecionada] =
    useState({});
  const [demandasEmAtendimento, setDemandasEmAtendimento] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        buscaDadosDeDemanda(idDemanda);
        // busca assistencias do user
        const resBuscaAssistenciasDoAdm =
          await buscaAssistenciasDoAdministrador(userId);

        // busca demandas vinculadas as assistencias
        const resBuscaDemandas = await buscaDemandaVinculadaAssistencia(
          resBuscaAssistenciasDoAdm
        );
        setDemandasEmAtendimento(resBuscaDemandas);

        const resBuscaDispositivosDeDemandasDaAt =
          await buscaDispositivoDeDemandaDaAt(resBuscaDemandas);
        setDispositivos(resBuscaDispositivosDeDemandasDaAt);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  // quando uma outra demanda selecionada
  const buscaDadosDeDemanda = async (id) => {
    // busca demanda por id
    const resBuscaDemanda = await buscaDemandaById(id);
    setDemandaSelecionada(resBuscaDemanda);
    // busca dispositivo dad demanda
    const idDispositivoDemandaSelecionada = resBuscaDemanda.idDispositivo;
    const resBuscaDispositivosDemanda = await buscaDispositivoById(
      idDispositivoDemandaSelecionada
    );
    setDispositivoDemandaSelecionada(resBuscaDispositivosDemanda);
  };

  const onSubmit = async (dados) => {

    const idDemanda = demandaSelecionada.id;
    const idSolicitante = demandaSelecionada.idSolicitante
    const solicitante = await buscaUserById("solicitante",idSolicitante);
    const isCliente = solicitante.idAssistencia !== undefined;

    const isOrcamentoInserido = await inserirOrcamento( dados, idDemanda, isCliente);
    if (isOrcamentoInserido) {
      alert("Orçamento inserido");
      navigate("/procurar-demandas/aceitas");
    }
  };

  const onError = (errors) => {
    console.log("Erros: ", errors);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className={stylesCad.formulario}>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Container
            fluid
            className={stylesCad.parteFormulario}
            style={{
              paddingBottom: "1.7rem",
              marginBottom: "20px",
            }}
          >
            <div>
              {/* Titulo Escolha uma demanda. */}
              <Row>
                <Col md={12} xs={12}>
                  <h3
                    className={stylesCad.titleh3}
                    style={{ marginBottom: "5px" }}
                  >
                    Escolha uma demanda
                  </h3>
                </Col>
              </Row>

              {/* Frase explicando para escolher uma demanda. */}
              <Row>
                <Col>
                  <p className="paragrafo">
                    Escolha uma das demandas listadas abaixo para que seja
                    possível gerar o orçamento referente à mesma.
                  </p>
                </Col>
              </Row>

              {/* Select das demandas. */}
              <Row>
                <Col
                  md={4}
                  xs={12}
                  className={stylesCad.campo}
                  style={{ paddingBottom: "0px" }}
                >
                  <FloatingLabel controlId="DemandaSelect" label="Demanda">
                    <Form.Select
                      onChange={(e) => {
                        setTimeout(() => {
                          location.reload();
                        }, 0.1);
                        navigate(`/orcamento/${e.target.value}`);
                      }}
                    >
                      {
                        // mostra demanda passada na url como selecionada
                        <option value={idDemanda} selected>
                          {dispositivoDemandaSelecionada.modelo}
                        </option>
                      }
                      {
                        // mostra outras demandas vinculados a ats que seja diferentes da demanda selecionada
                        demandasEmAtendimento.map((demanda) =>
                          dispositivos.map(
                            (dispositivo) =>
                              demanda.id != idDemanda &&
                              demanda.status === "Em atendimento" &&
                              dispositivo.id === demanda.idDispositivo && (
                                <option key={demanda.id} value={demanda.id}>
                                  {dispositivo.modelo}
                                </option>
                              )
                          )
                        )
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            {/* Divisão */}
            <hr
              style={{
                border: "none",
                borderTop: "2px solid #cacaca",
                margin: "30px 0",
                width: "100%",
                opacity: "1",
              }}
            />

            <div>
              {/* Titulo Informações da demanda. */}
              <Row style={{ paddingBottom: "1%" }}>
                <Col md={12} xs={12}>
                  <h3 className={stylesCad.titleh3}>Informações da demanda</h3>
                </Col>
              </Row>

              {/* Linha com categoria, marca, fabricante e modelo. */}
              <Row>
                {/* Categoria. */}
                <Col xl={3} lg={4} md={6} xs={12}>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Categoria: </strong>
                    {dispositivoDemandaSelecionada.categoria}
                  </span>
                </Col>

                {/* Marca. */}
                <Col xl={3} lg={4} md={6} xs={12}>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Marca: </strong>
                    {dispositivoDemandaSelecionada.marca}
                  </span>
                </Col>

                {/* Fabricante. */}
                <Col xl={3} lg={4} md={6} xs={12}>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Fabricante: </strong>
                    {dispositivoDemandaSelecionada.fabricante}
                  </span>
                </Col>

                {/* Modelo. */}
                <Col xl={3} lg={4} md={6} xs={12}>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Modelo: </strong>
                    {dispositivoDemandaSelecionada.modelo}
                  </span>
                </Col>
              </Row>

              {/* Linha com tensão, amperagem e cor. */}
              <Row>
                {/* Tensão. */}
                <Col xl={3} lg={4} md={6} xs={12}>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Tensão: </strong>
                    {dispositivoDemandaSelecionada.tensao}
                  </span>
                </Col>

                {/* Amperagem. */}
                <Col xl={3} lg={4} md={6} xs={12}>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Amperagem: </strong>
                    {dispositivoDemandaSelecionada.amperagem}
                  </span>
                </Col>

                {/* Cor. */}
                <Col xl={3} lg={4} md={6} xs={12}>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Cor: </strong>
                    {dispositivoDemandaSelecionada.cor}
                  </span>
                </Col>
              </Row>

              {/* Linha com descrição do problema. */}
              <Row>
                <Col>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Descrição do problema: </strong>
                    {demandaSelecionada.descProblema}
                  </span>
                </Col>
              </Row>

              {/* Linha observações. */}
              <Row>
                <Col>
                  <span
                    style={{
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word',
                      fontWeight: 'bold',
                      color: '#757575'
                    }}
                  >
                    <strong style={{color: '#000000', fontWeight: 'bold'}}>Observações: </strong>
                    {demandaSelecionada.observacoes}
                  </span>
                </Col>
              </Row>
            </div>

            {/* Divisão */}
            <hr
              style={{
                border: "none",
                borderTop: "2px solid #cacaca",
                margin: "30px 0",
                width: "100%",
                opacity: "1",
              }}
            />

            <div>
              {/* Titulo Orçamento da demanda */}
              <Row style={{ paddingBottom: "1%" }}>
                <Col md={12} xs={12}>
                  <h3 className={stylesCad.titleh3}>Orçamento da demanda</h3>
                </Col>
              </Row>

              {/* Linha problema identificado e possivel solução */}
              <Row>
                {/* Problema identificado */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="ProblemaIdentificadoInput"
                    label="Problema identificado"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px", resize: "none" }}
                      isInvalid={!!errors.problema_identificado}
                      {...register("problema_identificado", {
                        required: "O problema identificado é obrigatório.",
                      })}
                    />
                  </FloatingLabel>
                  {errors.problema_identificado && (
                    <span className="error">
                      {errors.problema_identificado.message}
                    </span>
                  )}
                </Col>

                {/* Possivel solução */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="PossivelSolucaoInput"
                    label="Possível solução"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px", resize: "none" }}
                      isInvalid={!!errors.solucao}
                      {...register("solucao", {
                        required: "A solução é obrigatória.",
                      })}
                    />
                  </FloatingLabel>
                  {errors.solucao && (
                    <span className="error">{errors.solucao.message}</span>
                  )}
                </Col>
              </Row>

              {/* Linha peça a ser trocada, valor da mão de obra e observações */}
              <Row>
                {/* Peça a ser trocada */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="PecaTrocadaInput"
                    label="Peça a ser trocada"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      isInvalid={!!errors.pecaTrocada}
                      {...register("pecaTrocada", {
                        required: "A peça a ser trocada é obrigatória.",
                      })}
                    />
                    {errors.pecaTrocada && (
                      <span className="error">
                        {errors.pecaTrocada.message}
                      </span>
                    )}
                  </FloatingLabel>
                </Col>

                {/* Valor da mão de obra */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="ValorObraInput"
                    label="Valor da mão de obra"
                  >
                    <Form.Control
                      type="text"
                      placeholder="R$ 0,00"
                      isInvalid={!!errors.valorObra}
                      {...register("valorObra", {
                        required: "O valor da mão de obra é obrigatório.",
                        validate: (value) => {
                          const valorNumerico = parseFloat(
                            value.replace("R$", "").replace(/\./g, "").replace(",", ".")
                          );

                          if (isNaN(valorNumerico) || valorNumerico <= 0) {
                            return "Digite um valor válido. Ex: R$ 99,00";
                          }

                          return true;
                        },
                        onChange: (e) => {
                          let value = e.target.value;

                          // Remove tudo que não for número
                          value = value.replace(/\D/g, "");

                          // Se estiver vazio, preenche com "0"
                          if (value === "") {
                            e.target.value = "R$ 0,00";
                            return;
                          }

                          // Converte para centavos
                          const numericValue = parseInt(value, 10);
                          const formatted = (numericValue / 100).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                              minimumFractionDigits: 2,
                            }
                          );

                          e.target.value = formatted;
                        },
                      })}
                    />
                    {errors.valorObra && (
                      <p className={stylesCad.error}>{errors.valorObra.message}</p>
                    )}
                  </FloatingLabel>
                </Col>

                {/* Observações */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="observacoesOrcamentoInput"
                    label="Observações"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      {...register("observacoesOrcamento")}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            <div>
              {/* Botão para prosseguir*/}
              <Row>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    as="input"
                    value="Avançar"
                    type="submit"
                    className={stylesCad.botaoSubmit}
                  />
                </Col>
              </Row>
            </div>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default OrcamentoForm;
