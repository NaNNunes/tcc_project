import { createBrowserRouter } from "react-router-dom";

//import pages
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import Conta from "./pages/conta_perfil/Conta.jsx";
import Assistencia_info from "./pages/assistencia_info/Assistencia_info.jsx";
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
      { path: "/login",
        element: <Login />
      },
      {
        path: "/cadastro",
        element: <Cadastro />,
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
