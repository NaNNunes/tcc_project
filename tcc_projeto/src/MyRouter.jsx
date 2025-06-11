import { createBrowserRouter } from "react-router-dom";

//import pages
// POR FAVOR DEIXE EM ORDEM ALFABÉTICA
import App from "./App.jsx";
import Assistencias from "./pages/assistencia/Assistencias.jsx";
import Assistencia_info from "./pages/assistencia/Assistencia_info.jsx";
import CadastroAssistencia from "./pages/cadastro-user/CadastroAssistencia.jsx";
import CadastroEndereco from "./pages/cadastro-user/CadastroEndereco.jsx";
import CadastroPagamento from "./pages/cadastro-user/CadastroPagamento.jsx";
import CadastroUser from "./pages/cadastro-user/CadastroUser.jsx";
import Conta from "./pages/conta_perfil/Conta.jsx";
import CriarDemanda from "./pages/demanda/Criar_demanda.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import PerguntaSeguranca from "./pages/cadastro-user/PerguntaSeguranca.jsx";
import Politicas from "./pages/termos/Politicas.jsx";
import ProcurarDemandas from "./pages/demanda/ProcurarDemandas.jsx";
import SelecaoUsuario from "./pages/selecao_usuario/SelecaoUsuario.jsx";
import Sobre from "./pages/sobre/Sobre.jsx";
import Termos from "./pages/termos/Termos.jsx";
import Inicio from "./pages/inicio/Inicio.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // POR FAVOR DEIXE EM ORDEM ALFABÉTICA
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/assistencia-info",
        element: <Assistencia_info />,
      },
      {
        path: "/buscar-assistencias/:tipoAssistencia",
        element: <Assistencias />
      },
      {
        path: "/cadastro",
        element: <CadastroUser />,
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
        path: "/conta",
        element: <Conta />,
      },
      {
        path: "/criar-demanda",
        element: <CriarDemanda />,
      },
      {
        path: "/erro",
        element: <errorElement />
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/inicio",
        element: <Inicio />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pergunta-seguranca",
        element: <PerguntaSeguranca />,
      },
      {
        path: "/politica-de-privacidade",
        element: <Politicas />,
      },
      {
        path: "/procurar-demandas/:isApenasPrivadas",
        element: <ProcurarDemandas />,
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
        path: "/termos-de-uso",
        element: <Termos />,
      },
    ],
  },
]);

export default router;
