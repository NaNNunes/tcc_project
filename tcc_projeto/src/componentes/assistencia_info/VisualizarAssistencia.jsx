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

    const {favoritarAssistencia} = useUser();

    const idAssistencia = props.idAssistencia;

    // busca endereco da assitencia por id
    const [endereco, setEndereco] = useState({});

    const url = import.meta.env.VITE_API_URL;
    useEffect(()=>{
        async function buscaEnderecoById(){
           try{
                const reqBuscaEnderecoById = await fetch(`${url}/endereco/${props.idEndereco}`);
                const resBuscaEnderecoById = await reqBuscaEnderecoById.json();
                setEndereco(resBuscaEnderecoById);
            }
            catch(error){
                console.log(error);
            } 
        }
        buscaEnderecoById();
    },[]);

    //TODO: verificar se assistencia ja esta favoritada pelo user
    useEffect(()=>{
        async function fetchData() {
            try {
                const reqBuscaMatchs = await fetch(`${url}/assistencia_Fav_Solicitante`)
                const resBuscaMatchs = await reqBuscaMatchs.json();
                
                resBuscaMatchs.map((match)=>{
                    const isAssistenciaFav = match.id_assistencia === idAssistencia && match.id_solicitante === localStorage.getItem("userId");
                    if(isAssistenciaFav){
                        console.log(match.id_assistencia,":",isAssistenciaFav)
                    }
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    })

    // funcao chamada pelo botao de favoritar assistencia
    const favoritar = async() =>{
        const idUsuario = localStorage.getItem("userId");
        const idAssistencia = props.idAssistencia;

        const identificadores = {
            "id_solicitante": idUsuario,
            "id_assistencia": idAssistencia,
            "isAtivo": true
        }
        // funcao do hook
        favoritarAssistencia(identificadores);
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
                <Card.Footer>
                    {/* colocar icone de favoritar */}
                    {/* 
                        Fazer uma verificação de assistencia está favoritada ou nao
                        caso não esteja favoritada mostrar botão de favoritar, 
                        caso esteja favoritada mostrar botao de desfavoritar 
                    */}
                    <Button
                        type="submit"
                        value="Favoritar"
                        as="input"
                        variant='danger'
                        onClick={favoritar}
                    />
                </Card.Footer>
            </Card>
        </Container>
    </div>
  )
}

export default VisualizarAssistencia