import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/userContext.jsx";
import InicioADM from "../../componentes/inicio/InicioADM";
import InicioSolic from "../../componentes/inicio/InicioSolic";
import InicioDeslog from "../../componentes/inicio/InicioDeslog";

const Inicio = () => {
  const navigate = useNavigate();
  const { userType, usuarioNome } = useContext(AuthContext);

  // Verificação de autenticação com useEffect
  useEffect(() => {
    if (userType === "Visitante") {
      console.log("Acesso negado - redirecionando para login");
      navigate("/login");
    }
  }, [userType, navigate]);

  // Renderização condicional
  switch (userType) {
    case "administrador":
      return <InicioADM />;
    case "solicitante":
      return <InicioSolic />;
    case "Visitante":
      return <InicioDeslog />;
    default:
      // Enquanto verifica ou estado indefinido
      return null; // Ou um componente de loading
  }
};

export default Inicio;
