import { createBrowserRouter } from "react-router-dom";

//import pages
import App from "./App.jsx";
import Assistencia_info from "./pages/assistencia_info/Assistencia_info.jsx";
import CadastroAssistencia from "./pages/cadastro-user/CadastroAssistencia.jsx";
import CadastroEndereco from "./pages/cadastro-user/CadastroEndereco.jsx";
import CadastroPagamento from "./pages/cadastro-user/CadastroPagamento.jsx";
import CadastroUser from "./pages/cadastro-user/CadastroUser.jsx";
import Conta from "./pages/conta_perfil/Conta.jsx";
import CriarDemanda from "./pages/criar_demanda/Criar_demanda.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import PerguntaSeguranca from "./pages/cadastro-user/PerguntaSeguranca.jsx";
import SelecaoUsuario from "./pages/selecao_usuario/SelecaoUsuario.jsx";
import Sobre from "./pages/sobre/Sobre.jsx";
import ProcurarDemandas from "./pages/procurar-demandas/ProcurarDemandas.jsx";
import Inicial from "./pages/inicial/Inicial.jsx";
import Termos from "./pages/termos/Termos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {

        path: "/inicial",
        element: <Inicial />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/cadastro",
        element: <CadastroUser />,
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
        element: <Assistencia_info />,
      },
      {
        path: "/pergunta-seguranca",
        element: <PerguntaSeguranca />,
      },
      {
        path: "/cadastro-assistencia",
        element: <CadastroAssistencia />,
      },
      {
        path: "/cadastro-endereco",
        element: <CadastroEndereco />,
      },
      {
        path: "/cadastro-pagamento",
        element: <CadastroPagamento />,
      },
      {
        path: "/selecao-perfil",
        element: <SelecaoUsuario />,
      },
      {
        path: "/sobre",
        element: <Sobre />,
      },
      {
        path: "/procurar-demandas",
        element: <ProcurarDemandas />,
      },
      {
        path: "/termos-de-uso",
        element: <Termos />
      }
    ],
  },
]);

export default router;
