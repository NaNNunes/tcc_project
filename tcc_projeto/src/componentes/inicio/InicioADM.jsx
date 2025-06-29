// importação de componentes do react-bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "./inicio.module.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineTimelapse } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { LuClipboardCopy } from "react-icons/lu";

const tipoUser = localStorage.getItem("userType");
const perfilUsuario =
  tipoUser !== "Visitante" && localStorage.getItem("userType");

const InicioADM = () => {
  const navigate = useNavigate();

  // verifica se user está deslogado
  useEffect(() => {
    const tipo = localStorage.getItem("userType");
    if (tipo !== "solicitante" && tipo !== "administrador") {
      navigate("/login");
    }
  }, []);

  const { usuarioNome } = useContext(AuthContext);

  const [totalClientes, setTotalClientes] = useState(0);
  const [novosClientes, setNovosClientes] = useState(0);
  const [demandasAceitas, setDemandasAceitas] = useState(0);
  const [demandasConcluidas, setDemandasConcluidas] = useState(0);
  const [tempoMedioResposta, setTempoMedioResposta] = useState("");
  const [maisRequisitados, setMaisRequisitados] = useState("");
  const [mediaAvaliacao, setMediaAvaliacao] = useState("");
  const [cidadesTop, setCidadesTop] = useState("");
  const assistenciaId = localStorage.getItem("assistenciaId");

  // Total de Clientes Cadastrados
  useEffect(() => {
    fetch("http://localhost:5001/solicitante")
      .then((res) => res.json())
      .then((data) => {
        setTotalClientes(data.length);

        const novos = data.filter((s) => {
          const dataCadastro = new Date(s.dataCadastro);
          const hojeMenos30 = new Date();
          hojeMenos30.setDate(hojeMenos30.getDate() - 30);
          return dataCadastro > hojeMenos30;
        });
        setNovosClientes(novos.length);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/demanda")
      .then((res) => res.json())
      .then((data) => {
        // Aceitas e Concluídas
        setDemandasAceitas(
          data.filter(
            (d) => d.status === "Aceita" || d.status === "Em atendimento"
          ).length
        );
        setDemandasConcluidas(
          data.filter((d) => d.status === "Concluída").length
        );

        // Tempo médio de resposta
        const agora = new Date();
        const tempos = data
          .filter((d) => d.dataEmissao)
          .map((d) => {
            const [dia, mes, ano] = d.dataEmissao.split("/");
            const data = new Date(`${ano}-${mes}-${dia}`);
            return (agora - data) / (1000 * 60 * 60); // em horas
          });

        const mediaHoras = tempos.length
          ? tempos.reduce((a, b) => a + b, 0) / tempos.length
          : 0;

        const horas = Math.floor(mediaHoras);
        const minutos = Math.floor((mediaHoras % 1) * 60);
        setTempoMedioResposta(`${horas}h ${minutos}min`);

        // Média de avaliação (caso tenha)
        const avaliacoes = data
          .map((d) => parseFloat(d.avaliacao))
          .filter((a) => !isNaN(a));
        const media =
          avaliacoes.length > 0
            ? avaliacoes.reduce((a, b) => a + b, 0) / avaliacoes.length
            : 0;
        setMediaAvaliacao(media.toFixed(1));
      });
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5001/demanda").then((res) => res.json()),
      fetch("http://localhost:5001/dispositivo").then((res) => res.json()),
    ]).then(([demandas, dispositivos]) => {
      const contador = {};

      demandas.forEach((d) => {
        const dispositivo = dispositivos.find(
          (dev) => dev.id === d.idDispositivo
        );
        if (dispositivo) {
          const categoria = dispositivo.categoria || "Outros";
          contador[categoria] = (contador[categoria] || 0) + 1;
        }
      });

      const mais = Object.entries(contador)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([categoria]) => categoria)
        .join(" e ");

      setMaisRequisitados(mais);
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/endereco")
      .then((res) => res.json())
      .then((data) => {
        const contagem = {};
        data.forEach((e) => {
          const cidade = e.localidade;
          if (cidade) {
            contagem[cidade] = (contagem[cidade] || 0) + 1;
          }
        });

        const top = Object.entries(contagem)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([cidade]) => cidade)
          .join(", ");

        setCidadesTop(top || "Não encontrado");
      });
  }, []);

  const [relatorioAssistencia, setRelatorioAssistencia] = useState({
    total: 0,
    emAtendimento: 0,
    abertas: 0,
    canceladas: 0,
    concluidas: 0,
    mediaAvaliacao: 0,
    tempoMedio: "",
  });

  useEffect(() => {
    fetch("http://localhost:5001/demanda")
      .then((res) => res.json())
      .then((demandas) => {
        const minhasDemandas = demandas.filter(
          (d) => d.assistencia === assistenciaId
        );

        const emAtendimento = minhasDemandas.filter(
          (d) => d.status === "Em atendimento"
        ).length;
        const abertas = minhasDemandas.filter(
          (d) => d.status === "Aberto"
        ).length;
        const canceladas = minhasDemandas.filter(
          (d) => d.status === "Cancelada"
        ).length;
        const concluidas = minhasDemandas.filter(
          (d) => d.status === "Concluída"
        ).length;

        const avaliacoes = minhasDemandas
          .map((d) => parseFloat(d.avaliacao))
          .filter((a) => !isNaN(a));
        const mediaAvaliacao =
          avaliacoes.length > 0
            ? (
                avaliacoes.reduce((a, b) => a + b, 0) / avaliacoes.length
              ).toFixed(1)
            : 0;

        const agora = new Date();
        const tempos = minhasDemandas
          .filter((d) => d.dataEmissao)
          .map((d) => {
            const [dia, mes, ano] = d.dataEmissao.split("/");
            const data = new Date(`${ano}-${mes}-${dia}`);
            return (agora - data) / (1000 * 60 * 60); // horas
          });

        const mediaHoras = tempos.length
          ? tempos.reduce((a, b) => a + b, 0) / tempos.length
          : 0;
        const horas = Math.floor(mediaHoras);
        const minutos = Math.floor((mediaHoras % 1) * 60);
        const tempoMedio = `${horas}h ${minutos}min`;

        setRelatorioAssistencia({
          total: minhasDemandas.length,
          emAtendimento,
          abertas,
          canceladas,
          concluidas,
          mediaAvaliacao,
          tempoMedio,
        });
      });
  }, [assistenciaId]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* Demandas */}
      <section className={styles.relatoriosSection}>
        <Container fluid>
          <div className={styles.cardContainer}>
            {/* Card de boas-vindas */}
            <Card className={styles.cardTransparente}>
              <Col xs="auto">
                <h3>Seja bem-vindo(a), {usuarioNome}</h3>
                <p>
                  Este é o espaço para você gerenciar sua assistência, suas
                  demandas e seus relatórios.
                </p>
              </Col>
            </Card>

            <Card className={styles.card}>
              <Row className="justify-content-center text-center mb-1">
                <Col xs="auto">
                  <h3>Relatórios</h3>
                </Col>
              </Row>
              <Container className={styles.cardGrid}>
                <Row className={styles.wrapperRelatoriosNovo}>
                  <div className={styles.cardRelatorioNovo}>
                    <HiOutlineUsers
                      className={styles.icone}
                      color="#ffffff"
                      size="2rem"
                    />
                    <div className={styles.info}>
                      <div className={styles.valor}>{totalClientes}</div>
                      <div className={styles.descricao}>Total de Clientes</div>
                    </div>
                    <div className={styles.percentual}>+21%</div>
                  </div>

                  <div className={styles.cardRelatorioNovo}>
                    <img
                      className={styles.icone}
                      src="/icons/person_add_alt.svg"
                      alt="Clientes"
                    />
                    <div className={styles.info}>
                      <div className={styles.valor}>{novosClientes}</div>
                      <div className={styles.descricao}>Novos Clientes</div>
                    </div>
                    <div className={styles.percentual}>+19%</div>
                  </div>

                  <div className={styles.cardRelatorioNovo}>
                    <LuClipboardCopy
                      className={styles.icone}
                      color="#ffffff"
                      size="2rem"
                    />
                    <div className={styles.info}>
                      <div className={styles.valor}>{demandasAceitas}</div>
                      <div className={styles.descricao}>Demandas Aceitas</div>
                    </div>
                    <div className={styles.percentual}>+43%</div>
                  </div>

                  <div className={styles.cardRelatorioNovo}>
                    <LuClipboardCheck
                      className={styles.icone}
                      color="#ffffff"
                      size="2rem"
                    />
                    <div className={styles.info}>
                      <div className={styles.valor}>{demandasConcluidas}</div>
                      <div className={styles.descricao}>
                        Demandas Concluídas
                      </div>
                    </div>
                    <div className={styles.percentual}>+7%</div>
                  </div>

                  <div className={styles.cardRelatorioNovo}>
                    <MdOutlineTimelapse
                      className={styles.icone}
                      color="#ffffff"
                      size="2.2rem"
                    />
                    <div className={styles.info}>
                      <div className={styles.valor}>2h 15min</div>
                      <div className={styles.descricao}>
                        Tempo Médio de Resposta
                      </div>
                    </div>
                    <div className={styles.percentual}>+14%</div>
                  </div>

                  <div className={styles.cardRelatorioNovo}>
                    <MdDevices
                      className={styles.icone}
                      color="#ffffff"
                      size="2rem"
                    />

                    <div className={styles.info}>
                      <div className={styles.valor}>
                        {maisRequisitados
                          ? maisRequisitados.length > 25
                            ? maisRequisitados.slice(0, 25) + "..."
                            : maisRequisitados
                          : "Carregando..."}
                      </div>
                      <div className={styles.descricao}>Mais Requisitados</div>
                    </div>

                    {maisRequisitados && (
                      <div className={styles.percentual}>+12%</div>
                    )}
                  </div>

                  <div className={styles.cardRelatorioNovo}>
                    <FaRegStarHalfStroke
                      className={styles.icone}
                      color="#ffffff"
                      size="2rem"
                    />
                    <div className={styles.info}>
                      <div className={styles.valor}>4.6 / 5.0</div>
                      <div className={styles.descricao}>Média de Avaliação</div>
                    </div>
                    <div className={styles.percentual}>+2%</div>
                  </div>

                  <div className={styles.cardRelatorioNovo}>
                    <img
                      className={styles.icone}
                      src="/icons/location_on.svg"
                      alt="Localidades"
                    />
                    <div className={styles.info}>
                      <div className={styles.valor}>
                        {cidadesTop || "Carregando..."}
                      </div>

                      <div className={styles.descricao}>
                        Principais Localidades
                      </div>
                    </div>
                    <div className={styles.percentual}>+18%</div>
                  </div>
                </Row>
              </Container>
            </Card>
          </div>
        </Container>
      </section>

      <section className={styles.demandaSection}>
        <Container fluid>
          {/* Card de gerenciamento de demandas */}
          <div className={styles.cardWrapperCenter}>
            <Card className={styles.card}>
              <Row className="justify-content-center text-center mb-4">
                <Col xs="auto">
                  <h4>Gerencie suas Demandas</h4>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col xs="auto">
                  <div className={styles.botoesWrapper}>
                    <Button
                      className={styles.botaoTexto}
                      onClick={() => navigate("#")}
                    >
                      <div className={styles.iconeWrapper}>
                        <Image
                          className={styles.icone}
                          src="/icons/history.svg"
                        />
                      </div>
                      <div className={styles.textoWrapper}>
                        Histórico de Demandas
                      </div>
                    </Button>

                    <Button
                      className={styles.botaoTexto}
                      onClick={() =>
                        navigate("/procurar-demandas/:isApenasPrivadas")
                      }
                    >
                      <div className={styles.iconeWrapper}>
                        <Image
                          className={styles.icone}
                          src="/icons/zoom_in.svg"
                        />
                      </div>
                      <div className={styles.textoWrapper}>
                        Procurar Demandas
                      </div>
                    </Button>

                    <Button
                      className={styles.botaoTexto}
                      onClick={() => navigate("#")}
                    >
                      <div className={styles.iconeWrapper}>
                        <Image
                          className={styles.icone}
                          src="/icons/pending_actions.svg"
                        />
                      </div>
                      <div className={styles.textoWrapper}>
                        Demandas Abertas
                      </div>
                    </Button>

                    <Button
                      className={styles.botaoTexto}
                      onClick={() => navigate("/criar-demanda/criar")}
                    >
                      <div className={styles.iconeWrapper}>
                        <Image
                          className={styles.icone}
                          src="/icons/Icon_pedido.svg"
                        />
                      </div>
                      <div className={styles.textoWrapper}>Criar Pedido</div>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
          {/*<Card className={styles.card}>
            <Row className="justify-content-center text-center mb-4">
              <Col xs="auto">
                <h4>Gerencie seus Operadores</h4>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <div className={styles.botoesWrapper}>
                <Button
                  className={styles.botaoTexto}
                  onClick={() => navigate("#")}
                >
                  <div className={styles.iconeWrapper}>
                    <Image
                      className={styles.icone}
                      src="/icons/person_add_alt.svg"
                    />
                  </div>
                  <div className={styles.textoWrapper}>Adicionar Operador</div>
                </Button>

                <Button
                  className={styles.botaoTexto}
                  onClick={() => navigate("#")}
                >
                  <div className={styles.iconeWrapper}>
                    <Image
                      className={styles.icone}
                      src="/icons/person_search.svg"
                    />
                  </div>
                  <div className={styles.textoWrapper}>
                    Consultar Operadores
                  </div>
                </Button>
              </div>
            </Row>
          </Card>*/}
        </Container>
      </section>

      {/* Assistências */}
      <section className={styles.assistenciaSection}>
        <Container fluid>
          <div className={styles.cardWrapperCenter}>
            <Card className={styles.card}>
              <Row className="justify-content-center text-center mb-4">
                <Col xs="auto">
                  <h4>Gerencie sua(s) Assistência(s)</h4>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <div className={styles.botoesWrapper}>
                  <Button
                    className={styles.botaoTexto}
                    onClick={() => navigate("#")}
                  >
                    <div className={styles.iconeWrapper}>
                      <Image
                        className={styles.icone}
                        src="/icons/add_location_alt.svg"
                      />
                    </div>
                    <div className={styles.textoWrapper}>Cadastrar Local</div>
                  </Button>

                  <Button
                    className={styles.botaoTexto}
                    onClick={() => navigate("#")}
                  >
                    <div className={styles.iconeWrapper}>
                      <Image
                        className={styles.icone}
                        src="/icons/location_on.svg"
                      />
                    </div>
                    <div className={styles.textoWrapper}>Consultar Locais</div>
                  </Button>
                </div>
              </Row>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default InicioADM;
