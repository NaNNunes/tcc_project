import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useEndereco, useUser } from '../../hooks/useApi';
import { useEffect, useState } from 'react';

const VisualizarAssistencia = (props) => {

    const {favoritarAssistencia} = useUser();

    // busca endereco da assitencia por id
    const [endereco, setEndereco] = useState({});
    const url = import.meta.env.VITE_API_URL;
    useEffect(()=>{
        async function buscaEnderecoById(){
            const request = await fetch(`${url}/endereco/${props.idEndereco}`);
            const response = await request.json();
            setEndereco(response);
            console.log(response);
        }
        buscaEnderecoById();
    },[]);

    const favoritar = async() =>{
        const idUsuario = localStorage.getItem("userId");
        const idAssistencia = props.idAssistencia;

        const identificadores = {
            "id_solicitante": idUsuario,
            "id_assistencia": idAssistencia
        }

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