import { useContext } from "react";
import { AuthContext } from "../context/userContext";

// verifica credenciais de login
export function useVerificaLogin() {
  // funçoes do context para salvar id e tipo de user
  const { login } = useContext(AuthContext);

  const verificaLogin = (data, solicitantes, administradores) => {
    // verifica se email ou senha foi encontrado em solicitantes
    const solicitante2find = solicitantes.find((solicitante) => {
      console.log(
        "solicitante: ",
        solicitante.cpf === data.loginOuCpf ||
          solicitante.email === data.loginOuCpf
      );
      return (
        solicitante.cpf === data.loginOuCpf ||
        solicitante.email === data.loginOuCpf
      );
    });

    // verifica se email ou senha foi encontrado em administradores
    const administrador2find = administradores.find((administrador) => {
      console.log(
        "administrador: ",
        administrador.cpf === data.loginOuCpf ||
          administrador.email === data.loginOuCpf
      );
      return (
        administrador.cpf === data.loginOuCpf ||
        administrador.email === data.loginOuCpf
      );
    });

    // verifica se solcitante foi encontrado e se senha inserida é a mesma do cadastro
    if (
      solicitante2find !== undefined &&
      solicitante2find.senha === data.senha
    ) {
      // verifica se cadastro do solicitante é válido
      if (solicitante2find.isValido !== true) {
        return alert("user Inválido");
      }

      login(solicitante2find, "solicitante");
      return "Login efetuado com sucesso";
    }
    // verifica se solcitante foi encontrado e se senha inserida é a mesma do cadastro
    else if (
      administrador2find !== undefined &&
      administrador2find.senha === data.senha
    ) {
      // verifica se cadastro do solicitante é válido
      if (administrador2find.isValido !== true) {
        return alert("user Inválido");
      }

      login(administrador2find, "administrador");
      return "Login efetuado com sucesso";
    } // caso credenciais não localizada em nenhuma das tabelas
    else {
      return "usuario ou senha inválido";
    }
  };

  return { verificaLogin };
}
