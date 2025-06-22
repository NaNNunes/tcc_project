import OrcamentoForm from "../../componentes/orcamento/OrcamentoForm";

import { Navigate } from 'react-router-dom';

const Orcamento = () => {
    const userType = localStorage.getItem("userType");
    if(userType !== "solicitante" && userType !== "administrador"){ 
        console.log("Acesso negado");
        return <Navigate to="/login"/>
    };
  return (
    <div>
        <OrcamentoForm />
    </div>
  )
}

export default Orcamento