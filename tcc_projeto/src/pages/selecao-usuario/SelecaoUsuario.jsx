import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import styles from "./SelecaoUsuario.module.css";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/userContext";

const SelecaoUsuario = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const {setType} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleCardClick = (type) => {
    
    // Coloquei em um localStorage diferente para não dar conflito com o userType.
    localStorage.setItem("tipoUsuario", type);

    navigate("/cadastro");
  };

  return (
    <div className={styles.tudo}>
      <div style={{marginBottom: '30px'}}>
        <h1 className={styles.titleGeral}>Escolha como vamos ajudar você a buscar soluções</h1>
      </div>

      <div className={styles.divInteira}>
        <Container className={styles.caixaCard}>
          {/* Solicitante btn */}
          <Card 
            style={{border: 'none', borderRadius: '10px'}}
            onClick={() => handleCardClick("solicitante")}
          >
            <Card.Body
              style={{backgroundColor: "#0054a1"}}
              className={`
                ${styles.dentroCard} 
                ${
                  selectedUserType === "solicitante"
                   ? styles.cardSelecionado
                   : ""
                }`
              }
            >
              <Card.Img
                variant="top"
                className={styles.imgCard}
                src="/imagens/usuario_solicitante_2.jpg"
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
          {/* adm btn */}
          <Card 
            style={{border: 'none', borderRadius: '10px'}}
            onClick={() => handleCardClick("administrador")}
          >
            <Card.Body 
              style={{backgroundColor: "#004381"}}
              className={`
                ${styles.dentroCard} 
                ${ selectedUserType === "administrador"
                    ? styles.cardSelecionado
                    : ""
                  }`
              }
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