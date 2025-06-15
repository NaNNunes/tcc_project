// Importação do card de demanda.
import CardDemanda from "../../componentes/demanda/card-demanda/CardDemanda";

// Importação do react-bootstrap.
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Importação do styles.
import styles from "./ProcurarDemandas.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProcurarDemandas = () => {
  const navigate = useNavigate();
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

  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  if(userType !== "solicitante" && userType !== "administrador") return navigate("/login"); 

  //todas as demandas
  const [demandas, setDemandas] = useState([]);

  const url = import.meta.env.VITE_API_URL;

  // buscar por demandas
  useEffect(() => {
    async function fetchData() {
      try {
        // busca todas as demandas
        const reqBuscaDemandas = await fetch(`${url}/demanda`);
        const resBuscaDemandas = await reqBuscaDemandas.json();

        // caso user seja solicitante
        // lista apenas demandas emitidas por ele independente de status
        if(userType === "solicitante" && tipoDemanda === "minhas-demandas"){

          // lista para armazenas demandas 
          const listaDemandasDoSolicitante = [];

          // mapeia demandas identificando e saperando demandas do solicitante pelo id
          resBuscaDemandas.map((demanda)=>{
            (demanda.solicitante_id === userId) && 
              listaDemandasDoSolicitante.push(demanda);
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
              if(demanda.assistencia === "Público"){
                listaDemandasPublicas.push(demanda)
              }
            })
  
            // console.log("Todas as demandas publicas:", listaDemandasPublicas);
            return setDemandas(listaDemandasPublicas);
          }

          // Busca por assitencias
          const request = await fetch(`${url}/assistencia`);
          const response = await request.json();
          // lista para armazenar id de assistencias do adm
          const listaIdAssistencia = [];

          // mapeamento de lista de todas assistencias para filtragem e insersao à lista de id assistencias
          // apenas assistencias que possuam id do adm
          response.map((assistencia) =>{
            (assistencia.administradorId === userId) &&
              listaIdAssistencia.push(assistencia.id);
          })
          // console.log("Assistencias do adm:", listaIdAssistencia);
          
          // caso seja uma consulta apenas por demandas das assistencias do adm
          if(tipoDemanda === "aceitas"){
            // lista para armazenar apenas demandas que estejam atribuidas a assistencias do adm
            const listaDemandasAssistenciasDoAdministrador = [];
            
            // mapeia demandas e verifica quais demandas estão vinculadas as assistencias do adm 
            // que estejam em andamento ou apenas aceitas 
            resBuscaDemandas.map((demanda) =>{
              listaIdAssistencia.map((idAssistencia)=>{
                const isDemandaVinculada = demanda.assistencia === idAssistencia;
                const statusAberto = demanda.status === "Aberto";
                const statusEmAndamento = demanda.status === "Em andamento";
                (isDemandaVinculada && (statusAberto || statusEmAndamento)) &&
                  listaDemandasAssistenciasDoAdministrador.push(demanda);
              })
            });
            console.log(listaDemandasAssistenciasDoAdministrador);
            return setDemandas(listaDemandasAssistenciasDoAdministrador);
            // console.log("demandas atribuidas:",listaIdDemandasAssistenciasDoAdministrador);
          }

          // mostrar todas as demandas que ja foram atribuidas as assistencias
          if(tipoDemanda === "historico"){
            
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
    // parou de carregar kkk
    <div style={{paddingTop: '80px', paddingBottom: '80px'}}>
      <Container className={styles.caixa}>
        {
          demandasParaMostrar.map((demanda) => (
            // passar props informando qual é o user que está acessando a page, para request no componente de card demanda
            <CardDemanda
                  key={demanda.id} 
                  id={demanda.id}
                  idResponsavel={demanda.solicitante_id} // id do emissor da demanda
                  idDispostivo={demanda.idDispostivo}
                  dataEmissao={demanda.dataEmissao}
                  dominioDemanda={demanda.assistencia} // mostrar em algum lugar do card
            />
          ))
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
