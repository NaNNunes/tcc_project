import { useState } from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import styles from "./SelecaoUsuario.module.css";

const SelecaoUsuario = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleCardClick = (type) => {
    setSelectedUserType(type);
    console.log("Selecionado: ", type)
  };

  return (
    <div>
      <div>
        <h1>Escolha como vamos ajudar você a buscar soluções</h1>
      </div>
      <div className={styles.divInteira}>
        <Container className={styles.caixaCard}>
          <Card 
            style={{border: 'none'}}
            onClick={() => handleCardClick("solicitante")}
          >
            <Card.Body
              className={`${styles.dentroCard} ${
                selectedUserType === "solicitante" ? styles.cardSelecionado : ""
              }`}
            >
              <Card.Img
                variant="top"
                className={styles.imgCard}
                src="/imagens/usuario_solicitante.png"
              />
              <Card.Title className={styles.TitleCard}>
                Preciso de conserto
              </Card.Title>
              <Card.Text className={styles.textCard}>
                Meu dispositivo apresentou um problema e estou buscando uma assistência técnica de confiança para me ajudar.
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>

        <Container className={styles.caixaCard}>
          <Card 
            style={{border: 'none'}}
            onClick={() => handleCardClick("adm")}
          >
            <Card.Body 
              className={`${styles.dentroCard} ${
                selectedUserType === "adm" ? styles.cardSelecionado : ""
              }`}
            >
              <Card.Img
                variant="top"
                className={styles.imgCard}
                src="/imagens/usuario_adm.png"
              />
              <Card.Title className={styles.TitleCard}>
                Quero ser parceiro
              </Card.Title>
              <Card.Text className={styles.textCard}>
                Tenho uma assistência técnica e quero alcançar mais pessoas, conquistar novos clientes e mostrar a qualidade do meu trabalho.
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
    
  );
};

export default SelecaoUsuario;