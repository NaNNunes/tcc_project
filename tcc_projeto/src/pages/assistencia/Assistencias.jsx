// utilizado para mostrar todas as assistencias cadastradas

import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";

import { useEffect, useState } from "react"

import { useCadastroAssistencia } from "../../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";

import VisualizarAssistencia from "../../componentes/assistencia/CardAssistencia";

const Assistencias = () => {

    const {tipoAssistencia} = useParams();
    const navigate = useNavigate();

    // busca todas as assistencias cadastradas e lista-as
    const [assistencias, setAssistencias] = useState([]);

    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");

    const url = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        async function fetchData() {
            try {
                // lista de assistencias
                const reqBuscaAssistencias = await fetch(`${url}/assistencia`);
                const resBuscaAssistencias = await reqBuscaAssistencias.json();

                // caso user seja adm lista apenas assistencias pertencentes a ele
                if(tipoAssistencia === "administrador" && userType === "administrador"){
                    // lista para armazenar assistencias do adm
                    const listaAssitenciasAdministrador = [];

                    // mapeamento de assistencias listadas para filtro de asssitencias pertencentes ao adm
                    resBuscaAssistencias.map((assistencia)=>{
                        (assistencia.administradorId === userId) &&
                            listaAssitenciasAdministrador.push(assistencia);
                    })

                    return setAssistencias(listaAssitenciasAdministrador);
                }

                // caso user seja solicitante
                if(userType === "solicitante"){

                    // filtro definido pela url para mostrar todas assistencias
                    if(tipoAssistencia === "todas"){
                        return setAssistencias(resBuscaAssistencias);
                    }

                    // filtro definido pela url para mostrar assistencias favoritas
                    if(tipoAssistencia === "favoritas"){
                        const reqBuscaMatchs = await fetch(`${url}/assistencia_Fav_Solicitante`);
                        const resBuscaMatchs = await reqBuscaMatchs.json();

                        const assistenciaFavoritasDoSolicitante = [];

                        // mapeia lista de demandas e mapeia lista de assistencias
                        // verificando se o match pertence ao solicitante e a assistencia pertence ao match
                        // inserindo toda instancia encontrada na lista de assistencias favoritas do solicitante
                        resBuscaMatchs.map((match)=>{
                            resBuscaAssistencias.map((assistencia)=>{
                                const isMatchSolicitante = match.id_solicitante === userId;
                                const isAssistenciaFav = match.id_assistencia === assistencia.id;

                                (isMatchSolicitante && isAssistenciaFav) &&
                                    assistenciaFavoritasDoSolicitante.push(assistencia);
                            });
                        });
                        return setAssistencias(assistenciaFavoritasDoSolicitante);
                    }
                }

                // caso nenhuma das ocasioes carregar 404
                navigate("/erro");

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[])

    const [numLinhas, setNumLinhas] = useState(2);
    const assistenciaPorLinha = 3;
    const assistenciasVisiveis = numLinhas * assistenciaPorLinha;

    const assistenciasParaMostrar = assistencias.slice(0, assistenciasVisiveis);

    const handleCarregarMais = () =>{
        setNumLinhas(prev => prev + 2);
    };


    return (
        <div className="p-3">
            <Row>
                {
                    assistenciasParaMostrar.map((assistencia) =>(
                        <Col lg={4} sm={6} xs={12} key={assistencia.id}>
                            <VisualizarAssistencia
                                key={assistencia.id}
                                idAssistencia={assistencia.id}
                                nome={assistencia.nomeFantasia}
                                cnpj={assistencia.cnpj}
                                telefone={assistencia.assistenciaTelefone}
                                idEndereco={assistencia.id_endereco}
                            />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default Assistencias