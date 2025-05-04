import { createBrowserRouter } from "react-router-dom";

//import pages
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import CriarDemanda from "./pages/criar_demanda/Criar_demanda.jsx"
import Conta from "./pages/conta_perfil/Conta.jsx";
import Assistencia_info from "./pages/assistencia_info/Assistencia_info.jsx";
import CadastroUser from "./pages/cadastro-user/CadastroUser.jsx";
import Pergunta from "./pages/cadastro-user/Pergunta.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      { path: "/login",
        element: <Login />
      },
      {
        path: "/cadastro",
        element: <CadastroUser/>,
      },
      {
        path: "/pergunta-seguranca",
        element: <Pergunta/>
      },
      {
        path: "/criar-demanda",
        element: <CriarDemanda />,
      },
      {
        path: "/conta",
        element: <Conta />,
      },
      {
        path: "/assistencia-info",
        element: <Assistencia_info/>
      },
    ],
  },
]);

export default router;
