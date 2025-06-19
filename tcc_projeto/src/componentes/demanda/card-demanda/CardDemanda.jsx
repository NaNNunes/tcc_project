// Importação de componentes do react-bootstrap
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

// Importação de styles.
import styles from './CardDemanda.module.css';

// Importação dos icones.
import { MdOutlineSmartphone } from "react-icons/md";
import { FaTabletAlt } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa6";
import { FaDesktop } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";   
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

// Importação das imagems
import ImgCelular from '/icons/img_card_celular.png';
import ImgNotebook from '/icons/img_card_notebook.png';
import ImgPerifericos from '/icons/img_card_perifericos.png';

import { use, useEffect, useState } from 'react';
import { useDemanda, useAssistencia } from "../../../hooks/useApi.js";
import { useParams } from 'react-router-dom';

const CardDemanda = (props) => {

    // pega informação passada na url sobre o tipo da demanda procurada
    const {tipoDemanda} = useParams();
    // funcao que busca assistencia responsavel pela demanda como o id registrado da mesma na demanda
    const { defineIdAssistencia } = useDemanda();
    const { buscaAssistencias } = useAssistencia()

    // declarando variaveis de acordo com props
    // infos do buscador
    const userBuscador = props.userBuscador;
    const idBuscador = props.idBuscador

    const idResponsavel = props.idResponsavel;
    const idDispostivo = props.idDispostivo;
    const idAssistencia = props.idAssistenciaResponsavel;
    
    // Estados do modal.
    const [mostrarModal, setMostrarModal] = useState(false);
    // assistencia que será responsável pela demanda, definido pelo adm
    const [assistenciaSelecionada, setAssistenciaSelecionada] = useState("");
    // lista de assistencias do adm
    const [assistenciasDoAdministrador, setAssistenciasDoAdministrador] = useState([]);
    // endereco do solicitante emissor da demanda
    const [endereco, setEndereco] = useState({});
    // dispositivo que a demanda se refere
    const [dispositivo, setDispositivo] = useState({});

    // url para consulta no banco
    const url = import.meta.env.VITE_API_URL;

    // busca dados de solicitante, endereco e dispositivo
    useEffect(()=>{
        async function fetchData() {
            try {
                // caso buscador seja adm, salvará todas as assistencias do mesmo
                // para que selecione qual assistencia será responsável pela demanda
                if(userBuscador === "administrador"){
                    const listaAssistenciasAdministrador = [];

                    const assistencias = await buscaAssistencias();
                    assistencias.map((assistencia)=>{
                        if(assistencia.administradorId === idBuscador){
                            listaAssistenciasAdministrador.push(assistencia);
                        }
                    });
                    setAssistenciasDoAdministrador(listaAssistenciasAdministrador);
                }

                // busca de dados do solicitante
                // busca solicitante by id
                const reqBuscaSolicitanteById = await fetch(`${url}/solicitante/${idResponsavel}`);
                const resBuscaSolicitanteById = await reqBuscaSolicitanteById.json();

                // id do endereco
                const idEndereco = resBuscaSolicitanteById.id_endereco;
                
                // buscar endereco do user by id
                if(idEndereco != undefined){
                    const reqBuscaEnderecoSolicitanteById = await fetch(`${url}/endereco/${idEndereco}`);
                    const resBuscaEnderecoSolicitanteById = await reqBuscaEnderecoSolicitanteById.json();
                    setEndereco(resBuscaEnderecoSolicitanteById);
                }

                //buscar dispositivo do user by id
                const reqBuscaDispositivoSolicitanteById = await fetch(`${url}/dispositivo/${idDispostivo}`);
                const resBuscaDispositivoSolicitanteById = await reqBuscaDispositivoSolicitanteById.json();
                setDispositivo(resBuscaDispositivoSolicitanteById);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[]);

    // COMPONENTES
    // botao para selecionar qual assistencia recebera a demanda
    const aceitarDemanda = (
        <> 
            <FloatingLabel>
                <Form.Select
                    onChange={(e)=>{setAssistenciaSelecionada(e.target.value)}}
                >
                    <option value="" selected disabled>
                        Selecione uma opção
                    </option>
                    {
                        // mapear todas as assistencias do adm 
                        // para que o mesmo defina qual assistencia será responsavel
                        assistenciasDoAdministrador.map((assistencia)=>(
                            <>
                                <option 
                                    key={assistencia.id}
                                    value={assistencia.id}
                                >
                                    {assistencia.nomeFantasia}
                                </option>
                            </>
                        ))
                    }
                </Form.Select>
            </FloatingLabel>

            <Button 
                className={styles.botaoModal}
                disabled={assistenciaSelecionada === ""}
                onClick={()=>{
                    if(mostrarModal != undefined){
                        defineIdAssistencia(props.id, assistenciaSelecionada);
                    }
                }}
            >
                Aceitar
            </Button>
        </>
    )
    // botao para fechar o modal
    const botaoFecharModalDeInfosDemanda = (
        <>
            <Button 
                className={styles.botaoModal}
                onClick={()=>{setMostrarModal(false)}}
            >
                Fechar
            </Button>
        </>
    )
    // define como sera a composição do botao do modal
    const botoes = {
        "abertas": aceitarDemanda,
        "minhas-demandas": botaoFecharModalDeInfosDemanda,
        "aceitas":"Gerar orçamento"
    }
    // O Botão
    const mainBotao = botoes[tipoDemanda]

    const imgCategoria = (categoria) => {
        switch ((categoria || '').toLowerCase()) {
            case 'celular':
                return <img src={ImgCelular} alt="Celular" style={{ width: '50px', height: '50px' }}></img>;
            case 'notebook':
                return <img src={ImgNotebook} alt="Celular" style={{ width: '50px', height: '50px' }}></img>;
            case 'tablet':
                return <img></img>;
            case 'desktop':
                return <img></img>;
            case 'perifericos':
                return <img src={ImgPerifericos} alt="Celular" style={{ width: '50px', height: '50px' }}></img>;
            case 'outros':
                return <img></img>
        }
    }

    // Cor do status.
    const statusDemanda = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'aberto':
                return '#00BFFF'; // se estiver aberto, retorna ciano.
            case 'em atendimento':
                return '#FFCA68'; // se estiver em atendimento, retorna amarelo
            case 'concluido':
                return '#00C400'; // se estiver em concluido, retorna verde
            case 'cancelada':
                return '#FF3B30'; // se estiver em cancelado, retorna vermelho
        }
    }

  return (
    // Div com todo o card.
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
            {/* Card com as informações. */}
            <Container className={styles.caixaCard}>
                <Card 
                    style={{
                        width: "100%", display: "flex", flexDirection: "column"
                    }}
                >
                    <Card.Body 
                        className={styles.cardBody} 
                    >
                        <Container 
                            fluid 
                            className={styles.ContPerfCat}
                        >
                            {/* Perfil do solicitante */}
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div className={styles.circuloPerfil}>
                                    <FaUser size={40}/>  
                                </div>
                                <span className={styles.textoCard}>{props.body}NOME</span>
                            </div>

                            {/* Categoria da demanda */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                {imgCategoria(dispositivo.categoria)}
                                <Card.Text className={styles.textoCard}>
                                    
                                    {dispositivo.categoria}
                                </Card.Text>
                            </div>
                        </Container>

                        <Container style={{padding: '0'}}>
                            <Card.Text className={styles.textoCardPrincipal}>
                                {dispositivo.marca} - {dispositivo.modelo}
                            </Card.Text>

                            {/* Localidade */}
                            <Card.Text className={styles.textoCard}>
                                <IoLocationOutline color='black' size={35}/> {endereco.localidade} - {endereco.uf}
                            </Card.Text>

                            {/* Data de emissão */}
                            <Card.Text className={styles.textoCard} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                <MdOutlineCalendarMonth color='black' size={35}/> {props.dataEmissao}
                            </Card.Text>
                            
                            {/* Status da demanda */}
                            <Card.Text className={styles.textoCard} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '16px', paddingLeft: '3px'}}>
                                <span
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: statusDemanda(props.status),
                                        display: 'inline-block'
                                    }}
                                ></span>{props.status}
                            </Card.Text>
                        </Container>

                        <Container className={styles.containerBotao} style={{padding: '0'}}>
                            <Button
                                type='submit'
                                onClick={() => setMostrarModal(true)}
                                className={styles.botaoCard}
                            >
                                Visualizar
                            </Button>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </div>

        {/* Modal para visualizar informações da demanda. */}
        <div>
            <Modal 
                show={mostrarModal} 
                onHide={() => setMostrarModal(false)} 
                contentClassName={styles.modalContent} 
                dialogClassName={styles.modalInfo}
                centered
            >
                {/* Só a opção de sair da página isolada em cima de tudo. */}
                <Modal.Header closeButton style={{padding: "0", paddingBottom: "5px", border: "0"}}>
                </Modal.Header>

                {/* Corpo do modal com todas as informações */}
                <Modal.Body style={{padding: "0", border: "0"}}>
                    <Modal.Title className={styles.tituloModal}>Visualização de informações da demanda</Modal.Title>
                    <hr className={styles.divisao}/>
                    {/* Informações do dispositivo */}
                    <div>
                        <h3 className={styles.tituloInfoModal}>Dispositivo</h3>
                        <Container className={styles.ContainerModalInfo}>
                            {/* Categoria */}
                            <span className={styles.textoInfoModal}>
                                <strong>Categoria: </strong>
                                {dispositivo.categoria}
                            </span>

                            {/* Marca */}
                            <span className={styles.textoInfoModal}>
                                <strong>Marca: </strong>
                                {dispositivo.marca}
                            </span>

                            {/* Fabricante */}
                            <span className={styles.textoInfoModal}>
                                <strong>Fabricante: </strong>
                                {dispositivo.fabricante}
                            </span>

                            {/* Modelo */}
                            <span className={styles.textoInfoModal}>
                                <strong>Modelo: </strong>
                                {dispositivo.modelo}
                            </span>

                            {/* Tensão */}
                            <span className={styles.textoInfoModal}>
                                <strong>Tensão: </strong>
                                {dispositivo.tensao}
                            </span>

                            {/* Amperagem */}
                            <span className={styles.textoInfoModal}>
                                <strong>Amperagem: </strong>
                                {dispositivo.amperagem}
                            </span>

                            {/* Cor */}
                            <span className={styles.textoInfoModal}>
                                <strong>Cor: </strong>
                                {dispositivo.cor}
                            </span>

                        </Container>
                    </div>
                    <hr className={styles.divisao}/>

                    {/* Colocar container para texto do modal ficar ajustado à esquerda */}
                    {/* Informações do contexto */}
                    <div>
                        <h3 className={styles.tituloInfoModal}>Contexto</h3>
                        <Container style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)"}}>
                            <span className={styles.textoInfoModal}>
                                <strong>Descrição do problema: </strong>
                                {props.descricao}
                            </span>


                            <span className={styles.textoInfoModal} >
                                <strong>Observações: </strong>
                                {props.observacoes}
                            </span>
                        </Container>
                    </div>
                </Modal.Body>

                {/* Footer com o botão com a funcionalidade passada dentro do mainBotao */}
                <Modal.Footer style={{padding: "0", border: "0", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {mainBotao}
                </Modal.Footer>
            </Modal>
        </div>
    </div>
  )
}

export default CardDemanda