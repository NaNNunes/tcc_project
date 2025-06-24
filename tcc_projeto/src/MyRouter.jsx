import { createBrowserRouter } from "react-router-dom";

//import pages
// POR FAVOR DEIXE EM ORDEM ALFABÉTICA
import App from "./App.jsx";
import Assistencias from "./pages/assistencia/Assistencias.jsx";
import AssistenciaInfo from "./pages/assistencia/AssistenciaInfo.jsx";
import CadastroAssistencia from "./pages/cadastro-user/CadastroAssistencia.jsx";
import CadastroEndereco from "./pages/cadastro-user/CadastroEndereco.jsx";
import CadastroNovaAssistencia from "./pages/assistencia/CadastroNovaAssistencia.jsx";
import CadastroPagamento from "./pages/cadastro-user/CadastroPagamento.jsx";
import CadastroUser from "./pages/cadastro-user/CadastroUser.jsx";
import Conta from "./pages/conta-perfil/Conta.jsx";
import CriarDemanda from "./pages/demanda/CriarDemanda.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/home/Home.jsx";
import Inicio from "./pages/inicio/Inicio.jsx";
import Login from "./pages/login/Login.jsx";
import Orcamento from "./pages/orcamento/Orcamento.jsx";
import PerguntaSeguranca from "./pages/cadastro-user/PerguntaSeguranca.jsx";
import Politicas from "./pages/termos/Politicas.jsx";
import ProcurarDemandas from "./pages/demanda/ProcurarDemandas.jsx";
import SelecaoUsuario from "./pages/selecao-usuario/SelecaoUsuario.jsx";
import Sobre from "./pages/sobre/Sobre.jsx";
import Termos from "./pages/termos/Termos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // POR FAVOR DEIXE EM ORDEM ALFABÉTICA
      {
        path: "/",
        element: <Inicio/>,
      },
      {
        path: "/inicio",
        element: <Inicio/>,
      },
      {
        path: "/assistencia-info",
        element: <AssistenciaInfo />,
      },
      {
        path: "/buscar-assistencias/:tipoAssistencia",
        element: <Assistencias />,
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
        path: "/cadastro-nova-assistencia",
        element: <CadastroNovaAssistencia />,
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
        path: "/criar-demanda/:idDemanda",
        element: <CriarDemanda />,
      },
      {
        path: "/erro",
        element: <ErrorPage />,
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
        path: "/orcamento/:idDemanda",
        element: <Orcamento />,
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
        path: "/procurar-demandas/:tipoDemanda",
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
