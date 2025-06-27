// componente card para mostrar infos da assistencia para o solicitante
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// hooks
import { useEndereco } from "../../hooks/useEndereco.js";
import { useUser } from "../../hooks/useUser.js";
import { useEffect, useState } from "react";

import styles from './CardAssistencia.module.css'

const CardAssistencia = (props) => {
  // descontrutores
  const { buscaEnderecoById } = useEndereco();
  const { 
    buscaAssistenciasFavoritas ,
    favoritarAssistencia,
    removerAssistenciaDeFavoritos,
  } = useUser();

  // IDs
  const idAssistencia = props.idAssistencia;
  const idUsuario = localStorage.getItem("userId");
  const idEndereco = props.idEndereco;

  // states
  // state para receber endereco
  const [endereco, setEndereco] = useState({});
  // state iniciado como false onde verifica se a assistencia está favoritada pelo user
  const [assistenciaIsFav, setAssistenciaIsFav] = useState(false);
  // state de lista de matchs --- utilizado em remover match
  const [matchs, setMatchs] = useState();

  // busca todos os registros de matchs e verifica se o match pertence ao cliente e a assistencia renderizada
  useEffect(() => {
    async function fetchData() {
      try {
        // busca endereco by id
        const dadosEndereco = await buscaEnderecoById(idEndereco);
        setEndereco(dadosEndereco);

        // busca por matchs
        const resBuscaMatchs = await buscaAssistenciasFavoritas();
        setMatchs(resBuscaMatchs);

        // lista para armazenar id de assistencias favoritas do user
        const listaIdAssistenciasFavs = [];

        // mapeia lista de matchs e verifica qual match está vinculado ao solicitante e a assistencia renderizada
        resBuscaMatchs.map((match) => {
          // verifica se match pertence ao solicitante
          const isMatchSolicitante = match.id_solicitante === idUsuario;
          // verifica se match pertence a assistencia renderizada
          const isAssistenciaFav = match.id_assistencia === idAssistencia;
          // assistencia pertence ao favoritos do solicitante
          if (isMatchSolicitante && isAssistenciaFav) {
            // insere id de assistencia do match na lista de assistencias favoritas do solicitante
            listaIdAssistenciasFavs.push(match.id_assistencia);
          }
        });
        // procura na lista de assistencias favoritas do user o id igual ao id da assistencia renderizada
        listaIdAssistenciasFavs.find((id) => {
          id === idAssistencia
            ? setAssistenciaIsFav(true)
            : setAssistenciaIsFav(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // funcao chamada pelo botao de favoritar assistencia
  const favoritar = async () => {
    // dados do match
    const identificadores = {
      id_solicitante: idUsuario,
      id_assistencia: idAssistencia,
    };
    // funcao do hook
    const idMatch = await favoritarAssistencia(identificadores);
  };

  //  funcao chamada pelo botao remover match
  const removerMatch = async () => {
    // retorna o match vinculado ao id do solicitante e id da assistencia renderizada
    const match = matchs.find((match) => {
      const isMatchSolicitante = match.id_solicitante === idUsuario;
      const isAssistenciaFav = match.id_assistencia === idAssistencia;
      if (isAssistenciaFav && isMatchSolicitante) return match;
    });
    removerAssistenciaDeFavoritos(match.id);
  };

  const botaoDesLikeAssistencia = (
    <Button
      type="submit"
      value="Desfavoritar"
      as="input"
      variant="warning"
      onClick={removerMatch}
    />
  );

  const botaoLikeAssistencia = (
    <Button
      type="submit"
      value="Favoritar"
      as="input"
      variant="danger"
      onClick={favoritar}
    />
  );

  return (
    <div 
      style={{
        minWidth: '100%', maxWidth: '100%'
      }}
    >
      <div
        style={{
          margin: '0', padding: '0', marginTop:"1rem"
        }}
      >
        <Container className={styles.caixaCard}>
          <Card
            style={{
              width: "100%", display: "flex", flexDirection: "column"
            }}
          >
            {/* nome fantasia */}
            <div style={{width: '70%', alignSelf: 'center', paddingTop: '20px'}}>
              <Card.Title className={styles.textoCardPrincipal}>
                  {props.nome}
              </Card.Title>
            </div>

            <Card.Body className={styles.cardBody}>
              {/* cnpj */}
              <Container>
                <Row>
                  <Col>
                    <Card.Text className={styles.textoInfo}>
                      <span><strong style={{color: 'black'}}>CNPJ: </strong>{props.cnpj}</span> 
                    </Card.Text>
                  </Col>
                </Row>
              </Container>

              <hr className={styles.divisao}/>

              <Container>
                <Row>
                  <h3 style={{fontSize: '1.5rem'}}>Contato</h3>
                </Row>

                <Row>
                  <Col>
                    <Card.Text className={styles.textoInfo}>
                      <span><strong style={{color: 'black'}}>Telefone: </strong>{props.telefone}</span> 
                    </Card.Text>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card.Text className={styles.textoInfo}>
                      <span><strong style={{color: 'black'}}>E-mail: </strong>{props.email}</span> 
                    </Card.Text>
                  </Col>
                </Row>
              </Container>

              <hr className={styles.divisao}/>

              <Container>
                <Row>
                  <h3 style={{fontSize: '1.5rem'}}>Endereço</h3>
                </Row>

                <Row>
                  <Container className={styles.ContainerModalInfo}>
                    <Card.Text className={styles.textoInfo}>
                      <span><strong style={{color: 'black'}}>CEP: </strong>{endereco.zipcode}</span> 
                    </Card.Text>

                    <Card.Text className={styles.textoInfo}>
                      <span><strong style={{color: 'black'}}>UF: </strong>{endereco.uf}</span> 
                    </Card.Text>
                  
                    <Card.Text className={styles.textoInfo}>
                      <span><strong style={{color: 'black'}}>N°: </strong>{endereco.number}</span> 
                    </Card.Text>
                  </Container>
                </Row>

                <Row>
                  <Card.Text className={styles.textoInfo}>
                    <span><strong style={{color: 'black'}}>Bairro: </strong>{endereco.bairro}</span>
                  </Card.Text>
                </Row>

                <Row>
                  <Card.Text className={styles.textoInfo}>
                    <span><strong style={{color: 'black'}}>Logradouro: </strong>{endereco.logradouro}</span>
                  </Card.Text>
                </Row>
                
                <Row>
                  <Card.Text className={styles.textoInfo}>
                    <span><strong style={{color: 'black'}}>Cidade: </strong>{endereco.localidade}</span>
                  </Card.Text>
                </Row>
              </Container>
            </Card.Body>

            {
              // verifica o tipo do user para mostrar ou não opção de favoritar (melhorar essa logica)
              localStorage.getItem("userType") === "solicitante" && (
                <Card.Footer>
                  {/* colocar icone de favoritar */}
                  {
                    (assistenciaIsFav) 
                      ? botaoDesLikeAssistencia
                      : botaoLikeAssistencia 
                  }
                </Card.Footer>
              )
            }
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default CardAssistencia;
