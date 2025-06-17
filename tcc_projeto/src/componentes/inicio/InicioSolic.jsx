import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/userContext";
import {
  Row,
  Col,
  Button,
  Container,
  Card,
  Image,
  NavDropdown,
} from "react-bootstrap";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { MdDevices, MdOutlineTimelapse } from "react-icons/md";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { BsClipboardCheck } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { LuClipboardCheck, LuClipboardCopy } from "react-icons/lu";
import styles from "./inicio.module.css";

const InicioSolic = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { usuarioNome } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* Seção de boas-vindas */}
      <section className={styles.relatoriosSection}>
        <Container fluid>
          <div className={styles.cardContainer}>
            <Card className={styles.cardTransparente}>
              <Col xs="auto">
                <h3>Olá, {usuarioNome}!</h3>
                <p>
                  Aqui você pode gerenciar suas demandas e encontrar
                  assistências técnicas.
                </p>
              </Col>
            </Card>

            {/* Cards de estatísticas */}
            <Card className={styles.card}>
              <Row className="justify-content-center text-center mb-1">
                <Col xs="auto">
                  <h3>Suas Estatísticas</h3>
                </Col>
              </Row>

              <Row className={styles.wrapperRelatoriosNovo}>
                <div className={styles.cardRelatorioNovo}>
                  <LuClipboardCopy
                    className={styles.icone}
                    color="#ffffff"
                    size="2rem"
                  />
                  <div className={styles.info}>
                    <div className={styles.valor}>12</div>
                    <div className={styles.descricao}>Demandas Abertas</div>
                  </div>
                  <div className={styles.percentual}>+2 esta semana</div>
                </div>

                <div className={styles.cardRelatorioNovo}>
                  <LuClipboardCheck
                    className={styles.icone}
                    color="#ffffff"
                    size="2rem"
                  />
                  <div className={styles.info}>
                    <div className={styles.valor}>24</div>
                    <div className={styles.descricao}>Demandas Concluídas</div>
                  </div>
                  <div className={styles.percentual}>+5 este mês</div>
                </div>

                <div className={styles.cardRelatorioNovo}>
                  <MdOutlineTimelapse
                    className={styles.icone}
                    color="#ffffff"
                    size="2.2rem"
                  />
                  <div className={styles.info}>
                    <div className={styles.valor}>1h 45min</div>
                    <div className={styles.descricao}>
                      Tempo Médio de Resposta
                    </div>
                  </div>
                  <div className={styles.percentual}>-15%</div>
                </div>

                <div className={styles.cardRelatorioNovo}>
                  <FaRegStarHalfStroke
                    className={styles.icone}
                    color="#ffffff"
                    size="2rem"
                  />
                  <div className={styles.info}>
                    <div className={styles.valor}>4.8 / 5.0</div>
                    <div className={styles.descricao}>Sua Avaliação Média</div>
                  </div>
                  <div className={styles.percentual}>+0.3</div>
                </div>
              </Row>
            </Card>
          </div>
        </Container>
      </section>

      {/* Seção de Ações Rápidas */}
      <section className={styles.demandaSection}>
        <Container fluid>
          <div className={styles.cardWrapperCenter}>
            <Card className={styles.card}>
              <Row className="justify-content-center text-center mb-4">
                <Col xs="auto">
                  <h4>Ações Rápidas</h4>
                </Col>
              </Row>

              <Row className="justify-content-center">
                {/* Dropdown de Demandas */}
                <div className={styles.divNavdropdown}>
                  <NavDropdown
                    id="dropdown-demandas-solicitante"
                    show={openDropdown === "demandas-solicitante"}
                    onToggle={(isOpen) =>
                      setOpenDropdown(isOpen ? "demandas-solicitante" : null)
                    }
                    className={`${
                      openDropdown === "demandas-solicitante"
                        ? styles.dropDownActive
                        : ""
                    }`}
                    title={
                      <span className={styles.dropDownTitle}>
                        Demandas{" "}
                        {openDropdown === "demandas-solicitante" ? (
                          <TiArrowSortedUp />
                        ) : (
                          <TiArrowSortedDown />
                        )}
                      </span>
                    }
                  >
                    <NavDropdown.Item
                      as={Button}
                      onClick={() => navigate("/criar-pedido")}
                      className={styles.dropdownItem}
                    >
                      <Image
                        className={styles.icone}
                        src="/icons/Icon_pedido.svg"
                      />
                      Criar Novo Pedido
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Button}
                      onClick={() =>
                        navigate("/procurar-demandas/minhas-demandas")
                      }
                      className={styles.dropdownItem}
                    >
                      <Image
                        className={styles.icone}
                        src="/icons/Icon_consultar.svg"
                      />
                      Minhas Demandas
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Button}
                      onClick={() => navigate("/procurar-demandas/historico")}
                      className={styles.dropdownItem}
                    >
                      <Image
                        className={styles.icone}
                        src="/icons/history.svg"
                      />
                      Histórico Completo
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>

                {/* Dropdown de Assistências */}
                <div className={styles.divNavdropdown}>
                  <NavDropdown
                    id="dropdown-assistencias-solicitante"
                    show={openDropdown === "assistencias-solicitante"}
                    onToggle={(isOpen) =>
                      setOpenDropdown(
                        isOpen ? "assistencias-solicitante" : null
                      )
                    }
                    className={`${
                      openDropdown === "assistencias-solicitante"
                        ? styles.dropDownActive
                        : ""
                    }`}
                    title={
                      <span className={styles.dropDownTitle}>
                        Assistências
                        {openDropdown === "assistencias-solicitante" ? (
                          <TiArrowSortedUp />
                        ) : (
                          <TiArrowSortedDown />
                        )}
                      </span>
                    }
                  >
                    <NavDropdown.Item
                      as={Button}
                      onClick={() => navigate("/buscar-assistencias/todas")}
                      className={styles.dropdownItem}
                    >
                      <Image
                        className={styles.icone}
                        src="/icons/location_on.svg"
                      />
                      Encontrar Assistências
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Button}
                      onClick={() => navigate("/buscar-assistencias/favoritas")}
                      className={styles.dropdownItem}
                    >
                      <Image className={styles.icone} src="/icons/star.svg" />
                      Minhas Favoritas
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Row>
            </Card>
          </div>
        </Container>
      </section>

      {/* Seção de Assistências Recentes */}
      <section className={styles.assistenciaSection}>
        <Container fluid>
          <div className={styles.cardWrapperCenter}>
            <Card className={styles.card}>
              <Row className="justify-content-center text-center mb-4">
                <Col xs="auto">
                  <h4>Assistências Recentes</h4>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <div className={styles.assistenciasRecentes}>
                  {/* Exemplo de assistência recente */}
                  <div className={styles.assistenciaCard}>
                    <Image
                      src="/logos/assistencia1.jpg"
                      roundedCircle
                      className={styles.assistenciaLogo}
                    />
                    <div className={styles.assistenciaInfo}>
                      <h5>TecnoFix</h5>
                      <p>Nota: 4.9 ★</p>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate("/assistencia/1")}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>

                  <div className={styles.assistenciaCard}>
                    <Image
                      src="/logos/assistencia2.jpg"
                      roundedCircle
                      className={styles.assistenciaLogo}
                    />
                    <div className={styles.assistenciaInfo}>
                      <h5>PC Express</h5>
                      <p>Nota: 4.7 ★</p>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate("/assistencia/2")}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </Row>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default InicioSolic;
