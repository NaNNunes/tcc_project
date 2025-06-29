import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/userContext.jsx";
import InicioADM from "../../componentes/inicio/InicioADM";
import InicioSolic from "../../componentes/inicio/InicioSolic";
import Home from "../home/Home.jsx";

const Inicio = () => {
  const navigate = useNavigate();
  const { userType, usuarioNome } = useContext(AuthContext);
  
  switch (userType) {
    case "administrador":
      return <InicioADM />;
    case "solicitante":
      return <InicioSolic />;
    case "Visitante":
      return <Home />;
    default:
      return <Home />;
  }
};

export default Inicio;
