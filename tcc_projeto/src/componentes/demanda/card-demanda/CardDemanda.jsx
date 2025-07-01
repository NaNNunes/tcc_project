// TODO PERMITIR AO ADM ENCERRAR DEMANDAS PRESENCIAIS
// TODO MOSTRAR ASSISTENCIA QUE DEMANDA EM ABERTO ESTÁ VINCULADA
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
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

// Importação das imagems
import ImgCelular from '/icons/img_card_celular.png';
import ImgNotebook from '/icons/img_card_notebook.png';
import ImgPerifericos from '/icons/img_card_perifericos.png';
import ImgTablet from '/icons/img_card_tablet.png';
import ImgDesktop from '/icons/img_card_desktop.png';
import ImgOthers from '/icons/img_card_outros.png';

import { useEffect, useState } from 'react';

// Importação do useForm para mexer com o formulário.
import { useForm, Controller } from "react-hook-form";

import { useDemanda } from "../../../hooks/useDemanda.js";
import { useAssistencia } from "../../../hooks/useAssistencia.js";
import { useUser } from "../../../hooks/useUser.js";
import { useEndereco } from "../../../hooks/useEndereco.js";
import { useAvaliacao } from '../../../hooks/useAvaliacao.js';

import { useParams } from 'react-router-dom';

