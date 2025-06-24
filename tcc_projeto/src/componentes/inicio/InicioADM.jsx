// importação de componentes do react-bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "./inicio.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { BsClipboardCheck } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineTimelapse } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { LuClipboardCopy } from "react-icons/lu";

const tipoUser = localStorage.getItem("userType");
const perfilUsuario = (tipoUser !== "Visitante") && localStorage.getItem("userType");

const InicioADM = () => {
  const navigate = useNavigate();

  // verifica se user está deslogado
  const userType = localStorage.getItem("userType");
  if (userType !== "solicitante" && userType !== "administrador") {
    console.log("Acesso negado");
    return navigate("/login");
  }

  const { usuarioNome } = useContext(AuthContext);

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
                      <div className={styles.valor}>225</div>
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
                      <div className={styles.valor}>41</div>
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
                      <div className={styles.valor}>243</div>
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
                      <div className={styles.valor}>189</div>
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
                      <div className={styles.valor}>Cel. e Notebooks</div>
                      <div className={styles.descricao}>Mais Requisitados</div>
                    </div>
                    <div className={styles.percentual}>+12%</div>
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
                      <div className={styles.valor}>SP, RJ, MG</div>
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
