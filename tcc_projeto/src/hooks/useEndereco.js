const url = import.meta.env.VITE_API_URL;

export function useEndereco() {

  // atualiza endereco do user
  const atualizarEndereco = async (idEndereco, data) => {
    const request = await fetch(`${url}/endereco/${idEndereco}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    const response = await request.json();
    const endereco_id = response.id;
    setaIdEmUser(endereco_id);

    location.reload();

    return response;
  };

  // funcao para buscar endereco pelo cep
  const buscaEnderecoByZipCode = async (zipCode) =>{
    const request = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
    const response = await request.json();

    return response;
  }

  // busca Endereco By Id
  const buscaEnderecoById = async (idEndereco) => {
    const request = await fetch(`${url}/endereco/${idEndereco}`);
    const response = await request.json();

    return response;
  };

  // cadastra endereco
  const cadastrarEndereco = async (data) => {
    const userType = localStorage.getItem("tipoUsuario") || localStorage.getItem("userType");

    const request = await fetch(`${url}/endereco`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    const idEndereco = response.id;
    // define id do endereco como chave estrangeira
    
    if(userType === "administrador"){
      const isEnderecoAtribuidoAssistencia = await defineIdEmAssistencia(idEndereco);
      console.log("isEnderecoAtribuidoAssistencia:",isEnderecoAtribuidoAssistencia);
      if(isEnderecoAtribuidoAssistencia){
        // retorna endereço fora cadastrado e user recebeu o id do endereco
        return request.ok;
      }
    }

    if(userType === "solicitante"){
      const isEnderecoAtribuidoSolicitante =  await defineIdEmSolicitante(idEndereco);
      if(isEnderecoAtribuidoSolicitante){
        // retorna endereço fora cadastrado e user recebeu o id do endereco
        return request.ok;
      }
    }
  };

  const defineIdEmAssistencia = async (idEndereco) =>{
    const enderecoId = {
      "idEndereco": idEndereco,
    };
    const id = localStorage.getItem("assistenciaId");
    console.log("id Assistencia:",id);
    const request = await fetch(`${url}/assistencia/${id}`, {
      method: "PATCH",
      body: JSON.stringify(enderecoId),
    });

    if(request.ok){
      localStorage.removeItem("assistenciaId");
      return request.ok;
    }
  }

  const defineIdEmSolicitante = async (idEndereco) =>{
    const enderecoId = {
      "idEndereco": idEndereco,
    };
    const id = localStorage.getItem("userId");

    const request = await fetch(`${url}/solicitante/${id}`, {
      method: "PATCH",
      body: JSON.stringify(enderecoId),
    });

    return request.ok;
  }

  return { 
    atualizarEndereco,
    buscaEnderecoById,
    buscaEnderecoByZipCode,
    cadastrarEndereco, 
  };
}