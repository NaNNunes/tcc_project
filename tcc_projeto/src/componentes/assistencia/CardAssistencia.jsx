// componente card para mostrar infos da assistencia para o solicitante
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// hooks
import { useEndereco } from "../../hooks/useEndereco.js";
import { useLikes } from "../../hooks/useLikes.js";
import { useEffect, useState } from "react";

// Importação dos icones.
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import styles from './CardAssistencia.module.css'
import { useAvaliacao } from "../../hooks/useAvaliacao.js";

const CardAssistencia = (props) => {
  // descontrutores
  const { buscaEnderecoById } = useEndereco();

  const {
    buscarAssistenciasFavoritas,
    favoritarAssistencia,
    removerAssistenciaDeFavoritos,
    buscaLikesSolicitante
  } = useLikes()

  const {
    buscarAvaliacoesDaAssistencia,
    mediaAvaliacaoAssistencia
  } = useAvaliacao();

  const userType = localStorage.getItem("userType");

  // IDs
  const idAssistencia = props.idAssistencia;
  const idUsuario = localStorage.getItem("userId");
  const idEndereco = props.idEndereco;
  

  // states
  // state para receber endereco
  const [endereco, setEndereco] = useState({});
  // state iniciado como false onde verifica se a assistencia está favoritada pelo user
  const [assistenciaIsFav, setAssistenciaIsFav] = useState(false);
  // state de lista de likes --- utilizado em remover match
  const [likes, setLikes] = useState();
  // Notas das assistências.
  const [mediaAssisstencia, setMediaAssisstencia] = useState(undefined);

  // busca todos os registros de likes e verifica se o match pertence ao cliente e a assistencia renderizada
  useEffect(() => {
    async function fetchData() {
      try {

        // busca endereco by id
        const dadosEndereco = await buscaEnderecoById(idEndereco);
        setEndereco(dadosEndereco);

        // const avaliacoesAssistencia = await buscarAvaliacoesDaAssistencia(idAssistencia);
        const mediaAssisstencia = await mediaAvaliacaoAssistencia(idAssistencia);
        console.log(`Média assistencia ${idAssistencia}: ${mediaAssisstencia}`);
        setMediaAssisstencia(mediaAssisstencia);
        // caso media === NaN, mostrar "Sem avaliaçoes"

        if(userType !== "solicitante") return;  
        const likesSolicitante = await buscaLikesSolicitante(idUsuario);
        setLikes(likesSolicitante);

        // procura na lista de assistencias favoritas do user o id igual ao id da assistencia renderizada
        const idsAssistenciasFavoritas = await buscarAssistenciasFavoritas(idUsuario, idAssistencia);
        setAssistenciaIsFav(idsAssistenciasFavoritas.includes(idAssistencia))
        
      } catch (error) {
        console.log(error.message);
      };
    };
    fetchData();
  }, []);

  

  // funcao chamada pelo botao de favoritar assistencia
  const favoritar = async () => {
    // dados do match
    const identificadores = {
      idSolicitante: idUsuario,
      idAssistencia: idAssistencia,
    };
    // funcao do hook
    const idMatch = await favoritarAssistencia(identificadores);
  };

  //  funcao chamada pelo botao remover match
  const removerMatch = async () => {
    // retorna o like vinculado ao id da assistencia renderizada
    const like = likes.find(like => like.idAssistencia === idAssistencia)?.id ?? null
    removerAssistenciaDeFavoritos(like);
  };

  const handleToggleFavorito = () => {
    if (assistenciaIsFav) {
      // desfavoritar
      removerMatch();
    } else {
      // favoritar
      favoritar();
    }
  };

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
            className={styles.cardAssistencia}
          >
            <Card.Header className={styles.headerCard}>
              {/* nome fantasia */}
              <div className={styles.divtextoCardPrincipal}>
                <Card.Title className={styles.textoCardPrincipal}>
                    {props.nome}
                </Card.Title>
              </div>

              {
                // verifica o tipo do user para mostrar ou não opção de favoritar (melhorar essa logica)
                userType === "solicitante" && (
                  <button
                    onClick={handleToggleFavorito}
                    className={styles.coracaoFavoritar}
                  >
                    {assistenciaIsFav ? (
                      <FaHeart size={32} color="#e63946" />
                    ) : (
                      <FaRegHeart size={32} color="#e63946" />
                    )}
                  </button>
                )
              }
            </Card.Header>

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

              <hr className={styles.divisao}/>

              <Container className={styles.teste}>
                {isNaN(mediaAssisstencia) ? (
                  <span className={styles.textoInfo}>
                    Ainda não possui avaliações
                  </span>
                ) : (
                  <>
                    <div>
                      <Container
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(1, 1fr)",
                          margin: "0px",
                          padding: '0'
                        }}
                      >
                        {/* Nota */}
                        <div className={styles.estrelasNota}>
                          <span 
                            style={{ 
                              fontSize: '1rem', 
                              alignSelf: 'center',
                              color: '#757575', 
                              fontWeight: 'bold',
                              margin: '0px',
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word'
                            }}
                          >
                            <strong style={{color: 'black'}}>Média de avaliação: </strong>
                              {[1, 2, 3, 4, 5].map((n) => {
                                if (n <= mediaAssisstencia) {
                                  return <FaStar key={n} size={26} color="#ffc107" />;
                                } else if (n - 0.5 <= mediaAssisstencia) {
                                  return <FaStarHalfAlt key={n} size={26} color="#ffc107" />;
                                } else {
                                  return <FaRegStar key={n} size={26} color="#e4e5e9" />;
                                }
                              })}
                              <span 
                                style={{ 
                                  fontSize: '1rem', 
                                  alignSelf: 'center',
                                  color: '#757575', 
                                  fontWeight: 'bold',
                                  paddingLeft: '8px', 
                                  margin: '0px'
                                }}
                              >
                                {mediaAssisstencia.toFixed(1)} / 5
                              </span>
                          </span>
                        </div>
                      </Container>
                    </div>
                  </>
                )}
              </Container>
            </Card.Body>
            
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default CardAssistencia;
