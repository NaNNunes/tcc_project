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
    const request = await fetch(`${url}/endereco`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    const endereco_id = response.id;
    // define id do endereco como chave estrangeira
    const isEnderecoAtribuido = await setaIdEmUser(endereco_id);

    if(isEnderecoAtribuido){
      // retorna endereço fora cadastrado e user recebeu o id do endereco
      return request.ok;
    }
  };

  // define id de endereco de acordo com o user, solicitante ou pseudo user
  const setaIdEmUser = async (endereco_id) => {
    // define quem receberá o id do endereco
    const tipo = localStorage.getItem("userType");
    const user =
      tipo !== "Visitante" && tipo === "solicitante"
        ? "solicitante"
        : "assistencia";

    // pega o id do endereco
    const id =
      user !== "Visitante" && tipo === "solicitante"
        ? localStorage.getItem("userId")
        : localStorage.getItem("assistenciaId");

    const enderecoId = {
      id_endereco: endereco_id,
    };

    const request = await fetch(`${url}/${user}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(enderecoId),
    });

    return request.ok;
  };

  return { 
    atualizarEndereco,
    buscaEnderecoById,
    buscaEnderecoByZipCode,
    cadastrarEndereco 
  };
}