const CardDemanda = (props) => {

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();
    
    // pega informação passada na url sobre o tipo da demanda procurada
    const {tipoDemanda} = useParams();
    // Hooks
    // hook de demandas
    const { 
        aceitarOrcamento,
        atualizarStatusDemanda,
        buscaDispositivoById,  
        buscaDemandaById,
        cancelarDemanda,      
        concluirDemanda,
        defineIdAssistencia,  
        inserirIdAvaliacao,
        rejeitarDemanda,
        recusarOrcamento,
    } = useDemanda();
    // funcao que busca lista de assistencias
    const { 
        buscaAssistencias,
        buscaAssistenciaById,
     } = useAssistencia();
    // funcao que busca endereco pelo id
    const { buscaEnderecoById } = useEndereco();
    // funcao que busca solicitante pelo id
    const { buscaUserById } = useUser();

    const {
        buscarAvaliacaoById,
        inserirAvaliacao
    } = useAvaliacao();

    // declarando variaveis de acordo com props
    // infos do buscador
    const userBuscador = props.userBuscador;
    const idBuscador = props.idBuscador
    const idDemanda = props.id;
    const idResponsavel = props.idResponsavel;
    const idDispositivo = props.idDispositivo;
    // para mostrar qual assistencia está responsável pela demanda/ buscar nome fantasia da assistencia
    const idAssistencia = props.idAssistenciaResponsavel; 
    
    // Estados do modal.
    const [mostrarModal, setMostrarModal] = useState(false);
    // Estados do modal do solicitante.
    const [mostrarModalSolicitante, setMostrarModalSolicitante] = useState(false);
    // Estados do modal de avaliação.
    const [mostrarModalAvaliacao, setMostrarModalAvaliacao] = useState(false);
    // assistencia que será responsável pela demanda, definido pelo adm
    const [assistenciaSelecionada, setAssistenciaSelecionada] = useState("");
    // lista de assistencias do adm
    const [assistenciasDoAdministrador, setAssistenciasDoAdministrador] = useState([]);
    // assistencia responsável pela demanda (Domínio)
    const [assistenciaResponsavel, setAssistenciaResponsavel] = useState("Público");
    // informações da demanda selecionada.
    const [demandaSelecionada, setDemandaSelecionada] = useState({});
    // dispositivo que a demanda se refere
    const [dispositivo, setDispositivo] = useState({});
    // endereco do solicitante emissor da demanda
    const [endereco, setEndereco] = useState(undefined);
    // dados do solicitante
    const [solicitante, setSolicitante] = useState({});

    // dados da avaliacao da demanda
    const [dadosAvaliacao, setDadosAvaliacao] = useState({});

    // funcao de aceitar demanda
    const handleAceitaDemanda = async() =>{
        const isDemandaAtribuida = await defineIdAssistencia(idDemanda, assistenciaSelecionada);

        // caso não ocorra sucesso na atribuição da demanda
        if(isDemandaAtribuida != true){
            return alert(`Demanda não atribuida a sua assistência`);
        }

        const isStatusDemandaAtualizado = await atualizarStatusDemanda(idDemanda, "Em atendimento");
        // caso erro ao atualizar status da demanda
        if(isStatusDemandaAtualizado != true){
            // retorna demanda como aberto
            defineIdAssistencia(idDemanda, "Aberto");
            alert("Status de demanda não modificado");    
            return;
        }
        alert("Demanda Aceita");
        location.reload();
    }

    // funcao de rejeitar demanda
    const handleRejeitarDemanda = async() =>{
        const isDemandasRejeitada = await rejeitarDemanda(idDemanda);
        if(isDemandasRejeitada){
            alert("Demanda rejeitada");
            location.reload();
        }
    }

    // funcao para concluir demanda
    const handleConcluirDemanda = async () =>{
        const isDemandaConcluida = await concluirDemanda(idDemanda);
        if(isDemandaConcluida){
            alert("Demanda Concluida");
            location.reload();
        }
    }

    // funcao para aceitar oracamento
    const handleAceitarOrcamento = async() =>{
        const isDemandaAceita = await aceitarOrcamento(idDemanda);
        if(isDemandaAceita){
            alert("Orçamento de demanda aceito");
            location.reload();
        }
    }

    // funcao para rejeitar orcamento
    const handleRejeitarOrcamento = async() =>{
        const isDemandaRejeitada = await recusarOrcamento(idDemanda);
        if(isDemandaRejeitada){
            alert("Orçamento de demanda rejeitado");
            location.reload();
        }
    }

    const handleVisualizarDemanda = async() =>{
        // mostra modal
        setMostrarModal(true);
        // busca demanda ao selecionar botao
        const demanda = await buscaDemandaById(idDemanda);
        // seta idAvaliacao
        const idAvaliacao = demanda.idAvaliacao;
        setDemandaSelecionada(demanda);
        if(idAvaliacao !== undefined){
            const avaliacao = await buscarAvaliacaoById(idAvaliacao);
            setDadosAvaliacao(avaliacao);
        }
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

                // Busca nome da assistencia responsavel pela demanda
                if(idAssistencia != "Público"){
                    const resBuscaAssistenciaById = await buscaAssistenciaById(idAssistencia);
                    setAssistenciaResponsavel(resBuscaAssistenciaById.nomeFantasia);
                }

                // Busca de dados do solicitante
                // busca solicitante by id
                const resBuscaSolicitanteById = await buscaUserById("solicitante" , idResponsavel);
                setSolicitante(resBuscaSolicitanteById);
                // id do endereco do solicitante
                const idEndereco = resBuscaSolicitanteById.idEndereco;
                // Caso id tenha algum registro
                // buscar endereco do user by id
                if(idEndereco !== undefined){
                    const resBuscaEnderecoSolicitanteById = await buscaEnderecoById(idEndereco);
                    setEndereco(resBuscaEnderecoSolicitanteById);
                }

                //buscar dispositivo do user by id
                const resBuscaDispositivoSolicitanteById = await buscaDispositivoById(idDispositivo);
                setDispositivo(resBuscaDispositivoSolicitanteById);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[]);

    // --- SOLICITANTE ---
    // botões para aceitar ou rejeitar o orçamento.
    const botaoAceitarRejeitarOrcamento = (
        <>
            <div className={styles.divBotoes}>
                <Button
                    className={styles.botaoModal}
                    onClick={()=>{handleAceitarOrcamento()}}
                >
                    Aceitar
                </Button>
                    
                <Button
                    className={styles.botaoCancelar}
                    onClick={()=>{handleRejeitarOrcamento()}}
                >
                    Rejeitar
                </Button>
            </div>
        </>
    );

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
    );

    // botao para fechar o modal com as informações do solicitante.
    const botaoFecharModalDeInfosSolicitante = (
        <>
            <Button 
                className={styles.botaoModal}
                onClick={()=>{setMostrarModalSolicitante(false)}}
            >
                Fechar
            </Button>
        </>
    )

    // botao para editar a demanda.
    const botaoEditarDemanda = (
        <>
            <Button
                href={`/criar-demanda/${idDemanda}`}
                className={styles.botaoModal}
            >
                Editar
            </Button>
        </>
    );

    // botao para cancelar demanda.
    const botaoCancelarDemanda = (
        <>
            <Button 
                onClick={()=>{cancelarDemanda(idDemanda)}}
                className={styles.botaoCancelar}
            >
                Cancelar
            </Button>
        </>
    );

    const botaoFazerAvaliacao = (
        <>
            <Button
                className={styles.botaoModal}
                onClick={async () => {
                    setMostrarModal(false);
                    setMostrarModalAvaliacao(true);
                }}
            >
                Avaliar assistência
            </Button>
        </>
    );

    // --- ADMINISTRADOR ---

    // botao para direcionar user a tela de orçamento.
    const botaoGerarOrcamento = (
        <>
            <Button 
                href={`/orcamento/${idDemanda}`}
                className={styles.botaoModal}
                onClick={()=>{setMostrarModal(false)}}
            >
                Gerar Orçamento
            </Button>
        </>
    );

    // botao para concluir demanda.
    const botaoConcluirDemanda = (
        <>
            <Button
                onClick={()=>{handleConcluirDemanda()}}
                className={styles.botaoModal}
            >
                Concluir demanda
            </Button>
        </>
    );

    const botaoAceitarDemanda = (
        <>  
            <Button 
                className={styles.botaoModal}
                disabled={assistenciaSelecionada === ""}
                onClick={()=>{handleAceitaDemanda()}}
            >
                Aceitar
            </Button>
        </>
    )
    
    // botao para rejeitar demanda
    const botaoRejeitarDemanda = (
        <>
            <Button 
                // className={styles.botaoModal}
                onClick={()=>{handleRejeitarDemanda()}}
                className={styles.botaoCancelar}
            >
                Rejeitar
            </Button>
        </>
    );

    //Botão que aparecerão no modal para administrador nas demandas abertas
    const botaoDemandasAbertas = (
        <>
            <FloatingLabel
                /* Campo do formulário */
                className={styles.selecaoModal}
                label='Selecione uma assistência'
            >
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
                            
                            <option 
                                key={assistencia.id}
                                value={assistencia.id}
                            >
                                {assistencia.nomeFantasia || assistencia.razaoSocial}
                            </option>
                            
                        ))
                    }
                </Form.Select>
            </FloatingLabel>

            {botaoAceitarDemanda}
        </>
    )

    console.log(demandaSelecionada);

    // Botões que aparecerão no modal para o administrador nas demandas aceitas.
    const botaoDemandasAceitas = (
        <>
            {
                ((props.status === "Em atendimento" && demandaSelecionada.statusOrcamento === undefined)) &&
                botaoGerarOrcamento
            }
            {
                (props.status === "Em atendimento" && demandaSelecionada.statusOrcamento === "Aceito") &&
                botaoConcluirDemanda
            }
            {
                (props.status === "Em atendimento" && demandaSelecionada.statusOrcamento === "Sem resposta") &&
                botaoFecharModalDeInfosDemanda
            }
        </>
    )

    // Botões que aparecerão no modal para o solicitante no consultar pedidos.
    const botaoMinhasDemandas = (
        <>
            {props.status === "Concluído" && dadosAvaliacao.notaAvaliacao === undefined ? (
                    botaoFazerAvaliacao
                ) 
                : 
                (
                    ((props.status === "Concluído" && demandaSelecionada?.notaAvaliacao) 
                    ||
                    ((props.status === "Cancelada"))
                    ||
                    (demandaSelecionada.statusOrcamento === "Recusado" || demandaSelecionada.statusOrcamento === "Aceito")
                    ||
                    (demandaSelecionada.statusOrcamento === undefined && props.status === "Em atendimento")) && 
                    botaoFecharModalDeInfosDemanda
                )
            }
            {
                (props.status === "Em atendimento" && demandaSelecionada.statusOrcamento === "Sem resposta") &&
                botaoAceitarRejeitarOrcamento
            }
            {
                <div className={styles.divBotoes}>
                    {
                        (props.status === "Aberto" && userBuscador === "solicitante") && 
                        botaoCancelarDemanda
                    }
                    {
                        (userBuscador === "solicitante" && props.status === "Aberto" && idAssistencia === "Público") &&
                        botaoEditarDemanda
                    }
                </div>
            }
        </>
    );

    // Botões que aparecerão no modal para o administrador no histórico de demandas.
    const botaoHistoricoDemandas = (
        <>
            {
                ((props.status === "Concluído" || props.status === "Cancelada") 
                || 
                (props.status === "Em atendimento" && (demandaSelecionada.statusOrcamento === "Sem resposta" || demandaSelecionada.statusOrcamento === 'Recusado'))) && 
                botaoFecharModalDeInfosDemanda
            }
            {
                ((props.status === "Em atendimento" && demandaSelecionada.statusOrcamento === undefined)) &&
                botaoGerarOrcamento
            }
            {
                (props.status === "Em atendimento" && demandaSelecionada.statusOrcamento === "Aceito") &&
                botaoConcluirDemanda
            }
        </>
    )

    // botao para selecionar qual assistencia recebera a demanda
    const botaoSolicitacoes = (
        <>
            <FloatingLabel
                /* Campo do formulário */
                className={styles.selecaoModal}
                label='Selecione uma assistência'
            >
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
                            
                            <option 
                                key={assistencia.id}
                                value={assistencia.id}
                            >
                                {assistencia.nomeFantasia || assistencia.razaoSocial}
                            </option>
                            
                        ))
                    }
                </Form.Select>
            </FloatingLabel>

            <div className={styles.divBotoes}>
                {botaoAceitarDemanda}
                {
                    // mostra apenas quando adm acessa pagina de solicitações
                    (userBuscador === "administrador" && tipoDemanda === "solicitacoes") && 
                    botaoRejeitarDemanda
                }
            </div>
        </>
    );

    // define como sera a composição do botao do modal
    const botoesDemanda = {
        "abertas": botaoDemandasAbertas,
        "aceitas": botaoDemandasAceitas,
        "historico": botaoHistoricoDemandas,
        "minhas-demandas": botaoMinhasDemandas,
        "ofertas": botaoMinhasDemandas,
        "solicitacoes": botaoSolicitacoes
    }
    // O Botão
    const mainBotao = botoesDemanda[tipoDemanda];

    // botao direcionado a visualizar mais infos da demanda, abrir modal
    const botaoVisualizarDemada = (
        <>
            <Button 
                as="input"
                type="button"
                value="Visualizar" 
                onClick={() => {
                    handleVisualizarDemanda();
                }}
                className={styles.botaoCard}
            />
        </>
    );

    const imgCategoria = (categoria) => {
        switch ((categoria || '').toLowerCase()) {
            case 'celular':
                return <img src={ImgCelular} alt="Celular" style={{ width: '50px', height: '50px' }}></img>;
            case 'notebook':
                return <img src={ImgNotebook} alt="Notebook" style={{ width: '50px', height: '50px' }}></img>;
            case 'tablet':
                return <img src={ImgTablet} alt="Notebook" style={{ width: '50px', height: '50px' }}></img>;
            case 'desktop':
                return <img src={ImgDesktop} alt="Notebook" style={{ width: '50px', height: '50px' }}></img>;
            case 'periférico':
                return <img src={ImgPerifericos} alt="Perifericos" style={{ width: '50px', height: '50px' }}></img>;
            case 'outros':
                return <img src={ImgOthers} alt="Notebook" style={{ width: '50px', height: '50px' }}></img>
        }
    }

    // Cor do status.
    const statusDemanda = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'aberto':
                return '#00BFFF'; // se estiver aberto, retorna ciano.
            case 'em atendimento':
                return '#FFCA68'; // se estiver em atendimento, retorna amarelo
            case 'concluído':
                return '#00C400'; // se estiver em concluido, retorna verde
            case 'cancelada':
                return '#FF3B30'; // se estiver em cancelado, retorna vermelho
        }
    }

    const onSubmit = async (dados) => {
        console.log(dados);
        const idDemanda = demandaSelecionada.id;
        const idAvaliacao = await inserirAvaliacao(dados, idAssistencia, idDemanda, idBuscador);
        const isDemandaComAvaliacao = await inserirIdAvaliacao(idDemanda, idAvaliacao);
        console.log(isDemandaComAvaliacao);
        if(isDemandaComAvaliacao){
            alert("Assistência avaliada com sucesso.");
            location.reload();
        }
    }

    const onError = (errors) => {
        console.log("Erros: ", errors)
    }

    // console.log(demandaSelecionada)

    // Ao clicar no perfil de solicitante define o solicitante.
    const handleVisualiarPerfil = async() => {
        if (solicitante.idEndereco) {
            const enderecoSelecionado = await buscaEnderecoById(solicitante.idEndereco);
            setEndereco(enderecoSelecionado);
        }

        setMostrarModalSolicitante(true);
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
                    className={styles.cardDemanda}
                >
                    {/* mude o design front enzo */}  
                    {
                        (idAssistencia != "Público") && 
                            <Card.Header className={styles.textoTitle}>
                                <span>{assistenciaResponsavel}</span>
                            </Card.Header>
                    }
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
                                        <div onClick={handleVisualiarPerfil} style={{display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
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
                                <IoLocationOutline color='black' size={35}/> 
                                {
                                    (endereco !== undefined)
                                        ?
                                            <>
                                                {endereco.localidade} - {endereco.uf}
                                            </>
                                        :
                                            <>
                                                Local
                                            </>
                                }
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
                    </Card.Body>

                    <Card.Footer style={{border: '0', background: '#FFFFFF', padding: '0', marginBottom: '20px'}}>
                        <Container className={styles.containerBotao} style={{padding: '0'}}>
                            {botaoVisualizarDemada}
                        </Container>
                    </Card.Footer>
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
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Categoria: </strong>
                                {dispositivo.categoria}
                            </span>

                            {/* Marca */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Marca: </strong>
                                {dispositivo.marca}
                            </span>

                            {/* Fabricante */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Fabricante: </strong>
                                {dispositivo.fabricante}
                            </span>

                            {/* Modelo */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Modelo: </strong>
                                {dispositivo.modelo}
                            </span>

                            {/* Tensão */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Tensão: </strong>
                                {dispositivo.tensao}
                            </span>

                            {/* Amperagem */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Amperagem: </strong>
                                {dispositivo.amperagem}
                            </span>

                            {/* Cor */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Cor: </strong>
                                {dispositivo.cor}
                            </span>

                        </Container>
                    </div>

                    <hr className={styles.divisao}/>

                    {/* Colocar container para texto do modal ficar ajustado à esquerda */}
                    {/* Informações do contexto */}
                    <div>
                        <h3 className={styles.tituloInfoModal}>Contexto</h3>
                        <Container style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", margin: '0px'}}>
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Descrição do problema: </strong>
                                {props.descricao}
                            </span>


                            <span className={styles.textoInfoModal} >
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Observações: </strong>
                                {props.observacoes}
                            </span>
                        </Container>
                    </div>

                    {
                        (!(demandaSelecionada?.statusOrcamento === undefined)) &&
                        <>
                            <hr className={styles.divisao}/>
                            <div>
                                <h3 className={styles.tituloInfoModal}>Orçamento</h3>
                                <Container style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", margin: '0px'}}>
                                    {/* Problema identificado */}
                                    <span className={styles.textoInfoModal}>
                                        <strong style={{color: '#000000', fontWeight: 'bold'}}>Problema identificado: </strong>
                                        {demandaSelecionada.problema_identificado}
                                    </span>

                                    {/* Possível solução */}
                                    <span className={styles.textoInfoModal}>
                                        <strong style={{color: '#000000', fontWeight: 'bold'}}>Possível solução: </strong>
                                        {demandaSelecionada.solucao}
                                    </span>

                                    {/* Peça a ser trocada */}
                                    <span className={styles.textoInfoModal}>
                                        <strong style={{color: '#000000', fontWeight: 'bold'}}>Peça a ser trocada: </strong>
                                        {demandaSelecionada.pecaTrocada}
                                    </span>

                                    {/* Observações */}
                                    <span className={styles.textoInfoModal}>
                                        <strong style={{color: '#000000', fontWeight: 'bold'}}>Observações: </strong>
                                        {demandaSelecionada.observacoesOrcamento}
                                    </span>

                                    {/* Valor da mão de obra */}
                                    <span className={styles.textoInfoModal}>
                                        <strong style={{color: '#000000', fontWeight: 'bold'}}>Valor da mão de obra: </strong>
                                        {demandaSelecionada.valorObra}
                                    </span>
                                    
                                    {/* Data de aceitação do orçamento */}
                                    <span className={styles.textoInfoModal}>
                                        <strong style={{color: '#000000', fontWeight: 'bold'}}>Data de aceitação do orçamento: </strong>
                                        {demandaSelecionada.data_aceitacao_orcamento}
                                    </span>

                                    {/* Data de aceitação do orçamento */}
                                    <span className={styles.textoInfoModal}>
                                        <strong style={{color: '#000000', fontWeight: 'bold'}}>Status: </strong>
                                        {demandaSelecionada.statusOrcamento}
                                    </span>
                                </Container>      
                            </div>
                        </>
                    }

                    {   
                        // modificar verificar se existe um id de avaliacao de demanda resolvida pela assistencia
                        (!(dadosAvaliacao.notaAvaliacao === undefined)) &&
                        <>
                            <hr className={styles.divisao}/>
                            <div>
                                <h3 className={styles.tituloInfoModal}>Avaliação</h3>
                                <Container style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", margin: '0px'}}>
                                    {/* Nota */}
                                    <span className={styles.textoInfoModal} style={{color: '#000000', fontWeight: 'normal'}}>
                                        <strong>Nota: </strong>
                                        <div className={styles.estrelasNota}>
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <FaStar 
                                                    key={n}
                                                    size={26}
                                                    color={n <= dadosAvaliacao.notaAvaliacao ? "#ffc107" : "#e4e5e9"}
                                                />
                                            ))}
                                        </div>
                                    </span>

                                    <span className={styles.textoInfoModal} style={{color: '#000000', fontWeight: 'normal'}}>
                                        <strong>Análise: </strong> {dadosAvaliacao.analise}
                                    </span>
                                </Container>      
                            </div>
                        </>
                    }
                </Modal.Body>

                {/* Footer com o botão com a funcionalidade passada dentro do mainBotao */}
                <Modal.Footer style={{padding: "0", border: "0", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {mainBotao}
                </Modal.Footer>
            </Modal>
        </div>

        <div>
            <Modal 
                show={mostrarModalSolicitante} 
                onHide={() => setMostrarModalSolicitante(false)} 
                contentClassName={styles.modalContent} 
                dialogClassName={styles.modalInfoSolicitante}
                centered
            >
                {/* Só a opção de sair da página isolada em cima de tudo. */}
                <Modal.Header closeButton style={{padding: "0", paddingBottom: "5px", border: "0"}}>
                </Modal.Header>

                {/* Corpo do modal com todas as informações */}
                <Modal.Body style={{padding: "0", border: "0"}}>
                    <Modal.Title className={styles.tituloModal}>Visualização de informações do solicitante</Modal.Title>
                    <hr className={styles.divisao}/>
                    {/* Informações do dispositivo */}
                    <div>
                        <h3 className={styles.tituloInfoModal}>Contato</h3>
                        <Container style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", margin: '0px'}}>
                            {/* Nome completo */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Nome completo: </strong>
                                {solicitante.nome} {solicitante.sobrenome}
                            </span>

                            {/* E-mail */}
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>E-mail: </strong>
                                {solicitante.email}
                            </span>

                            {/* Telefone */}   
                            <span className={styles.textoInfoModal}>
                                <strong style={{color: '#000000', fontWeight: 'bold'}}>Telefone: </strong>
                                {solicitante.userTelefone}
                            </span>
                        </Container>
                    </div>


                    {
                        (solicitante.idEndereco) && (
                            <>                 
                                <hr className={styles.divisao}/>

                                {/* Colocar container para texto do modal ficar ajustado à esquerda */}
                                {/* Informações do contexto */}
                                <div>
                                    <h3 className={styles.tituloInfoModal}>Endereço</h3>
                                    <Container className={styles.ContainerModalInfo}>
                                        <span className={styles.textoInfoModal} >
                                            <strong style={{color: '#000000', fontWeight: 'bold'}}>CEP: </strong>
                                            {endereco?.cep}
                                        </span>

                                        <span className={styles.textoInfoModal} >
                                            <strong style={{color: '#000000', fontWeight: 'bold'}}>Cidade: </strong>
                                            {endereco?.localidade}
                                        </span>

                                        <span className={styles.textoInfoModal} >
                                            <strong style={{color: '#000000', fontWeight: 'bold'}}>Bairro: </strong>
                                            {endereco?.bairro}
                                        </span>

                                        <span className={styles.textoInfoModal} >
                                            <strong style={{color: '#000000', fontWeight: 'bold'}}>UF: </strong>
                                            {endereco?.uf}
                                        </span>

                                        <span className={styles.textoInfoModal} >
                                            <strong style={{color: '#000000', fontWeight: 'bold'}}>N°: </strong>
                                            {endereco?.number}
                                        </span>

                                        <span className={styles.textoInfoModal} >
                                            <strong style={{color: '#000000', fontWeight: 'bold'}}>Logradouro: </strong>
                                            {endereco?.logradouro}
                                        </span>

                                        <span className={styles.textoInfoModal} >
                                            <strong style={{color: '#000000', fontWeight: 'bold'}}>Complemento: </strong>
                                            {endereco?.complemento}
                                        </span>
                                    </Container>
                                </div>
                            </>
                        )
                    }
                </Modal.Body>

                {/* Footer com o botão com a funcionalidade passada dentro do mainBotao */}
                <Modal.Footer style={{padding: "0", border: "0", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {botaoFecharModalDeInfosSolicitante}
                </Modal.Footer>
            </Modal>
        </div>

        {/* Modal para avaliação da assistência. */}
        <div>
            <Modal
                show={mostrarModalAvaliacao}
                onHide={() => setMostrarModalAvaliacao(false)}
                contentClassName={styles.modalContent} 
                dialogClassName={styles.modalInfoAvaliacao}
                centered
            >
                <Modal.Header closeButton style={{padding: "0", paddingBottom: "5px", border: "0"}}>
                </Modal.Header>
                
                <Modal.Body style={{padding: "0", border: "0"}}>
                    {/* Título */}
                    <Modal.Title className={styles.tituloModal} style={{paddingBottom: '10px'}}>Avaliar assistência</Modal.Title>

                    {/* Contaienr com todas informações e campos para avaliação. */}
                    <Container style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", margin: '0px'}}>
                        {/* Frase explicando o que é a avaliação. */}
                        <span className={styles.textSpan} style={{paddingBottom: '20px'}}>
                            Como foi sua experiência? Avalie a assistência e ajude a melhorar ainda mais o serviço prestado.
                        </span>

                        {/* Assistência que será avaliada. */}
                        <span className={styles.textoInfoModal}>
                            <strong>Assistência: </strong>
                            {assistenciaResponsavel}
                        </span>

                        {/* Formulário para enviar a nota da avaliação e a avaliação. */}
                        <Form onSubmit={handleSubmit(onSubmit, onError)}>
                            {/* Estrelas para avaliação. */}
                            <div style={{paddingBottom: '30px'}}>
                                <Controller
                                    control={control}
                                    name="notaAvaliacao"
                                    rules={{ required: "Por favor, selecione uma nota de 1 a 5 estrelas." }}
                                    // Estrelas para nota.
                                    render={({ field }) => (
                                        <div>
                                            <span className={styles.textoInfoModal}>
                                                <strong>Nota: </strong>
                                            </span>
                                            {/* Estrelas de 1 a 5. */}
                                            <div className={styles.estrelasNota}>
                                                {[1, 2, 3, 4, 5].map((estrela) => (
                                                <button
                                                    key={estrela}
                                                    type="button"
                                                    onClick={() => field.onChange(estrela)}
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        padding: 0
                                                    }}
                                                >
                                                    <FaStar
                                                    size={26}
                                                    color={estrela <= field.value ? "#ffc107" : "#e4e5e9"}
                                                    />
                                                </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                />
                                {errors.notaAvaliacao && (
                                    <span className='error'>{errors.notaAvaliacao.message}</span>
                                )}
                            </div>
                            
                            {/* Avaliação. */}
                            <div style={{paddingBottom: '20px'}}>
                                <FloatingLabel
                                    controlId='AnaliseInput'
                                    label='Análise'
                                >
                                    <Form.Control 
                                        as='textarea'
                                        style={{height: "80px", resize: "none"}}
                                        {...register("analise", {
                                            maxLength: {
                                                value: 200,
                                                message: "A avaliação não pode ter mais de 200 caracteres",
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9À-ÿ\s.,!?@&#()/%-:]*$/,
                                                message: "Use apenas letras, números e símbolos."
                                            },
                                            validate: (value) => {
                                                if (/https?:\/\//i.test(value)) {
                                                return "Não inclua links na observação.";
                                                }
                                                return true;
                                            }
                                        })}
                                    />
                                </FloatingLabel>
                                {errors.analise && (
                                    <span className='error'>{errors.analise.message}</span>
                                )}
                            </div>
 
                            <div style={{justifySelf: 'center'}}>
                                <Button
                                    type='submit'
                                    className={styles.botaoModal}
                                >
                                    Enviar
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    </div>
  )
}

export default CardDemanda