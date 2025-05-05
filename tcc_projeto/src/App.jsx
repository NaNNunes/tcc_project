import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";
  const isRegisterPage = location.pathname === "/cadastro";
  const isSecureQuest = location.pathname === "/pergunta-seguranca";
  const isCadastroAT = location.pathname === "/cadastro-assistencia"
  const isCadastroEndereco = location.pathname === "/cadastro-endereco"

  // UseEffect para adicionar e remover a classe no body
  React.useEffect(() => {
    if (isLoginPage || isRegisterPage || isSecureQuest || isCadastroAT || isCadastroEndereco) {
      document.body.classList.add("login-background");
    } else {
      document.body.classList.remove("login-background");
    }

    // Cleanup function para garantir que a classe seja removida ao sair da página de login
    return () => {
      document.body.classList.remove("login-background");
    };
  }, [isLoginPage]);

  return (
    <div className={isLoginPage ? "login-background" : ""}>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
