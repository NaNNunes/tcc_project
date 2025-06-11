import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import styles from "./inicio.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/userContext";

const Inicio = () => {
  const { usuarioNome } = useContext(AuthContext);

  return (
    // Demandas
    <div className="d-flex flex-column justify-content-center align-items-center">
      <section className={styles.demandaSection}>
        <Container fluid>
          <Card className={styles.card}>
            <Row className="justify-content-center text-center mb-4">
              <Col xs="auto">
                <h3>Seja bem-vindo(a), {usuarioNome}</h3>
                <h4>Gerencie suas demandas</h4>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <div className={styles.botoesWrapper}>
                  <Button className={styles.botaoTexto} href="#">
                    <div className={styles.iconeWrapper}>
                      <Image
                        className={styles.icone}
                        src="/icons/history.svg"
                      />
                    </div>
                    <div className={styles.textoWrapper}>
                      Histórico de demandas
                    </div>
                  </Button>

                  <Button className={styles.botaoTexto}>
                    <div className={styles.iconeWrapper}>
                      <Image
                        className={styles.icone}
                        src="/icons/zoom_in.svg"
                      />
                    </div>
                    <div className={styles.textoWrapper}>Procurar demandas</div>
                  </Button>

                  <Button className={styles.botaoTexto}>
                    <div className={styles.iconeWrapper}>
                      <Image
                        className={styles.icone}
                        src="/icons/pending_actions.svg"
                      />
                    </div>
                    <div className={styles.textoWrapper}>Demandas abertas</div>
                  </Button>

                  <Button className={styles.botaoTexto}>
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
        </Container>
      </section>

      {/* Operadores */}
      <section className={styles.operadorSection}>
        <Container fluid>
          <Card className={styles.card}>
            <Row className="justify-content-center text-center mb-4">
              <Col xs="auto">
                <h4>Gerencie seus operadores</h4>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <div className={styles.botoesWrapper}>
                <Button className={styles.botaoTexto} href="#">
                  <div className={styles.iconeWrapper}>
                    <Image
                      className={styles.icone}
                      src="/icons/person_add_alt.svg"
                      href="#"
                    />
                  </div>
                  <div className={styles.textoWrapper}>Adicionar operador</div>
                </Button>

                <Button className={styles.botaoTexto}>
                  <div className={styles.iconeWrapper}>
                    <Image
                      className={styles.icone}
                      src="/icons/person_search.svg"
                      href="#"
                    />
                  </div>
                  <div className={styles.textoWrapper}>
                    Consultar operadores
                  </div>
                </Button>
              </div>
            </Row>
          </Card>
        </Container>
      </section>

      {/* Assistências */}
      <section >
      <Container fluid>
        <Card className={styles.card}>
          <Row className="justify-content-center text-center mb-4">
            <Col xs="auto">
              <h4>Gerencie sua(s) Assistência(s)</h4>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <div className={styles.botoesWrapper}>
              <Button className={styles.botaoTexto} href="#">
                <div className={styles.iconeWrapper}>
                  <Image
                    className={styles.icone}
                    src="/icons/add_location_alt.svg"
                    href="#"
                  />
                </div>
                <div className={styles.textoWrapper}>Cadastrar local</div>
              </Button>

              <Button className={styles.botaoTexto}>
                <div className={styles.iconeWrapper}>
                  <Image
                    className={styles.icone}
                    src="/icons/location_on.svg"
                    href="#"
                  />
                </div>
                <div className={styles.textoWrapper}>
                  Consultar locais
                </div>
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
