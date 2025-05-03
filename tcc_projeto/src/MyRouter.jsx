import { createBrowserRouter } from "react-router-dom";

//import pages
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import CriarDemanda from "./pages/criar_demanda/Criar_demanda.jsx"
import Conta from "./pages/conta_perfil/Conta.jsx";
import Cadastro from "./pages/cadastro/cadastro.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      { path: "/login", element: <Login /> },
      {
        path: "/Conta",
        element: <Conta />,
      },
      {

        path: "/Criar-Demanda",
        element: <CriarDemanda />,
      },
      {
        path: "/cadastro",
        element: <Cadastro />,

      },
    ],
  },
]);

export default router;
