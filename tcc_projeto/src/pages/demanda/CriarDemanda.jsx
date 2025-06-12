import CadastroDemanda from '../../componentes/demanda/cadastro-demanda/CadastroDemanda.jsx'

import { Navigate } from 'react-router-dom';

const CriarDemanda = () => {

  const userType = localStorage.getItem("userType");
  if(userType !== "solicitante" && userType !== "administrador"){ 
    console.log("Acesso negado");
    return <Navigate to="/login"/>
  };
  
  return (
    <div>
      <CadastroDemanda />
    </div>
  )
}

export default CriarDemanda;