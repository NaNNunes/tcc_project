import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./sobre.module.css";

const Sobre = () => {
  return (
    <Container className={styles.sobreContainer}>
      <Row className="justify-content-center">
        <Col md={10} lg={12}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title className={styles.title}>Quem somos</Card.Title>
              <Card.Text className={styles.text}>
                Fundada em 2025, como parte do Trabalho de Conclusão de Curso
                (TCC) do curso de Desenvolvimento de Sistemas no SENAI de
                Vitória, nossa plataforma nasceu com o objetivo de transformar a
                forma como pessoas encontram assistências técnicas.
              </Card.Text>
              <Card.Text className={styles.text}>
                Assim como funciona um serviço de mobilidade, conectamos
                clientes que possuem dispositivos com defeito — como celulares,
                tablets, notebooks, desktops e smartwatchs — às assistências
                técnicas mais próximas e disponíveis.
              </Card.Text>
              <Card.Text className={styles.text}>
                O processo é simples e rápido: o cliente cadastra seu
                dispositivo, informa os problemas identificados e envia a
                solicitação. As assistências técnicas (AT's) cadastradas na
                plataforma recebem a demanda em tempo real e podem escolher
                aceitar ou não o serviço, de acordo com sua disponibilidade e
                especialização.
              </Card.Text>
              <Card.Text className={styles.text}>
                Nosso propósito é facilitar o acesso a serviços de manutenção,
                oferecendo comodidade, agilidade e segurança tanto para clientes
                quanto para as assistências técnicas.
              </Card.Text>
              <Card.Text className={styles.text}>
                Estamos comprometidos em impulsionar a economia local, promover
                a sustentabilidade através do conserto de dispositivos e criar
                uma rede de confiança entre usuários e técnicos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Sobre;
