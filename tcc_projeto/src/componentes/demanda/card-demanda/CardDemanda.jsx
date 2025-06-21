// caso buscador da demanda seja solicitante e demanda esteja em aberto
// permitir que o mesmo edite a demanda emitida

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

import { useEffect, useState } from 'react';
import { useDemanda, useAssistencia, useUser, useEndereco } from "../../../hooks/useApi.js";
import { useParams } from 'react-router-dom';

const CardDemanda = (props) => {

    // pega informação passada na url sobre o tipo da demanda procurada
    const {tipoDemanda} = useParams();
    // Hooks
    // hook de demandas
    const { 
        atualizarStatusDemanda,
        buscaDispositivoById, // funcao que busca dispositivo pelo id 
        cancelarDemanda,      // cancelar demanda pelo id
        defineIdAssistencia   // funcao que busca assistencia responsavel pela demanda como o id registrado da mesma na demanda
    } = useDemanda();
    // funcao que busca lista de assistencias
    const { buscaAssistencias } = useAssistencia()
    // funcao que busca endereco pelo id
    const { buscaEnderecoById } = useEndereco();
    // funcao que busca solicitante pelo id
    const { buscaUserById } = useUser();

    // declarando variaveis de acordo com props
    // infos do buscador
    const userBuscador = props.userBuscador;
    const idBuscador = props.idBuscador

    const idResponsavel = props.idResponsavel;
    const idDispostivo = props.idDispostivo;
    // para mostrar qual assistencia está responsável pela demanda
    const idAssistencia = props.idAssistenciaResponsavel; 
    
    // Estados do modal.
    const [mostrarModal, setMostrarModal] = useState(false);
    // assistencia que será responsável pela demanda, definido pelo adm
    const [assistenciaSelecionada, setAssistenciaSelecionada] = useState("");
    // lista de assistencias do adm
    const [assistenciasDoAdministrador, setAssistenciasDoAdministrador] = useState([]);
    // dispositivo que a demanda se refere
    const [dispositivo, setDispositivo] = useState({});
    // endereco do solicitante emissor da demanda
    const [endereco, setEndereco] = useState({});
    // dados do solicitante
    const [solicitante, setSolicitante] = useState({});

    const handleAceitaDemanda = async() =>{
        const idDemanda = props.id;
        const isDemandaAtribuida = await defineIdAssistencia(idDemanda, assistenciaSelecionada);

        // caso não ocorra sucesso na atribuição da demanda
        if(isDemandaAtribuida != true){
            return alert(`Demanda ${idDemanda} não atribuida a sua Assistência ${assistenciaSelecionada}`);
        }

        const isStatusDemandaAtualizado = await atualizarStatusDemanda(idDemanda, "Em atendimento");
        // caso erro ao atualizar status da demanda
        if(isStatusDemandaAtualizado != true){
            // retorna demanda como aberto
            defineIdAssistencia(idDemanda, "Aberto");
            return alert("Status de demanda não modificado");    
        }

        location.reload();
    }

    // busca dados de solicitante, endereco e dispositivo
    useEffect(()=>{
        async function fetchData() {
            try {
                // caso buscador seja adm, salvará todas as assistencias do mesmo
                // para que selecione qual assistencia será responsável pela demanda
                if(userBuscador === "administrador"){
                    // lista para receber assistencias do adm
                    const listaAssistenciasAdministrador = [];
                    // busca lista de todas assistencias
                    const assistencias = await buscaAssistencias();
                    // mapeia lista de assistencias filtrando assistencias pertencentes ao adm pelo id 
                    assistencias.map((assistencia)=>{
                        if(assistencia.administradorId === idBuscador){
                            listaAssistenciasAdministrador.push(assistencia);
                        }
                    });
                    setAssistenciasDoAdministrador(listaAssistenciasAdministrador);
                }

                // Busca de dados do solicitante
                // busca solicitante by id
                const resBuscaSolicitanteById = await buscaUserById("solicitante" , idResponsavel);
                setSolicitante(resBuscaSolicitanteById);
                // id do endereco do solicitante
                const idEndereco = resBuscaSolicitanteById.id_endereco;
                
                // Caso id tenha algum registro
                // buscar endereco do user by id
                if(idEndereco != ""){
                    const resBuscaEnderecoSolicitanteById = await buscaEnderecoById(idEndereco);
                    setEndereco(resBuscaEnderecoSolicitanteById);
                }

                //buscar dispositivo do user by id
                const resBuscaDispositivoSolicitanteById = await buscaDispositivoById(idDispostivo);
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
                onClick={()=>{handleAceitaDemanda()}}
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
    const mainBotao = botoes[tipoDemanda];

    // botao direcionado a cancelar demanda, exclusivo para solicitante no momento
    const botaoCancelarDemanda = (
        <>
            <Button 
                as="input"
                type="button"
                value="Cancelar" 
                onClick={()=>{cancelarDemanda(props.id)}}
                variant='danger'
            />
        </>
    )   

    // botao direcionado a edição da demanda
    const botaoEditarDemanda = (
        <>
            <Button href={`/criar-demanda/${props.id}`}>
                Editar
            </Button>
        </>
    )

    // botao direcionado a visualizar mais infos da demanda, abrir modal
    const botaoVisualizarDemada = (
        <>
            <Button 
                as="input"
                type="button"
                value="Visualizar" 
                onClick={()=>{setMostrarModal(true)}}
                className={styles.botaoCard}
            />
        </>
    )

    // tipo de botão que aparecerá de acordo com user
    const botaoDoCard = {
        "solicitante": botaoEditarDemanda,
        "administrador": botaoVisualizarDemada
    }

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
                                {
                                    // Perfil do solicitante
                                    (userBuscador === "administrador") &&
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <div className={styles.circuloPerfil}>
                                                <FaUser size={40}/>  
                                            </div>
                                            <span className={styles.textoCard}>
                                                {/* 
                                                    nao entendi 
                                                    props.body
                                                */}
                                                {solicitante.nome}
                                            </span>
                                        </div>
                                }

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
                            {
                                // permite edição de demada para o solicitante apenas se demanda estiver em aberto
                                (props.status !== "Aberto")
                                    ? botaoVisualizarDemada
                                    : botaoDoCard[userBuscador]
                            }

                            {
                                (userBuscador === "solicitante" && props.status === "Aberto") && 
                                    botaoCancelarDemanda
                            }
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