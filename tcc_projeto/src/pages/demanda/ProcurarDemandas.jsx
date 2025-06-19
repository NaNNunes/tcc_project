// Importação do card de demanda.
import CardDemanda from "../../componentes/demanda/card-demanda/CardDemanda";

// Importação do react-bootstrap.
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Importação do styles.
import styles from "./ProcurarDemandas.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDemanda, useAssistencia } from "../../hooks/useApi";

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

    // SOLICITANTE
      // minhas-demandas -> emitidas pelo user independente de status

  // status
    // aberta -> emitida pelo user
    // em atendimento -> vinculada a assistencia
    // concluida -> resolvida 
    // cancelada -> cancelada pelo user

  // funcao que busca lista de todas as demandas
  const {buscaDemandas} = useDemanda();
  // funcao que busca todas assistencias
  const {buscaAssistencias} = useAssistencia();

  //todas as demandas
  const [demandas, setDemandas] = useState([]);

  // buscar por demandas
  useEffect(() => {
    async function fetchData() {
      try {
        // busca todas as demandas
        const resBuscaDemandas = await buscaDemandas();

        // caso user seja solicitante
        // lista apenas demandas emitidas por ele independente de status
        if(userType === "solicitante" && tipoDemanda === "minhas-demandas"){

          // lista para armazenas demandas 
          const listaDemandasDoSolicitante = [];

          // mapeia demandas identificando e saperando demandas do solicitante pelo id
          resBuscaDemandas.map((demanda)=>{
            if(demanda.solicitante_id === userId){
              listaDemandasDoSolicitante.push(demanda);
            }
          });

          // return para finalizar o script
          return setDemandas(listaDemandasDoSolicitante);
        }

        if(userType === "administrador"){
          // Para adm procurando novas demandas 
          if(tipoDemanda === "abertas"){
            // caso solicitante seja adm
            // lista para armazenas apenas demandas públicas
            const listaDemandasPublicas = [];
            // mapeamento de demandas para encontrar apenas demandas publicas e definí-las
            resBuscaDemandas.map((demanda)=>{
              const demandaPublica = demanda.assistencia === "Público";
              const isStatusAberto = demanda.status === "Aberto"
              if(demandaPublica && isStatusAberto){
                listaDemandasPublicas.push(demanda)
              }
            })
            // console.log("Todas as demandas publicas:", listaDemandasPublicas);
            return setDemandas(listaDemandasPublicas);
          }

          // Busca por assitencias
          const resBuscaAssistencias = await buscaAssistencias();
          // lista para armazenar id de assistencias do adm
          const listaIdAssistencias = [];

          // mapeamento de lista de todas assistencias para filtragem e insersao à lista de id assistencias
          // apenas assistencias que possuam id do adm
          resBuscaAssistencias.map((assistencia) =>{
            if(assistencia.administradorId === userId){
              listaIdAssistencias.push(assistencia.id);
            }
          })
          // console.log("Assistencias do adm:", listaIdAssistencia);
          
          // lista para armazenar apenas demandas que estejam atribuidas a assistencias do adm
          const listaDemandasAssistenciasDoAdministrador = [];

          // mostrar todas as demandas que ja foram atribuidas as assistencias independente de status
          if(tipoDemanda === "historico"){
            // mapeia lista de demandas
            resBuscaDemandas.map((demanda) =>{
              // mapeia lista de assistencias
              listaIdAssistencias.map((idAssistencia)=>{
                // verifica se assistencia responsavel pela demanda é a mesma do do id
                const isDemandaVinculada = demanda.assistencia === idAssistencia;
                // status aceitaveis para demanda
                const status = (
                  demanda.status === "Cancelada" || 
                  demanda.status === "Concluido" || 
                  demanda.status === "Em atendimento"
                );

                // demanda vinculada a assitencia e status dentro dos parametro
                if(isDemandaVinculada && status){
                  listaDemandasAssistenciasDoAdministrador.push(demanda);
                }
              })
            });
            // console.log(listaDemandasAssistenciasDoAdministrador);
            return setDemandas(listaDemandasAssistenciasDoAdministrador);
          }
          
          // consulta por demandas atuais da assistencia
          if(tipoDemanda === "aceitas"){
            // mapeia demandas e verifica quais demandas estão vinculadas as assistencias do adm 
            // que estejam em andamento ou apenas aceitas 
            resBuscaDemandas.map((demanda) =>{
              listaIdAssistencias.map((idAssistencia)=>{
                const isDemandaVinculada = demanda.assistencia === idAssistencia;
                // const statusAberto = demanda.status === "Aberto";
                // Removi statusAberto ||
                const statusEmAtendimento = demanda.status === "Em atendimento";
                if(isDemandaVinculada && statusEmAtendimento){
                  listaDemandasAssistenciasDoAdministrador.push(demanda);
                }
              })
            });
            // console.log("demandas atribuidas:",listaIdDemandasAssistenciasDoAdministrador);
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
                    idResponsavel = {demanda.solicitante_id} // id do emissor da demanda
                    idDispostivo = {demanda.idDispostivo} 
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
