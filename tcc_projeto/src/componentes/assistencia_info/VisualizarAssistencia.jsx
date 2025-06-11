// componente card para mostrar infos da assistencia para o solicitante

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// hooks
import { useEndereco, useUser } from '../../hooks/useApi';
import { useEffect, useState } from 'react';

const VisualizarAssistencia = (props) => {

    // descontrutores
    const {buscaEnderecoById} = useEndereco();
    const {favoritarAssistencia, removerAssistenciaDeFavoritos} = useUser();

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

    // busca endereco by id
    useEffect(()=>{
        async function fetchData(){
            try{   
                const dadosEndereco = await buscaEnderecoById(idEndereco);
                setEndereco(dadosEndereco);
            } catch (error){
                console.log(error);
            }
        }
        fetchData();
    },[]);

    const url = import.meta.env.VITE_API_URL;
    // busca todos os registros de matchs e verifica se o match pertence ao cliente e a assistencia renderizada
    useEffect(()=>{
        async function fetchData() {
            try {
                // busca por matchs
                const reqBuscaMatchs = await fetch(`${url}/assistencia_Fav_Solicitante`)
                const resBuscaMatchs = await reqBuscaMatchs.json();
                setMatchs(resBuscaMatchs);
                
                // lista para armazenar id de assistencias favoritas do user
                const listaIdAssistenciasFavs = [];

                // mapeia lista de matchs e verifica qual match está vinculado ao solicitante e a assistencia renderizada
                resBuscaMatchs.map((match)=>{
                    // verifica se match pertence ao solicitante
                    const isMatchSolicitante = (match.id_solicitante === idUsuario);
                    // verifica se match pertence a assistencia renderizada
                    const isAssistenciaFav = match.id_assistencia === idAssistencia;
                    // assistencia pertence ao favoritos do solicitante
                    if(isMatchSolicitante && isAssistenciaFav){
                        // insere id de assistencia do match na lista de assistencias favoritas do solicitante
                        listaIdAssistenciasFavs.push(match.id_assistencia);
                    }
                })
                // procura na lista de assistencias favoritas do user o id igual ao id da assistencia renderizada
                listaIdAssistenciasFavs.find((id)=>{
                    (id === idAssistencia) 
                        ? setAssistenciaIsFav(true)
                        : setAssistenciaIsFav(false)
                });
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[])

    // funcao chamada pelo botao de favoritar assistencia
    const favoritar = async() =>{
        // dados do match
        const identificadores = {
            "id_solicitante": idUsuario,
            "id_assistencia": idAssistencia
        }
        // funcao do hook
        const idMatch = await favoritarAssistencia(identificadores);
    }

    //  funcao chamada pelo botao remover match
    const removerMatch = async() =>{
        // retorna o match vinculado ao id do solicitante e id da assistencia renderizada
        const match = matchs.find((match)=>{
            const isMatchSolicitante = (match.id_solicitante === idUsuario);
            const isAssistenciaFav = match.id_assistencia === idAssistencia;
            if (isAssistenciaFav && isMatchSolicitante) return match;
        });
        removerAssistenciaDeFavoritos(match.id);
    }

  return (
    <div>
        <Container className='mb-3'>
            <Card>
                <Card.Title className='text-center p-1'>
                    {/* nome fantasia */}
                    <Row>
                        <Col>
                            {props.nome}
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Body>
                    {/* cnpj */}
                    <Row className='mb-1'>
                        <Col>
                            CNPJ: {props.cnpj}
                        </Col>
                    </Row>
                    {/* telefone */}
                    <Row className='mb-1'>
                        <Col>
                            Contato: {props.telefone}
                        </Col>
                    </Row>
                    {/* endereco */}
                    <Row className='mb-1'>
                        <Col className='mb-2'>
                            {endereco.zipcode}
                        </Col>
                        <Col className='mb-2'>
                            {endereco.localidade}
                        </Col>
                        <Col className='mb-2'>
                            {endereco.bairro}
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col className='mb-2'>
                            {endereco.logradouro}
                        </Col>
                        <Col className='mb-2'>
                            {endereco.number}
                        </Col>
                        <Col className='mb-2'>
                            {endereco.uf}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Complemento: {endereco.complemento}
                        </Col>
                    </Row>
                </Card.Body>

                {   
                    // verifica o tipo do user para mostrar ou não opção de favoritar (melhorar essa logica)
                    (localStorage.getItem("userType") === "solicitante") &&
                        <Card.Footer>
                            {/* colocar icone de favoritar */}
                            {
                                (assistenciaIsFav)
                                    ?
                                        <Button 
                                            type='submit'
                                            value='Remover Match'
                                            as='input'
                                            variant='warning'
                                            onClick={removerMatch}
                                        />                            
                                    :
                                        <Button
                                            type="submit"
                                            value="Favoritar"
                                            as="input"
                                            variant='danger'
                                            onClick={favoritar}
                                        />
                            }
                        </Card.Footer>
                }
            </Card>
        </Container>
    </div>
  )
}

export default VisualizarAssistencia