import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import styles from "./inicio.module.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const { usuarioNome } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* Demandas */}
      <section className={styles.demandaSection}>
        <Container fluid>
          <Card className={styles.card}>
            <Row className="justify-content-center text-center mb-4">
              <Col xs="auto">
                <h3>Seja bem-vindo(a), {usuarioNome}</h3>
                <h4>Gerencie suas Demandas</h4>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <div className={styles.botoesWrapper}>
                  <Button className={styles.botaoTexto} onClick={() => navigate("#")}
                  >
                    <div className={styles.iconeWrapper}>
                      <Image className={styles.icone} src="/icons/history.svg" />
                    </div>
                    <div className={styles.textoWrapper}>
                      Histórico de Demandas
                    </div>
                  </Button>

                  <Button className={styles.botaoTexto} onClick={() => navigate("/procurar-demandas/:isApenasPrivadas")}
                  >
                    <div className={styles.iconeWrapper}>
                      <Image className={styles.icone} src="/icons/zoom_in.svg" />
                    </div>
                    <div className={styles.textoWrapper}>Procurar Demandas</div>
                  </Button>

                  <Button className={styles.botaoTexto} onClick={() => navigate("#")}>

                    <div className={styles.iconeWrapper}>
                      <Image className={styles.icone} src="/icons/pending_actions.svg" />
                    </div>
                    <div className={styles.textoWrapper}>Demandas Abertas</div>
                  </Button>

                  <Button className={styles.botaoTexto} onClick={() => navigate("/criar-pedido")}>
                    <div className={styles.iconeWrapper}>
                      <Image className={styles.icone} src="/icons/Icon_pedido.svg" />
                    </div>
                    <div className={styles.textoWrapper}>Criar Pedido</div>
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </section>

      {/* Operadores */}
      <section className={styles.operadorSection}>
        <Container fluid>
          <Card className={styles.card}>
            <Row className="justify-content-center text-center mb-4">
              <Col xs="auto">
                <h4>Gerencie seus Operadores</h4>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <div className={styles.botoesWrapper}>
                <Button className={styles.botaoTexto} onClick={() => navigate("#")}>
                  <div className={styles.iconeWrapper}>
                    <Image className={styles.icone} src="/icons/person_add_alt.svg" />
                  </div>
                  <div className={styles.textoWrapper}>Adicionar Operador</div>
                </Button>

                <Button className={styles.botaoTexto} onClick={() => navigate("#")}>
                  <div className={styles.iconeWrapper}>
                    <Image className={styles.icone} src="/icons/person_search.svg" />
                  </div>
                  <div className={styles.textoWrapper}>Consultar Operadores</div>
                </Button>
              </div>
            </Row>
          </Card>
        </Container>
      </section>

      {/* Assistências */}
      <section className={styles.assistenciaSection}>
        <Container fluid>
          <Card className={styles.card}>
            <Row className="justify-content-center text-center mb-4">
              <Col xs="auto">
                <h4>Gerencie sua(s) Assistência(s)</h4>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <div className={styles.botoesWrapper}>
                <Button className={styles.botaoTexto} onClick={() => navigate("#")}>
                  <div className={styles.iconeWrapper}>
                    <Image className={styles.icone} src="/icons/add_location_alt.svg" />
                  </div>
                  <div className={styles.textoWrapper}>Cadastrar Local</div>
                </Button>

                <Button className={styles.botaoTexto} onClick={() => navigate("#")}>
                  <div className={styles.iconeWrapper}>
                    <Image className={styles.icone} src="/icons/location_on.svg" />
                  </div>
                  <div className={styles.textoWrapper}>Consultar Locais</div>
                </Button>
              </div>
            </Row>
          </Card>
        </Container>
      </section>
    </div >
  );
};

export default Inicio;
