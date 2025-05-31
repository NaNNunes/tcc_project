import CadastroDemanda from '../../componentes/cadastro-demanda/CadastroDemanda.jsx'

import { useContext } from 'react';
import { AuthContext } from '../../context/userContext.jsx';
import { Navigate } from 'react-router-dom';

const Criar_demanda = () => {
  const {usuarioNome} = useContext(AuthContext);
  if(usuarioNome === "Visitante") return <Navigate to="/login"/>
  
  return (
    <>
      <CadastroDemanda />
    </>
  )
}

export default Criar_demanda