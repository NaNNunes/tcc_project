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

  // UseEffect para adicionar e remover a classe no body
  React.useEffect(() => {
    if (isLoginPage || isRegisterPage) {
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
