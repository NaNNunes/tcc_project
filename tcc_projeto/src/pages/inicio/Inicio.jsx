import { Container, Row, Col, Button, Image } from "react-bootstrap";
import styles from "./inicio.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/userContext";

const Inicio = () => {
  const { usuarioNome } = useContext(AuthContext);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h1>Seja bem vindo(a), {usuarioNome}</h1>
          </Col>
          <Row>
            <Button className={styles.botaoTexto}>
              <Image className={styles.icone} src="/icons/Icon_pedido.svg" />
              Cadastrar Pedido
            </Button>
            <Button className={styles.botaoTexto}>
              <Image className={styles.icone} src="/icons/zoom_in.svg" />
              Procurar demandas
            </Button>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default Inicio;
