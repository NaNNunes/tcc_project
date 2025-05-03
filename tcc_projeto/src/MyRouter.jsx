import { createBrowserRouter } from "react-router-dom";

//import pages
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import Conta from "./componentes/conta-e-perfil/Conta.jsx";
import CriarDemanda from "./pages/criar_demanda/Criar_demanda.jsx"

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
    ],
  },
]);

export default router;