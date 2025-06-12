// Importação do card de demanda.
import CardDemanda from "../../componentes/demanda/card-demanda/CardDemanda";

// Importação do react-bootstrap.
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Importação do styles.
import styles from "./ProcurarDemandas.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProcurarDemandas = () => {
  const {isApenasPrivadas} = useParams();

  //todas as demandas
  const [demandas, setDemandas] = useState([]);

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const url = import.meta.env.VITE_API_URL;

  // buscar por demandas
  useEffect(() => {
    async function fetchData() {
      try {
        // busca todas as demandas
        const reqBuscaDemandas = await fetch(`${url}/demanda`);
        const resBuscaDemandas = await reqBuscaDemandas.json();

        // caso user seja solicitante
        // lista apenas demandas emitidas por ele
        if(userType == "solicitante"){

          // lista para armazenas demandas emitidas pelo solicitante
          const listaDemandasDoSolicitante = [];

          // mapeia demandas identificando e saperando demandas do solicitante pelo id
          resBuscaDemandas.map((demanda)=>{
            (demanda.solicitante_id === userId) && listaDemandasDoSolicitante.push(demanda);
          });

          // return para finalizar o script
          return setDemandas(listaDemandasDoSolicitante);
        }

        // caso solicitante seja adm
        
        // lista para armazenas apenas demandas públicas
        const listaDemandasPublicas = [];

        // mapeamento de demandas para encontrar apenas demandas publicas e definí-las
        resBuscaDemandas.map((demanda)=>{
          if(demanda.assistencia === "Público"){
            listaDemandasPublicas.push(demanda)
          }
        })
        setDemandas(listaDemandasPublicas);
        // console.log("Todas as demandas publicas:", listaDemandasPublicas);

        // caso seja uma consulta apenas por demandas das assistencias do adm
        if(isApenasPrivadas === "true"){
            // Busca por assitencias vinculadas ao adm
            const request = await fetch(`${url}/assistencia`);
            const response = await request.json();
            
            // pegar resposta e verificar quais assistencias da lista possuem o id do adm
            // lista para armazenar id de assistencias do adm
            const listaIdAssistencia = [];

            // mapeamento de lista de todas assistencias para filtragem e insersao à lista de id assistencias
            // apenas assistencias que possuam id do adm
            response.map((assistencia) =>{
              (assistencia.administradorId === userId) &&
                listaIdAssistencia.push(assistencia.id);
            })
            // console.log("Assistencias do adm:", listaIdAssistencia);

            // lista para armazenar apenas demandas que estejam atribuidas a assistencias do adm
            const listaDemandasAssistenciasDoAdministrador = [];
            
            // mapeia demandas e verifica quais demandas estão vinculadas as assistencias do adm
            resBuscaDemandas.map((demanda) =>{
              listaIdAssistencia.map((idAssistencia)=>{
                (demanda.assistencia === idAssistencia) &&
                  listaDemandasAssistenciasDoAdministrador.push(demanda);
              })
            })
            setDemandas(listaDemandasAssistenciasDoAdministrador);
            // console.log("demandas atribuidas:",listaIdDemandasAssistenciasDoAdministrador);
        }
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
            <CardDemanda
                  key={demanda.id}
                  id={demanda.id}
                  idDispostivo={demanda.idDispostivo}
                  solicitanteId={demanda.solicitante_id}
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
