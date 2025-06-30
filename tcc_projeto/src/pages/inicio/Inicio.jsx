import InicioADM from "../../componentes/inicio/InicioADM";
import InicioSolic from "../../componentes/inicio/InicioSolic";
import Home from "../home/Home.jsx";

const Inicio = () => {
  const userType = localStorage.getItem("userType");

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
