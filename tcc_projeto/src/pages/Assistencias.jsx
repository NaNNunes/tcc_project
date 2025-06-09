// utilizado para mostrar todas as assistencias cadastradas
    // TODO aplicar filtro de asssitencias próximas e outros

// assistencias serão exibidas em card
// acredito eu que não há necessidade de criação de um componente para mostrar a assitencia ao user mas tudo bem

import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";

import { useEffect, useState } from "react"

import VisualizarAssistencia from "../componentes/assistencia_info/VisualizarAssistencia";

const Assistencias = () => {

    // busca todas as assistencias cadastradas e lista-as
    const [assistencias, setAssistencias] = useState([]);
    const url = import.meta.env.VITE_API_URL;
    useEffect(()=>{
        async function fetchData() {
            try {
                const request = await fetch(`${url}/assistencia`);
                const response = await request.json();
                setAssistencias(response);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    })

    const [numLinhas, setNumLinhas] = useState(2);
    const assistenciaPorLinha = 3;
    const assistenciasVisiveis = numLinhas * assistenciaPorLinha;

    const assistenciasParaMostrar = assistencias.slice(0, assistenciasVisiveis);

    const handleCarregarMais = () =>{
        setNumLinhas(prev => prev + 2);
    };


    return (
        <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row", padding:"1rem"}}>
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
        </div>
    )
}

export default Assistencias