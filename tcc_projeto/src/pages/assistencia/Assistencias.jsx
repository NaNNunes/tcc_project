// utilizado para mostrar todas as assistencias cadastradas
    // TODO aplicar filtro de asssitencias próximas, assitencia favorita

// acredito eu que não há necessidade de criação de um componente para mostrar a assitencia ao user mas tudo bem

import Form from "react-bootstrap/Form";
import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";

import { useEffect, useState } from "react"

import VisualizarAssistencia from "../../componentes/assistencia_info/VisualizarAssistencia";

import { useCadastroAssistencia } from "../../hooks/useApi";

const Assistencias = () => {

    // busca todas as assistencias cadastradas e lista-as
    const [assistencias, setAssistencias] = useState([]);

    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");

    const url = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        async function fetchData() {
            try {
                const reqBuscaAssistencias = await fetch(`${url}/assistencia`);
                const resBuscaAssistencias = await reqBuscaAssistencias.json();
                setAssistencias(resBuscaAssistencias);
                console.log("Todas assistencias:", resBuscaAssistencias);

                if(userType === "administrador"){
                    // lista para armazenar assistencias do adm
                    const listaAssitenciasAdministrador = [];

                    // mapeamento de assistencias listadas para filtro de asssitencias pertencentes ao adm
                    resBuscaAssistencias.map((assistencia)=>{
                        (assistencia.administradorId === userId) &&
                            listaAssitenciasAdministrador.push(assistencia);
                    })
                    setAssistencias(listaAssitenciasAdministrador);
                }
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