import CadastroDemanda from '../../componentes/cadastro-demanda/CadastroDemanda.jsx'

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/userContext.jsx';
import { Navigate } from 'react-router-dom';

const Criar_demanda = () => {
  const {usuarioNome, userId, userType} = useContext(AuthContext);
  // motivo de logout quando há F5 é o state de usuarioNome resetando no context
  if(localStorage.getItem("usuarioNome") === "Visitante") return <Navigate to="/login"/>
  
  useEffect(()=>{
    console.log(localStorage.getItem("userType"));
  },[])

  return (
    <>
      <CadastroDemanda />
    </>
  )
}

export default Criar_demanda