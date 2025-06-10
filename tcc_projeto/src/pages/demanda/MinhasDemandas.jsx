// OBJETIVO: mostrar demandas do user
    // TODOS filtros, busca por status, por assistencia, canceladas ...

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CardDemanda from "../../componentes/card-demanda/CardDemanda";
import { useEffect, useState } from "react";

const MinhasDemandas = () => {

    // Listar demandas
    const [demandas, setDemandas] = useState([]);
    const url = import.meta.env.VITE_API_URL;
    useEffect(()=>{
        async function fetchData() {
            try {
                const request = await fetch(`${url}/demanda`);
                const response = await request.json(); 
                setDemandas(response);
                console.log("Todas as Demandas:",response)      
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[])

  return (
    <div >
        <Row>
            {
                demandas.map((demanda)=>(
                    (demanda.solicitante_id === localStorage.getItem("userId")) &&
                    // se quiser, deixar responsivo na mão
                        <Col key={demanda.id} sm={12} md={6} lg={6} xxl={4}>
                            <CardDemanda
                                key={demanda.id}
                                id={demanda.id}
                                idDispostivo={demanda.idDispostivo}
                                solicitanteId={demanda.solicitante_id}
                                dataEmissao={demanda.dataEmissao}
                            />
                        </Col>
                ))
            }
        </Row>
    </div>
  )
}

export default MinhasDemandas