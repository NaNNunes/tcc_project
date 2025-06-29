// Importação do card de demanda.
import CardDemanda from "../../componentes/demanda/card-demanda/CardDemanda";

// Importação da barra de pesquisa.
import BarraPesquisa from "../../componentes/barra-pesquisa/BarraPesquisa.jsx";

// Importação do react-bootstrap.
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Importação do styles.
import styles from "./ProcurarDemandas.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssistencia } from "../../hooks/useAssistencia.js";
import { useDemanda } from "../../hooks/useDemanda.js";

const ProcurarDemandas = () => {
  // verificação de permissão de acesso do user
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  if(userType !== "solicitante" && userType !== "administrador") return navigate("/login"); 

  const userId = localStorage.getItem("userId");

  // recebe tipo de demanda passada na url
  const {tipoDemanda} = useParams();
  // parametros
    // ADM
      // aceitas -> vinculada a assistencia de status 
      //              em atendimento ou aberta, vinculada a assistencia

      // abertas -> todas demandas não atribuidas a assistencias

      // solicitações -> demandas solicitadas a assistencia

    // SOLICITANTE
      // minhas-demandas -> emitidas pelo user independente de status
      // ofertas -> demandas com orçamento ofertado por ats

  // status
    // aberta -> emitida pelo user
    // em atendimento -> vinculada a assistencia
    // concluida -> resolvida 
    // cancelada -> cancelada pelo user

  // funcao que busca lista de todas as demandas
  const {
    buscaDemandasPublicas,
    buscarDemandasDoSolicitante,
    buscaDemandaVinculadaAssistencia,
    buscarDemandasComOrcamentoGerado
  } = useDemanda();
  // funcao que busca todas assistencias
  const {
    buscaAssistenciasDoAdministrador,
  } = useAssistencia();

  //todas as demandas
  const [demandas, setDemandas] = useState([]);

  // buscar por demandas
  useEffect(() => {
    async function fetchData() {
      try {
        // caso user seja solicitante
        // lista apenas demandas emitidas por ele independente de status
        if(userType === "solicitante"){

          switch (tipoDemanda) {
            case "minhas-demandas":
              // buscar demandas do user
              const resBuscaDemandasDoSolicitante = await buscarDemandasDoSolicitante(userId);
              return setDemandas(resBuscaDemandasDoSolicitante);
            
            case "ofertas":
              // mostrar demandas com orçamento gerado por ats, onde o solicitante deve aceitar ou rejeitar
              const ofertasNaoRespondidas = await buscarDemandasComOrcamentoGerado(userId);
              setDemandas(ofertasNaoRespondidas);
              return;

            default:
              break;
          }
        }

        if(userType === "administrador"){
          // Para adm procurando novas demandas 
          if(tipoDemanda === "abertas"){

            // buscar demandas em aberto e públicas
            const resBuscaDemandasAbertasPublicas = await buscaDemandasPublicas();
            return setDemandas(resBuscaDemandasAbertasPublicas);
          }

          // buscar assistencias do adm
          const resBuscaAssistenciasDoAdministrador = await buscaAssistenciasDoAdministrador(userId);
          // buscar demandas vinculadas as ats do user
          const resBuscaDemandasAssistenciasAdministrador = await buscaDemandaVinculadaAssistencia(resBuscaAssistenciasDoAdministrador);
          // lista para demandas vinculadas as ats do adm
          const listaDemandasAssistenciasDoAdministrador = [];

          // mostrar todas as demandas que ja foram atribuidas as assistencias independente de status
          if(tipoDemanda === "historico"){
            resBuscaDemandasAssistenciasAdministrador.map((demanda)=>{
                const status = (
                  demanda.status === "Cancelada" || 
                  demanda.status === "Concluido" || 
                  demanda.status === "Em atendimento"
                );
                if(status){
                  listaDemandasAssistenciasDoAdministrador.push(demanda);
                };
            });
            return setDemandas(listaDemandasAssistenciasDoAdministrador);
          }
          
          // consulta por demandas atuais da assistencia
          if(tipoDemanda === "aceitas"){
            resBuscaDemandasAssistenciasAdministrador.map((demanda)=>{
              if(demanda.status === "Em atendimento"){
                listaDemandasAssistenciasDoAdministrador.push(demanda);
              };
            });
            // console.log("demandas atribuidas:",listaIdDemandasAssistenciasDoAdministrador);
            return setDemandas(listaDemandasAssistenciasDoAdministrador);
          }

          // consulta por demandas solicitadas a assistencia
          if(tipoDemanda === "solicitacoes"){
            resBuscaDemandasAssistenciasAdministrador.map((demanda)=>{
              if(demanda.status === "Aberto"){
                listaDemandasAssistenciasDoAdministrador.push(demanda);
              };
            });
            return setDemandas(listaDemandasAssistenciasDoAdministrador);
          }
        }

        //caso nenhuma opção aceita
        navigate("/erro");

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const [numLinhas, setNumLinhas] = useState(2);
  const cardsPorLinha = 3;
  const cardsVisiveis = numLinhas * cardsPorLinha;

  const demandasParaMostrar = demandas.slice(0, cardsVisiveis);

  const handleCarregarMais = () => {
    setNumLinhas((prev) => prev + 2);
  };

  return (
    <div style={{paddingTop: '80px', paddingBottom: '80px'}}>
      {/* <BarraPesquisa/> */}
      <Container className={styles.caixa}>
        {
          // verifica se há demandas
          (demandasParaMostrar.length > 0) 
            ? 
                demandasParaMostrar.map((demanda) => (
                  // passar props informando qual é o user que está acessando a page, para request no componente de card demanda
                  <CardDemanda 
                    key = {demanda.id}
                    // ids 
                    id = {demanda.id}
                    idResponsavel = {demanda.idSolicitante} // id do emissor da demanda
                    idDispositivo = {demanda.idDispositivo} 
                    idAssistenciaResponsavel = {demanda.assistencia} // id assistencia responsavel pela demanda
                    // infos da demanda
                    descricao = {demanda.descProblema}
                    observacoes = {demanda.observacoes}
                    dataEmissao = {demanda.dataEmissao}
                    status = {demanda.status}
                    // user buscador da demanda
                    userBuscador = {userType} // tipo de user que está buscando demandas
                    idBuscador = {userId}
                  />
                ))
            :
              <Card>
                <Card.Text>
                  <span>Não há demandas a serem carregadas.</span>
                </Card.Text>
              </Card> 
        }
      </Container>

      {cardsVisiveis < demandas.length && (
        <div>
          <Button onClick={handleCarregarMais}>Carregar mais</Button>
        </div>
      )}

      {/* PRECISA? */}
      {/* {cardsVisiveis > demandas.length && (
        <div className="text-center mt-4">
          <Button onClick={handleCarregarMenos}>Carregar menos</Button>
        </div>
      )} */}
    </div>
  );
};

export default ProcurarDemandas;
