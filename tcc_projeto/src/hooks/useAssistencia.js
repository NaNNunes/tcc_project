

const url = import.meta.env.VITE_API_URL;

// cadastra assistencia
export function useAssistencia() {

  // Lista todas as assistencias
  const buscaAssistencias = async () => {
    const request = await fetch(`${url}/assistencia`);
    const response = await request.json();

    return response;
  };

  const buscaAssistenciasDoAdministrador = async (idAdm) =>{
    const request = await fetch(`${url}/assistencia`);
    const response = await request.json();

    // lista todas assistencias que tenha o id do adm
    const listaAssistenciasAdministrador = response.filter(
      assistencia => assistencia.administradorId === idAdm
    );

    return listaAssistenciasAdministrador;
  }

  const buscarAssistenciasFavoritasSolicitante = async (likes) =>{
    const request = await fetch(`${url}/assistencia`);
    const response = await request.json();

    // lista todas assistencias que tenham id em um dos likes do solicitante
    const assistenciasFavoritas = likes.flatMap(
      (like) => response.filter(
        (assistencia) => assistencia.id === like.idAssistencia
      )
    )

    return assistenciasFavoritas;
  }

  // Busca assistencia pelo id
  const buscaAssistenciaById = async (id) => {
    const request = await fetch(`${url}/assistencia/${id}`);
    const response = await request.json();
    return response;
  };

  // insere assistencia
  const inserirAssistencia = async (data) => {
    const request = await fetch(`${url}/assistencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    const id = await response.id;

    localStorage.setItem("assistenciaId", id);
     
    if(data.administradorId === undefined){
      const isAdmInserido = await inserirAdministrador(id);
      const isAssistenciaValida = await inserirValidacaoAssistencia(id, true);
      return (isAdmInserido && isAssistenciaValida ) && request.ok;
    }
    else{
      const isAssistenciaValida = await inserirValidacaoAssistencia(id, true);
      return (isAssistenciaValida) && request.ok;
    }
  };

  const inserirNovaAssistencia = async (data, idAdministrador) =>{

    const dadosAssistencia = {
      "assistenciaEmail": data.assistenciaEmail,
      "nomeFantasia": data.nomeFantasia,
      "razaoSocial": data.razaoSocial,
      "cnpj": data.cnpj,
      "assistenciaTelefone":data.assistenciaTelefone,
      "administradorId": idAdministrador,
      "isValido": true
    }

    const request = await fetch(`${url}/assistencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(dadosAssistencia),
    });
    
    const response = await request.json();
    const id = await response.id;

    localStorage.setItem("assistenciaId", id);

    return request.ok
  }

  // insere o adm da assistencia
  const inserirAdministrador = async (id) => {
    const administrador = {
      administradorId: localStorage.getItem("userId"),
    };
    await fetch(`${url}/assistencia/${id}`, {
      method: "PATCH",
      body: JSON.stringify(administrador),
    });
  };

  // insere avaliacao de demanda
  const inserirAvaliacao = async (data, idAssistencia, idDemanda) =>{
    const dados = {
        ...data,
        "idDemanda": idDemanda,
        "idAssistencia": idAssistencia
    }

    const request = await fetch(`${url}/avaliacao`,{
        method: "POST",
        body: JSON.stringify(dados)
    });

    const response = await request.json();

    return response.id;
  };

  const inserirValidacaoAssistencia = async (idAssistencia, isValido) => {
    const request = await fetch(`${url}/assistencia/${idAssistencia}`, {
      method: "PATCH",
      body: JSON.stringify({ isValido: isValido }),
    });

    return request.ok;
  };

  return {
    buscaAssistencias,
    buscaAssistenciaById,
    buscaAssistenciasDoAdministrador,
    buscarAssistenciasFavoritasSolicitante,
    inserirAssistencia,
    inserirAvaliacao,
    inserirValidacaoAssistencia,
    inserirNovaAssistencia
  };
}