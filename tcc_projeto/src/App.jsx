import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./componentes/NavBar/MenuNavegacao.jsx";
import Footer from "./componentes/footer/Footer.jsx";

function App() {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";
  const isRegisterPage = location.pathname === "/cadastro";
  const isSecureQuest = location.pathname === "/pergunta-seguranca";
  const isCadastroAT = location.pathname === "/cadastro-assistencia";
  const isCadastroEndereco = location.pathname === "/cadastro-endereco";
  const isCadastroPagamento = location.pathname === "/cadastro-pagamento";

  const isAuthPage =
    isLoginPage ||
    isRegisterPage ||
    isSecureQuest ||
    isCadastroAT ||
    isCadastroEndereco ||
    isCadastroPagamento;

  useEffect(() => {
    if (isAuthPage) {
      document.body.classList.add("login-background");
      document.body.classList.remove("background");
    } else {
      document.body.classList.add("background");
      document.body.classList.remove("login-background");
    }

    // Limpeza ao desmontar
    return () => {
      document.body.classList.remove("login-background");
      document.body.classList.remove("background");
    };
  }, [isAuthPage]);

  return (
    <>
      <Navbar />
      <Container style={{ maxWidth: "100%", margin: "0", padding: "0" }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
