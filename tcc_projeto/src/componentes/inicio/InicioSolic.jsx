import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/userContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { MdDevices, MdOutlineTimelapse } from "react-icons/md";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { BsClipboardCheck } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { LuClipboardCheck, LuClipboardCopy } from "react-icons/lu";
import { GrFavorite } from "react-icons/gr";
import styles from "./inicio.module.css";

import { useLikes } from "../../hooks/useLikes.js";
import { useAssistencia } from "../../hooks/useAssistencia.js";

const InicioSolic = () => {

  const { buscaLikesSolicitante } = useLikes();
  const { buscarAssistenciasFavoritasSolicitante } = useAssistencia();

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [openDropdown, setOpenDropdown] = useState(null);
  const { usuarioNome } = useContext(AuthContext);
  const [ favoritas, setFavoritas ] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      try {
        // busca likes do solicitante
        const likes = await buscaLikesSolicitante(userId);
        const assistencias = await buscarAssistenciasFavoritasSolicitante(likes);
        setFavoritas(assistencias);

      } catch (error) {
        console.log(error.messsage)
      }
    };
    fetchData();
  },[])

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
                <Col xs="auto">
                  <div className={styles.botoesWrapper}>
                    {/* Demandas */}
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
                      <div className={styles.textoWrapper}>
                        Criar Novo Pedido
                      </div>
                    </Button>

                    <Button
                      className={styles.botaoTexto}
                      onClick={() =>
                        navigate("/procurar-demandas/minhas-demandas")
                      }
                    >
                      <div className={styles.iconeWrapper}>
                        <Image
                          className={styles.icone}
                          src="/icons/Icon_consultar.svg"
                        />
                      </div>
                      <div className={styles.textoWrapper}>Minhas Demandas</div>
                    </Button>

                    <Button
                      className={styles.botaoTexto}
                      onClick={() => navigate("/procurar-demandas/historico")}
                    >
                      <div className={styles.iconeWrapper}>
                        <Image
                          className={styles.icone}
                          src="/icons/history.svg"
                        />
                      </div>
                      <div className={styles.textoWrapper}>
                        Histórico Completo
                      </div>
                    </Button>

                    {/* Assistências */}
                    <Button
                      className={styles.botaoTexto}
                      onClick={() => navigate("/buscar-assistencias/todas")}
                    >
                      <div className={styles.iconeWrapper}>
                        <Image
                          className={styles.icone}
                          src="/icons/location_on.svg"
                        />
                      </div>
                      <div className={styles.textoWrapper}>
                        Encontrar Assistências
                      </div>
                    </Button>

                    <Button
                      className={styles.botaoTexto}
                      onClick={() => navigate("/buscar-assistencias/favoritas")}
                    >
                      <div className={styles.iconeWrapper}>
                        <GrFavorite
                          className={styles.icone}
                          color="#ffffff"
                          size="2rem"
                        />
                      </div>
                      <div className={styles.textoWrapper}>
                        Minhas Favoritas
                      </div>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        </Container>
      </section>

      {/* Seção de Assistências Favoritas */}
      <section className={styles.assistenciaSection}>
        <Container fluid>
          <div className={styles.cardWrapperCenter}>
            <Card className={styles.card}>
              <Row className="justify-content-center text-center mb-4">
                <Col xs="auto">
                  <h4>Assistências Favoritadas</h4>
                </Col>
              </Row>

              <Row
                className={`justify-content-center ${styles.assistenciasRecentes}`}
              >
                {
                  favoritas.map((assistencia)=>(
                    <>
                      <div 
                        key={assistencia.id}
                        className={styles.assistenciaCard}  
                      >
                        <div key={assistencia.id}
                          className={styles.assistenciaInfo}
                        >
                          <h5>{assistencia.nomeFantasia || assistencia.razaoSocial}</h5>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={()=>{navigate("/buscar-assistencias/favoritas")}}
                            >
                              Ver detalhes
                            </Button>
                        </div>

                      </div>
                    </>
                  ))
                }
              </Row>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default InicioSolic;
