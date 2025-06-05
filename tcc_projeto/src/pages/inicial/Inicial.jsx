import React from 'react'
import { Container, Row, Col, Button, Image } from "react-bootstrap"
import styles from "./inicial.module.css"

const Inicial = () => {

  // const { usuarioNome } = useContext(AuthContext);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h1>Seja bem vindo(a)</h1>
          </Col>
          <Row>
            <Button className={styles.botaoTexto}>

              <Image className={styles.icone} src='/icons/Icon_pedido.svg' />
              Cadastrar Pedido

            </Button>
          </Row>
        </Row>
      </Container>
    </div>
  )
}

export default Inicial
