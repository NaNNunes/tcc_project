// Importação de componentes do react-bootstrap
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

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

import { useEffect, useState } from 'react';
import CardFooter from 'react-bootstrap/esm/CardFooter';

const CardDemanda = (props) => {
    const tela = "procurar_demandas";

    // SÓ FAZER O CÓDIGO DE "HANDLEACEITAR" E ATRIBUIR AO BOTÃO
    const botaoAceitarDemanda = (
        <>
            <Button 
                className={styles.botaoModal}
            >
                Aceitar
            </Button>
        </>
    )

    const botoes = {
        procurar_demandas: botaoAceitarDemanda,
    }

    const mainBotao = botoes[tela]

    // Estados do modal.
    const [mostrarModal, setMostrarModal] = useState(false);

    const url = import.meta.env.VITE_API_URL;
    const idSolicitante = props.solicitanteId;
    const idDispostivo = props.idDispostivo;
    const [endereco, setEndereco] = useState({});
    const [dispositivo, setDispositivo] = useState({});
    useEffect(()=>{
        async function fetchData() {
            try {
                // busca user by id
                const reqBuscaSolicitanteById = await fetch(`${url}/solicitante/${idSolicitante}`);
                const resBuscaSolicitanteById = await reqBuscaSolicitanteById.json();
                // id do endereco
                const idEndereco = resBuscaSolicitanteById.id_endereco;

                //buscar dispositivo do user by id
                const reqBuscaDispositivoSolicitanteById = await fetch(`${url}/dispositivo/${idDispostivo}`);
                const resBuscaDispositivoSolicitanteById = await reqBuscaDispositivoSolicitanteById.json();
                setDispositivo(resBuscaDispositivoSolicitanteById);

                // buscar endereco do user by id
                if(idEndereco != undefined){
                    const reqBuscaEnderecoSolicitanteById = await fetch(`${url}/endereco/${idEndereco}`);
                    const resBuscaEnderecoSolicitanteById = await reqBuscaEnderecoSolicitanteById.json();
                    setEndereco(resBuscaEnderecoSolicitanteById);
                }

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[])


  return (
    // deixar responsivo
    <div style={{minWidth: '100%', maxWidth: '100%'}}>
        <div style={{margin: '0', padding: '0', marginTop:"1rem"}}>
            <Container className={styles.caixaCard}>
                <Card style={{width: "100%", height: "25rem", display: "flex", flexDirection: "column"}}>
                    <Card.Body>
                            <div style={{display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: '16px'}}>
                                <MdOutlineSmartphone size={50}/>
                                <div>
                                    <Card.Text className={styles.textoCard}>
                                        {dispositivo.categoria}
                                    </Card.Text>

                                    <Card.Text className={styles.textoCard}>
                                        {dispositivo.marca} - {dispositivo.modelo}
                                    </Card.Text>
                                </div>
                            </div>

                        <Card.Text className={styles.textoCard}>
                            <IoLocationOutline color='black' size={30}/> {endereco.localidade} - {endereco.uf}
                        </Card.Text>

                        <Card.Text className={styles.textoCard}>
                            <MdOutlineCalendarMonth color='black' size={30}/> {props.dataEmissao}
                        </Card.Text>

                        <Card.Text className={styles.textoCard}>
                            {props.status}
                        </Card.Text>
                    </Card.Body>

                    <CardFooter className='text-center'>

                        <Button
                            as='input'
                            type='submit'
                            value="ver"
                            size='lg'
                            onClick={() => setMostrarModal(true)}
                        />
                    </CardFooter>
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
                                CATEGORIA
                            </span>

                            {/* Marca */}
                            <span className={styles.textoInfoModal}>
                                <strong>Marca: </strong>
                                MARCA
                            </span>

                            {/* Fabricante */}
                            <span className={styles.textoInfoModal}>
                                <strong>Fabricante: </strong>
                                FABRICANTE
                            </span>

                            {/* Modelo */}
                            <span className={styles.textoInfoModal}>
                                <strong>Modelo: </strong>
                                MODELO
                            </span>

                            {/* Tensão */}
                            <span className={styles.textoInfoModal}>
                                <strong>Tensão: </strong>
                                TENSAO
                            </span>

                            {/* Amperagem */}
                            <span className={styles.textoInfoModal}>
                                <strong>Amperagem: </strong>
                                AMPERAGEM
                            </span>

                            {/* Cor */}
                            <span className={styles.textoInfoModal}>
                                <strong>Cor: </strong>
                                COR
                            </span>

                        </Container>
                    </div>
                    <hr className={styles.divisao}/>

                    {/* Informações do contexto */}
                    <div>
                        <h3 className={styles.tituloInfoModal}>Contexto</h3>
                        <Container style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)"}}>
                            <span className={styles.textoInfoModal}>
                                <strong>Descrição do problema: </strong>
                                DESCRIÇÃO DO PROBLEMA:
                            </span>


                            <span className={styles.textoInfoModal} >
                                <strong>Observações: </strong>
                                OBSERVAÇÕES
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