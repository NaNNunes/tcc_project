// utilizado para mostrar todas as assistencias cadastradas

import Container from "react-bootstrap/Container";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import styles from './Assistencias.module.css';

import VisualizarAssistencia from "../../componentes/assistencia/CardAssistencia";

import { useAssistencia } from "../../hooks/useAssistencia.js";
import { useLikes } from "../../hooks/useLikes.js";

const Assistencias = () => {
  const navigate = useNavigate();
  
  const { tipoAssistencia } = useParams();
  // busca todas as assistencias cadastradas e lista-as
  const [assistencias, setAssistencias] = useState([]);
  
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");

  const {
    buscaAssistencias,
    buscaAssistenciasDoAdministrador,
    buscarAssistenciasFavoritasSolicitante
  } = useAssistencia();

  const {
    buscaLikesSolicitante
  } = useLikes();

  useEffect(() => {
    async function fetchData() {
      try {
        const isAssisitenciaAdm = tipoAssistencia === "administrador";
        const isUserAdm = userType === "administrador";
        const isSolicitante = userType === "solicitante";

        // caso user seja adm lista apenas assistencias pertencentes a ele
        if ( isAssisitenciaAdm && isUserAdm){
          const resBuscaAssistencias = await buscaAssistenciasDoAdministrador(userId);
          setAssistencias(resBuscaAssistencias);
          return;
        }
        
        // caso user seja solicitante
        if (isSolicitante) {
          switch (tipoAssistencia){
            case "todas":{
              // busca todas assistencias
              const resBuscaTodasAssistencias = await buscaAssistencias();
              setAssistencias(resBuscaTodasAssistencias);
              return;
            }
            case "favoritas":{
              // busca todos os likes do solicitante
              const likes = await buscaLikesSolicitante(userId);
              // busca todas assistencias que possuam id nos likes do solicitante
              const assistenciasFavoritas = await buscarAssistenciasFavoritasSolicitante(likes, userId);
              setAssistencias(assistenciasFavoritas);
              return;
            }
            default:
              break;
          }
        }
        // caso nenhuma das ocasioes carregar 404
        navigate("/erro");
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [numLinhas, setNumLinhas] = useState(2);
  const assistenciaPorLinha = 3;
  const assistenciasVisiveis = numLinhas * assistenciaPorLinha;

  const assistenciasParaMostrar = assistencias.slice(0, assistenciasVisiveis);

  const handleCarregarMais = () => {
    setNumLinhas((prev) => prev + 2);
  };

  return (
    <div style={{ marginTop: "80px", marginBottom: "80px", padding: '0px' }}>
      <Container className={styles.caixa}>
        {assistenciasParaMostrar.map((assistencia) => (
          <VisualizarAssistencia
            key={assistencia.id}
            idAssistencia={assistencia.id}
            nome={assistencia.nomeFantasia}
            razaoSocial={assistencia.razaoSocial}
            cnpj={assistencia.cnpj}
            email={assistencia.assistenciaEmail}
            telefone={assistencia.assistenciaTelefone}
            idEndereco={assistencia.idEndereco}
          />
        ))}
      </Container>
    </div>
  );
};

export default Assistencias;
